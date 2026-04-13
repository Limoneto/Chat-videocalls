'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useChatContext } from '@/context/ChatProvider'
import { getLiveKitToken } from '@/lib/livekitClient'
import { playCallConnectedSound, playCallEndedSound } from '@/lib/sounds'

interface RemoteParticipantInfo {
  identity: string
  name: string
  videoEl: HTMLVideoElement | null
  hasVideo: boolean
}

interface CallScreenProps {
  callID: string
  channelName: string
  callType: 'audio' | 'video'
}

export const CallScreen: React.FC<CallScreenProps> = ({ callID, channelName, callType: initialCallType }) => {
  const { user } = useChatContext()
  const router = useRouter()
  const [callType, setCallType] = useState(initialCallType)
  const [elapsed, setElapsed] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [status, setStatus] = useState<'connecting' | 'connected' | 'failed'>('connecting')
  const [remoteParticipants, setRemoteParticipants] = useState<RemoteParticipantInfo[]>([])
  const [connectionQuality, setConnectionQuality] = useState('unknown')
  const [isReconnecting, setIsReconnecting] = useState(false)
  const roomRef = useRef<any>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const audioContainerRef = useRef<HTMLDivElement>(null)
  const remoteVideoContainerRef = useRef<HTMLDivElement>(null)
  const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

  // Timer
  useEffect(() => {
    if (status !== 'connected') return
    const i = setInterval(() => setElapsed(p => p + 1), 1000)
    return () => clearInterval(i)
  }, [status])

  // Connect to LiveKit
  useEffect(() => {
    if (!user || !livekitUrl) { setStatus('failed'); return }
    let room: any = null

    const connect = async () => {
      try {
        const token = await getLiveKitToken(callID, user.id, user.name, callType)
        if (!token) { setStatus('failed'); return }
        const lk = await import('livekit-client')

        room = new lk.Room({
          adaptiveStream: true,
          dynacast: true,
          videoCaptureDefaults: { resolution: { width: 1920, height: 1080, frameRate: 60 } },
          audioCaptureDefaults: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
          publishDefaults: {
            videoSimulcastLayers: [
              { width: 320, height: 180, encoding: { maxBitrate: 150_000, maxFramerate: 15 } },
              { width: 640, height: 360, encoding: { maxBitrate: 500_000, maxFramerate: 25 } },
              { width: 1280, height: 720, encoding: { maxBitrate: 2_500_000, maxFramerate: 30 } },
            ],
            videoEncoding: { maxBitrate: 6_000_000, maxFramerate: 60 },
            videoCodec: 'vp8', dtx: true, red: true,
          },
          disconnectOnPageLeave: true,
        })
        roomRef.current = room

        // Attach all tracks
        const refreshParticipants = () => {
          if (!room) return

          // Local video
          const localVid = Array.from(room.localParticipant.trackPublications.values())
            .find((p: any) => p.track?.kind === 'video')
          if (localVid?.track && localVideoRef.current) {
            localVideoRef.current.srcObject = localVid.track.attach().srcObject
          }

          // Remote participants - collect all
          const remotes: RemoteParticipantInfo[] = []

          // Clear audio container
          if (audioContainerRef.current) {
            audioContainerRef.current.innerHTML = ''
          }

          room.remoteParticipants.forEach((participant: any) => {
            let hasVideo = false
            let videoEl: HTMLVideoElement | null = null

            participant.trackPublications.forEach((pub: any) => {
              if (!pub.isSubscribed || !pub.track) return

              if (pub.track.kind === 'video') {
                hasVideo = true
                videoEl = pub.track.attach() as HTMLVideoElement
              } else if (pub.track.kind === 'audio' && audioContainerRef.current) {
                const audioEl = pub.track.attach()
                audioEl.style.display = 'none'
                audioContainerRef.current.appendChild(audioEl)
              }
            })

            remotes.push({
              identity: participant.identity,
              name: participant.name || participant.identity,
              videoEl,
              hasVideo,
            })
          })

          setRemoteParticipants([...remotes])
        }

        room.on(lk.RoomEvent.TrackSubscribed, refreshParticipants)
        room.on(lk.RoomEvent.TrackUnsubscribed, refreshParticipants)
        room.on(lk.RoomEvent.ParticipantConnected, () => { refreshParticipants(); playCallConnectedSound() })
        room.on(lk.RoomEvent.ParticipantDisconnected, refreshParticipants)
        room.on(lk.RoomEvent.LocalTrackPublished, refreshParticipants)
        room.on(lk.RoomEvent.Disconnected, () => setStatus('failed'))
        room.on(lk.RoomEvent.Reconnecting, () => setIsReconnecting(true))
        room.on(lk.RoomEvent.Reconnected, () => { setIsReconnecting(false); refreshParticipants() })
        room.on(lk.RoomEvent.ConnectionQualityChanged, (q: any) => setConnectionQuality(q?.toString() || 'unknown'))

        await room.connect(livekitUrl, token)
        await room.localParticipant.setMicrophoneEnabled(true)
        if (callType === 'video') await room.localParticipant.setCameraEnabled(true)

        setStatus('connected')
        playCallConnectedSound()
        refreshParticipants()
      } catch (err) { console.error('LiveKit:', err); setStatus('failed') }
    }

    connect()
    return () => { room?.disconnect(); roomRef.current = null }
  }, [callID, callType, user, livekitUrl])

  const fmt = (s: number) => {
    const m = Math.floor(s / 60), sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const toggleMute = () => { const n = !isMuted; setIsMuted(n); roomRef.current?.localParticipant.setMicrophoneEnabled(!n) }

  const toggleCamera = async () => {
    const n = !isCameraOff; setIsCameraOff(n)
    const lp = roomRef.current?.localParticipant
    if (!lp) return
    if (n) {
      const pubs = Array.from(lp.trackPublications.values()).filter((p: any) => p.track?.kind === 'video')
      for (const pub of pubs) await lp.unpublishTrack((pub as any).track)
      if (localVideoRef.current) localVideoRef.current.srcObject = null
    } else {
      await lp.setCameraEnabled(true)
      setTimeout(() => {
        const vid = Array.from(lp.trackPublications.values()).find((p: any) => p.track?.kind === 'video')
        if (vid?.track && localVideoRef.current) localVideoRef.current.srcObject = (vid as any).track.attach().srcObject
      }, 500)
    }
  }

  const switchToVideo = async () => {
    const lp = roomRef.current?.localParticipant
    if (!lp) return
    await lp.setCameraEnabled(true)
    setCallType('video'); setIsCameraOff(false)
    setTimeout(() => {
      const vid = Array.from(lp.trackPublications.values()).find((p: any) => p.track?.kind === 'video')
      if (vid?.track && localVideoRef.current) localVideoRef.current.srcObject = (vid as any).track.attach().srcObject
    }, 500)
  }

  const endCall = () => { roomRef.current?.disconnect(); playCallEndedSound(); router.push('/') }

  const isVideo = callType === 'video'
  const totalRemote = remoteParticipants.length

  // Grid layout calculation
  const getGridStyle = (count: number): React.CSSProperties => {
    if (count <= 1) return { gridTemplateColumns: '1fr' }
    if (count === 2) return { gridTemplateColumns: '1fr 1fr' }
    if (count <= 4) return { gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }
    if (count <= 6) return { gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr' }
    return { gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'repeat(auto-fill, 1fr)' }
  }

  return (
    <div style={st.wrapper}>
      <div style={st.container}>
        {/* Status */}
        {status === 'connecting' && <div style={st.statusBar}>Conectando...</div>}
        {status === 'failed' && <div style={{ ...st.statusBar, background: 'rgba(255,69,58,0.2)', borderColor: 'rgba(255,69,58,0.3)' }}>
          {!livekitUrl ? 'URL de LiveKit no configurada' : 'Conexión fallida'}
        </div>}
        {isReconnecting && <div style={{ ...st.statusBar, background: 'rgba(255,214,10,0.15)' }}>Reconectando...</div>}

        {isVideo ? (
          <div style={st.videoArea}>
            {/* Remote participants grid */}
            {totalRemote > 0 ? (
              <div style={{ ...st.grid, ...getGridStyle(totalRemote) }}>
                {remoteParticipants.map((rp) => (
                  <div key={rp.identity} style={st.gridCell}>
                    {rp.hasVideo && rp.videoEl ? (
                      <video
                        autoPlay playsInline
                        style={st.remoteVid}
                        ref={(el) => { if (el && rp.videoEl) el.srcObject = rp.videoEl.srcObject }}
                      />
                    ) : (
                      <div style={st.noVideoCell}>
                        <div style={st.cellAvatar}>{rp.name.charAt(0).toUpperCase()}</div>
                        <span style={st.cellName}>{rp.name}</span>
                      </div>
                    )}
                    <div style={st.cellLabel}>{rp.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={st.waitArea}>
                <div style={st.bigAvatar}>{channelName.charAt(0).toUpperCase()}</div>
                <p style={st.waitName}>{channelName}</p>
                <p style={st.waitSub}>{status === 'connected' ? 'Esperando...' : 'Conectando...'}</p>
              </div>
            )}

            {/* Local video PiP */}
            <div style={st.localVidWrap}>
              <video ref={localVideoRef} autoPlay muted playsInline style={st.localVid} />
            </div>

            {/* Timer + quality */}
            {status === 'connected' && (
              <div style={st.timer}>
                <span style={st.timerText}>{fmt(elapsed)}</span>
                {connectionQuality !== 'unknown' && (
                  <span style={{ fontSize: 10, marginLeft: 6, color: connectionQuality === 'excellent' ? '#30D158' : connectionQuality === 'good' ? '#FFD60A' : '#FF453A' }}>
                    {connectionQuality === 'excellent' ? '●●●' : connectionQuality === 'good' ? '●●○' : '●○○'}
                  </span>
                )}
                {totalRemote > 0 && <span style={{ fontSize: 11, marginLeft: 8, color: 'rgba(255,255,255,0.5)' }}>{totalRemote + 1} participantes</span>}
              </div>
            )}

            <div ref={audioContainerRef} style={{ display: 'none' }} />
          </div>
        ) : (
          /* Audio call */
          <div style={st.audioArea}>
            <div style={st.bigAvatar}>{channelName.charAt(0).toUpperCase()}</div>
            <p style={st.waitName}>{channelName}</p>
            <p style={st.waitSub}>
              {status === 'connecting' ? 'Conectando...' : totalRemote > 0 ? fmt(elapsed) : 'Esperando...'}
            </p>
            {totalRemote > 0 && <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 4 }}>{totalRemote + 1} participantes</p>}

            {/* Show remote participant names for group audio calls */}
            {totalRemote > 1 && (
              <div style={st.audioParticipants}>
                {remoteParticipants.map(rp => (
                  <div key={rp.identity} style={st.audioParticipantChip}>
                    <div style={st.chipAvatar}>{rp.name.charAt(0).toUpperCase()}</div>
                    <span style={st.chipName}>{rp.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div ref={audioContainerRef} style={{ display: 'none' }} />
          </div>
        )}

        {/* Controls */}
        <div style={st.controls}>
          <button style={{ ...st.ctrlBtn, background: isMuted ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)' }} onClick={toggleMute}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isMuted
                ? <><path d="M1 1l22 22M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/><path d="M17 16.95A7 7 0 015 12M12 19v4M8 23h8"/></>
                : <><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></>}
            </svg>
            <span style={st.ctrlLabel}>{isMuted ? 'Activar' : 'Silenciar'}</span>
          </button>

          {!isVideo && (
            <button style={{ ...st.ctrlBtn, borderColor: 'rgba(42,157,143,0.3)' }} onClick={switchToVideo}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="1.5">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>
              </svg>
              <span style={{ ...st.ctrlLabel, color: '#2A9D8F' }}>Video</span>
            </button>
          )}

          {isVideo && (
            <button style={{ ...st.ctrlBtn, background: isCameraOff ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)' }} onClick={toggleCamera}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isCameraOff
                  ? <><path d="M1 1l22 22M21 21H3a2 2 0 01-2-2V8a2 2 0 012-2h3m3-3h6l2 3h4a2 2 0 012 2v9.34"/></>
                  : <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>}
              </svg>
              <span style={st.ctrlLabel}>{isCameraOff ? 'Cámara On' : 'Cámara Off'}</span>
            </button>
          )}

          <button style={st.endBtn} onClick={endCall}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
            </svg>
            <span style={st.ctrlLabel}>Finalizar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const st: Record<string, React.CSSProperties> = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 16 },
  container: {
    width: 420, height: 'calc(100vh - 32px)', maxHeight: 800,
    background: 'rgba(10,26,26,0.95)', backdropFilter: 'blur(60px)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24,
    display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'slideIn 0.3s ease',
  },
  statusBar: {
    padding: '8px 16px', textAlign: 'center' as any, fontSize: 13, fontWeight: 500,
    background: 'rgba(42,157,143,0.15)', color: '#5EC4B6',
  },
  videoArea: { flex: 1, position: 'relative' as any, background: '#0a1a1a' },
  grid: {
    display: 'grid', width: '100%', height: '100%', gap: 2,
  },
  gridCell: { position: 'relative' as any, overflow: 'hidden', background: '#111' },
  remoteVid: { width: '100%', height: '100%', objectFit: 'cover' as any },
  noVideoCell: {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', background: '#1a1a2a',
  },
  cellAvatar: {
    width: 56, height: 56, borderRadius: 28,
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 22, fontWeight: 600, marginBottom: 8,
  },
  cellName: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  cellLabel: {
    position: 'absolute' as any, bottom: 6, left: 8,
    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
    padding: '2px 8px', borderRadius: 6, fontSize: 11, color: '#FFF',
  },
  waitArea: {
    position: 'absolute' as any, top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  },
  bigAvatar: {
    width: 96, height: 96, borderRadius: 48,
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 36, fontWeight: 600, marginBottom: 20,
    border: '3px solid rgba(42,157,143,0.3)', boxShadow: '0 0 40px rgba(42,157,143,0.2)',
  },
  waitName: { fontSize: 22, fontWeight: 600, color: '#F8FAFC', margin: 0 },
  waitSub: { fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 6 },
  localVidWrap: {
    position: 'absolute' as any, top: 16, right: 16,
    width: 110, height: 150, borderRadius: 16, overflow: 'hidden',
    border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  localVid: { width: '100%', height: '100%', objectFit: 'cover' as any, transform: 'scaleX(-1)' },
  timer: {
    position: 'absolute' as any, top: 16, left: 0, right: 0,
    textAlign: 'center' as any, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  timerText: {
    color: '#F8FAFC', fontSize: 14, fontWeight: 500,
    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
    padding: '4px 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)',
  },
  audioArea: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  },
  audioParticipants: {
    display: 'flex', flexWrap: 'wrap' as any, gap: 8, justifyContent: 'center',
    marginTop: 20, padding: '0 20px', maxWidth: 320,
  },
  audioParticipantChip: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 12px 6px 6px', borderRadius: 20,
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
  },
  chipAvatar: {
    width: 24, height: 24, borderRadius: 12,
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 600,
  },
  chipName: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  controls: {
    display: 'flex', justifyContent: 'center', gap: 16,
    padding: '20px 24px', background: 'rgba(255,255,255,0.02)',
    borderTop: '1px solid rgba(255,255,255,0.04)',
  },
  ctrlBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    width: 68, height: 68, borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.08)', color: '#F8FAFC',
    cursor: 'pointer', gap: 4, backdropFilter: 'blur(12px)',
  },
  ctrlLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500 },
  endBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    width: 68, height: 68, borderRadius: 20,
    background: 'linear-gradient(135deg, #FF453A, #CC362E)',
    border: 'none', color: '#FFF', cursor: 'pointer', gap: 4,
    boxShadow: '0 4px 16px rgba(255,69,58,0.3)',
  },
}
