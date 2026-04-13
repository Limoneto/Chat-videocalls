'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useChatContext } from '@/context/ChatProvider'
import {
  subscribeToMessages,
  sendMessage,
  startCall,
  setTyping,
  subscribeToTyping,
  setRecording,
  subscribeToRecording,
  revealIdentity,
  ChatMessage,
} from '@/lib/chatClient'
import { playSendSound, playReceiveSound } from '@/lib/sounds'
import { moderateAndFilter } from '@/lib/moderator'
import { MessageStatus } from './MessageStatus'
import { GifPicker } from './GifPicker'
import { IncomingCallBanner } from './IncomingCallBanner'
import { UserProfile } from './UserProfile'

interface ChatScreenProps {
  channelID: string
  channelName: string
  participants: any[]
  isAnonymous?: boolean
  expiresAt?: number
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  channelID,
  channelName,
  participants,
  isAnonymous = false,
  expiresAt,
}) => {
  const { user } = useChatContext()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(true)
  const [showGifPicker, setShowGifPicker] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingUsers, setRecordingUsers] = useState<string[]>([])
  const [showMembers, setShowMembers] = useState(false)
  const [profileUserId, setProfileUserId] = useState<string | null>(null)
  const [showRevealMenu, setShowRevealMenu] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string | null>(null)
  const [hasRequestedRevealAll, setHasRequestedRevealAll] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const markedRef = useRef<Set<string>>(new Set())
  const prevMsgCountRef = useRef(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Subscribe to messages
  useEffect(() => {
    if (!channelID) return
    setLoading(true)

    const unsubscribe = subscribeToMessages(channelID, (msgs) => {
      setMessages(msgs)
      setLoading(false)

      // Play receive sound for new messages from others
      if (msgs.length > prevMsgCountRef.current && prevMsgCountRef.current > 0) {
        const latest = msgs[0]
        if (latest && latest.senderID !== user?.id) {
          playReceiveSound()
        }
      }
      prevMsgCountRef.current = msgs.length

      // Mark as read (once per message)
      msgs.forEach((msg) => {
        if (msg.senderID !== user?.id && !msg.readUserIDs?.includes(user?.id || '') && !markedRef.current.has(msg.id)) {
          markedRef.current.add(msg.id)
          import('@/lib/chatClient').then(({ markAsRead }) => {
            markAsRead(channelID, user?.id || '', msg.id, [...(msg.readUserIDs || []), user?.id || '']).catch(() => {})
          })
        }
      })
    })

    return () => unsubscribe()
  }, [channelID, user?.id])

  // Typing indicators
  useEffect(() => {
    if (!channelID || !user?.id) return
    const unsubscribe = subscribeToTyping(channelID, user.id, setTypingUsers)
    return () => unsubscribe()
  }, [channelID, user?.id])

  // Recording indicators
  useEffect(() => {
    if (!channelID || !user?.id) return
    const unsubscribe = subscribeToRecording(channelID, user.id, setRecordingUsers)
    return () => unsubscribe()
  }, [channelID, user?.id])

  // Timer de expiración para chats anónimos
  useEffect(() => {
    if (!isAnonymous || !expiresAt) return
    const update = () => {
      const remaining = expiresAt - Date.now()
      if (remaining <= 0) {
        setTimeLeft('Expirado')
        router.push('/')
        return
      }
      const mins = Math.floor(remaining / 60000)
      const secs = Math.floor((remaining % 60000) / 1000)
      setTimeLeft(`${mins}:${secs.toString().padStart(2, '0')}`)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [isAnonymous, expiresAt, router])

  // Helper: obtener nombre a mostrar (anónimo o real)
  const getDisplayName = (participant: any) => {
    if (!isAnonymous) return [participant.firstName, participant.lastName].filter(Boolean).join(' ') || 'Desconocido'
    if (participant.revealedIdentity) {
      const real = [participant.firstName, participant.lastName].filter(Boolean).join(' ')
      return `${participant.anonymousNickname} (${real})`
    }
    return participant.anonymousNickname || 'Anónimo'
  }

  // Mi participante anónimo
  const myAnonParticipant = participants?.find((p: any) => p.id === user?.id)
  const myNickname = myAnonParticipant?.anonymousNickname || user?.name
  const hasRevealed = myAnonParticipant?.revealedIdentity || false

  // Revelar mi identidad
  const handleRevealMyIdentity = async () => {
    await revealIdentity(channelID, user!.id)
    setShowRevealMenu(false)
  }

  // Solicitar que todos revelen su identidad
  const handleRequestRevealAll = async () => {
    const msgID = `sys_${Date.now()}`
    await sendMessage(channelID, {
      senderID: 'system',
      senderFirstName: 'Sistema',
      content: `${myNickname} solicita que todos los participantes revelen su identidad`,
      type: 'system' as any,
      createdAt: Math.round(Date.now() / 1000).toString(),
    })
    setHasRequestedRevealAll(true)
    setShowRevealMenu(false)
  }

  // Auto-scroll
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  const handleInputChange = (text: string) => {
    setInputText(text)
    if (text.trim() && user) {
      setTyping(channelID, user.id, user.name, true).catch(() => {})
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(channelID, user.id, user.name, false).catch(() => {})
      }, 3000)
    }
  }

  const handleSend = async () => {
    if (!inputText.trim() || !user) return
    const text = inputText.trim()

    // Moderate message before sending
    const modResult = moderateAndFilter(text)
    if (!modResult.allowed) {
      setError(modResult.reason || 'Mensaje bloqueado')
      return
    }

    const finalText = modResult.filtered || text
    setInputText('')
    setError(modResult.filtered ? `⚠ ${modResult.reason}` : null)
    setTyping(channelID, user.id, user.name, false).catch(() => {})
    playSendSound()

    try {
      await sendMessage(channelID, {
        senderID: user.id,
        senderFirstName: user.firstName || user.name.split(' ')[0],
        senderLastName: user.lastName || '',
        senderProfilePictureURL: user.avatar,
        content: finalText,
        type: 'text',
        createdAt: Math.round(Date.now() / 1000).toString(),
      })
    } catch (err: any) {
      setError('Error al enviar')
      setInputText(finalText)
    }
  }

  const handleGifSelect = async (gifUrl: string) => {
    if (!user) return
    setShowGifPicker(false)
    playSendSound()
    try {
      await sendMessage(channelID, {
        senderID: user.id,
        senderFirstName: user.firstName || user.name.split(' ')[0],
        senderLastName: user.lastName || '',
        senderProfilePictureURL: user.avatar,
        content: 'GIF',
        url: gifUrl,
        type: 'gif',
        createdAt: Math.round(Date.now() / 1000).toString(),
      })
    } catch { setError('Error al enviar GIF') }
  }

  // Audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      setRecordingTime(0)

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current)

        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const reader = new FileReader()
        reader.onloadend = async () => {
          const base64 = reader.result as string
          if (!user) return
          playSendSound()
          try {
            await sendMessage(channelID, {
              senderID: user.id,
              senderFirstName: user.firstName || user.name.split(' ')[0],
              senderLastName: user.lastName || '',
              senderProfilePictureURL: user.avatar,
              content: `Mensaje de voz (${recordingTime}s)`,
              url: base64,
              type: 'audio' as any,
              createdAt: Math.round(Date.now() / 1000).toString(),
            })
          } catch { setError('Error al enviar audio') }
        }
        reader.readAsDataURL(blob)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecording(channelID, user!.id, user!.name, true).catch(() => {})
      recordingIntervalRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000)
    } catch (err) {
      setError('Acceso al micrófono denegado')
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
    setRecording(channelID, user!.id, user!.name, false).catch(() => {})
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current)
  }

  const cancelRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.ondataavailable = null
      mediaRecorderRef.current.onstop = null
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
    setRecordingTime(0)
    setRecording(channelID, user!.id, user!.name, false).catch(() => {})
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current)
  }

  const formatTime = (ts: string) => {
    if (!ts) return ''
    return new Date(parseInt(ts) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const otherParticipant = participants?.find((p: any) => p.id !== user?.id)
  const displayMessages = [...messages].reverse()

  return (
    <div style={s.container}>
      <IncomingCallBanner />
      {profileUserId && (
        <UserProfile
          userId={profileUserId}
          onClose={() => setProfileUserId(null)}
          onStartCall={(uid, type) => {
            setProfileUserId(null)
            const callID = `call_${Date.now()}`
            startCall(callID, type, { id: user!.id, name: user!.name, avatar: user!.avatar }, participants, channelName)
            router.push(`/call/${callID}?name=${encodeURIComponent(channelName)}&type=${type}`)
          }}
        />
      )}

      {/* Header */}
      <div style={s.header} className="glass-strong">
        <button style={s.backBtn} onClick={() => router.push('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div onClick={() => !isAnonymous && otherParticipant && setProfileUserId(otherParticipant.id)} style={{ cursor: !isAnonymous && otherParticipant ? 'pointer' : 'default' }}>
          {isAnonymous ? (
            <div style={{ ...s.headerAvatar, background: 'linear-gradient(135deg, #6B7280, #374151)' }}>🎭</div>
          ) : otherParticipant?.profilePictureURL ? (
            <img src={otherParticipant.profilePictureURL} alt="" style={s.headerAvatarImg} />
          ) : (
            <div style={s.headerAvatar}>{channelName.charAt(0).toUpperCase()}</div>
          )}
        </div>

        <div style={s.headerInfo} onClick={() => {
          if (participants?.length > 2) setShowMembers(true)
          else if (otherParticipant) setProfileUserId(otherParticipant.id)
        }}>
          <span style={s.headerName}>{channelName}</span>
          <span style={s.headerSubtitle}>
            {recordingUsers.length > 0
              ? <><span style={{ color: '#FF453A' }}>{'● '}</span>{recordingUsers.join(', ')} grabando audio</>
              : typingUsers.length > 0
                ? `${typingUsers.join(', ')} escribiendo...`
                : participants?.length > 2
                  ? <span style={{ cursor: 'pointer' }}>{participants.length} miembros ›</span>
                  : 'en línea'}
          </span>
        </div>

        <button style={s.callBtn} onClick={async () => {
          const callID = `call_${Date.now()}`
          await startCall(callID, 'audio', { id: user!.id, name: user!.name, avatar: user!.avatar }, participants, channelName)
          router.push(`/call/${callID}?name=${encodeURIComponent(channelName)}&type=audio`)
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </button>
        <button style={s.callBtn} onClick={async () => {
          const callID = `call_${Date.now()}`
          await startCall(callID, 'video', { id: user!.id, name: user!.name, avatar: user!.avatar }, participants, channelName)
          router.push(`/call/${callID}?name=${encodeURIComponent(channelName)}&type=video`)
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
        </button>
      </div>

      {/* Error */}
      {/* Members panel */}
      {showMembers && (
        <div style={s.membersOverlay} onClick={() => setShowMembers(false)}>
          <div style={s.membersPanel} onClick={e => e.stopPropagation()}>
            <div style={s.membersPanelHeader}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Miembros ({participants?.length || 0})</h3>
              <button onClick={() => setShowMembers(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 18, cursor: 'pointer' }}>x</button>
            </div>
            <div style={s.membersList}>
              {participants?.map((p: any) => {
                const name = p.name || [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Desconocido'
                const isMe = p.id === user?.id
                return (
                  <div key={p.id} style={{ ...s.memberItem, cursor: 'pointer' }}
                    onClick={() => { setShowMembers(false); setProfileUserId(p.id) }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    {p.profilePictureURL ? (
                      <img src={p.profilePictureURL} alt="" style={s.memberAvatar} />
                    ) : (
                      <div style={s.memberAvatarPlaceholder}>{name.charAt(0).toUpperCase()}</div>
                    )}
                    <div style={{ flex: 1 }}>
                      <span style={s.memberName}>{name}{isMe ? ' (tú)' : ''}</span>
                      {p.email && <span style={s.memberEmail}>{p.email}</span>}
                    </div>
                    {isMe ? <span style={s.memberBadge}>Tú</span> : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Banner anónimo */}
      {isAnonymous && (
        <div style={s.anonBanner}>
          <div style={s.anonBannerLeft}>
            <span style={{ fontSize: 16 }}>🎭</span>
            <div>
              <span style={s.anonBannerTitle}>Chat anónimo</span>
              <span style={s.anonBannerSub}>Sos <strong>{myNickname}</strong></span>
            </div>
          </div>
          <div style={s.anonBannerRight}>
            {timeLeft && <span style={s.anonTimer}>⏱ {timeLeft}</span>}
            <button style={s.anonRevealBtn} onClick={() => setShowRevealMenu(!showRevealMenu)}>
              {hasRevealed ? '✓ Revelado' : 'Revelar'}
            </button>
          </div>
        </div>
      )}

      {/* Menú de revelar identidad */}
      {showRevealMenu && (
        <div style={s.revealMenu}>
          {!hasRevealed && (
            <button style={s.revealOption} onClick={handleRevealMyIdentity}>
              <span>👤</span>
              <div>
                <div style={{ fontWeight: 500 }}>Revelar mi identidad</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Los demás verán tu nombre y foto real</div>
              </div>
            </button>
          )}
          <button style={s.revealOption} onClick={handleRequestRevealAll} disabled={hasRequestedRevealAll}>
            <span>👥</span>
            <div>
              <div style={{ fontWeight: 500 }}>{hasRequestedRevealAll ? 'Solicitud enviada' : 'Solicitar que todos se revelen'}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Se envía un mensaje pidiendo que todos muestren su identidad</div>
            </div>
          </button>
          <button style={{ ...s.revealOption, color: 'rgba(255,255,255,0.3)' }} onClick={() => setShowRevealMenu(false)}>
            Cancelar
          </button>
        </div>
      )}

      {error && (
        <div style={s.errorBanner}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#FF453A', cursor: 'pointer' }}>x</button>
        </div>
      )}

      {/* Messages */}
      <div style={s.messageList} ref={listRef}>
        {loading ? (
          <div style={s.center}><p style={{ color: 'rgba(255,255,255,0.5)' }}>Cargando...</p></div>
        ) : displayMessages.length === 0 ? (
          <div style={s.center}>
            <div style={s.emptyBadge} className="glass">
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Inicia la conversación</p>
            </div>
          </div>
        ) : (
          displayMessages.map((msg, i) => {
            const isMine = msg.senderID === user?.id
            const isGroup = participants?.length > 2
            const senderName = [msg.senderFirstName, msg.senderLastName].filter(Boolean).join(' ')
            const status = msg.readUserIDs?.some(id => id !== msg.senderID) ? 'read'
              : msg.deliveredUserIDs?.some(id => id !== msg.senderID) ? 'delivered'
              : (msg.status as any) || 'sent'

            return (
              <div key={msg.id} style={{ ...s.messageRow, justifyContent: isMine ? 'flex-end' : 'flex-start', animation: 'fadeIn 0.2s ease' }}>
                {!isMine && (
                  <div onClick={() => setProfileUserId(msg.senderID)} style={{ cursor: 'pointer' }}>
                    {msg.senderProfilePictureURL
                      ? <img src={msg.senderProfilePictureURL} alt="" style={s.msgAvatar} />
                      : <div style={s.msgAvatarPlaceholder}>{(msg.senderFirstName || '?').charAt(0).toUpperCase()}</div>
                    }
                  </div>
                )}

                <div style={{
                  ...s.bubble,
                  background: isMine ? 'rgba(42, 157, 143, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  borderColor: isMine ? 'rgba(42, 157, 143, 0.3)' : 'rgba(255, 255, 255, 0.12)',
                  borderTopRightRadius: isMine ? 4 : 16,
                  borderTopLeftRadius: isMine ? 16 : 4,
                }}>
                  {isGroup && !isMine && <span style={s.senderName}>{senderName}</span>}
                  {(msg.type === 'image' || msg.type === 'gif') && msg.url && (
                    <img src={msg.url} alt="" style={s.messageImage} />
                  )}
                  {(msg.type as string) === 'audio' && msg.url && (
                    <div style={s.audioMsg}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/>
                      </svg>
                      <audio controls src={msg.url} style={s.audioPlayer} preload="metadata" />
                    </div>
                  )}
                  {msg.content && msg.type !== 'gif' && (msg.type as string) !== 'audio' && (
                    <span style={s.messageText}>{msg.content}</span>
                  )}
                  <span style={s.messageFooter}>
                    <span style={s.messageTime}>{formatTime(msg.createdAt)}</span>
                    {isMine && <MessageStatus status={status} />}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Typing indicator */}
      {typingUsers.length > 0 && (
        <div style={s.typingBar} className="glass">
          <span style={s.typingDots}>...</span>
          <span style={s.typingText}>{typingUsers.join(', ')} escribiendo</span>
        </div>
      )}

      {/* GIF Picker */}
      {showGifPicker && <GifPicker onGifSelect={handleGifSelect} onClose={() => setShowGifPicker(false)} />}

      {/* Input */}
      <div style={s.inputContainer} className="glass-strong">
        {isRecording ? (
          /* Recording UI */
          <div style={s.recordingBar}>
            <button style={s.cancelRecBtn} onClick={cancelRecording}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div style={s.recordingIndicator}>
              <div style={s.recordingDot} />
              <span style={s.recordingTimeText}>
                {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <button style={s.stopRecBtn} onClick={stopRecording}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        ) : (
          /* Normal input */
          <>
            <button style={s.gifBtn} onClick={() => setShowGifPicker(!showGifPicker)}>GIF</button>
            <input
              style={s.input}
              placeholder="Mensaje"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            {inputText.trim() ? (
              <button style={s.sendBtn} onClick={handleSend}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            ) : (
              <button style={s.micBtn} onClick={startRecording}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                  <path d="M19 10v2a7 7 0 01-14 0v-2"/>
                  <path d="M12 19v4M8 23h8"/>
                </svg>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 500, margin: '0 auto', height: '100vh',
    display: 'flex', flexDirection: 'column',
    borderLeft: '1px solid rgba(255,255,255,0.06)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
  },
  header: {
    padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
    borderBottom: '1px solid rgba(255,255,255,0.08)', zIndex: 2,
  },
  backBtn: {
    background: 'none', border: 'none', color: '#2A9D8F', cursor: 'pointer', padding: 4,
    display: 'flex', alignItems: 'center',
  },
  headerAvatar: {
    width: 40, height: 40, borderRadius: 20,
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 600, flexShrink: 0,
  },
  headerAvatarImg: { width: 40, height: 40, borderRadius: 20, objectFit: 'cover' as any, flexShrink: 0 },
  headerInfo: { flex: 1, display: 'flex', flexDirection: 'column' },
  headerName: { fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.95)' },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  callBtn: {
    background: 'none', border: 'none', color: '#2A9D8F', cursor: 'pointer', padding: 8,
    display: 'flex', alignItems: 'center', borderRadius: 8,
  },
  errorBanner: {
    background: 'rgba(255,69,58,0.15)', padding: '8px 16px',
    border: '1px solid rgba(255,69,58,0.3)', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between', color: '#FF453A', fontSize: 13,
  },
  messageList: { flex: 1, overflowY: 'auto' as any, padding: '12px 16px' },
  center: { display: 'flex', justifyContent: 'center', paddingTop: 60 },
  emptyBadge: { padding: '12px 20px', borderRadius: 16 },
  messageRow: { display: 'flex', marginBottom: 6, alignItems: 'flex-end', gap: 6 },
  msgAvatar: { width: 28, height: 28, borderRadius: 14, objectFit: 'cover' as any, flexShrink: 0 },
  msgAvatarPlaceholder: {
    width: 28, height: 28, borderRadius: 14,
    background: 'linear-gradient(135deg, #1A7A6E, #2A9D8F)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 600, flexShrink: 0,
  },
  bubble: {
    maxWidth: '70%', padding: '8px 12px', borderRadius: 16,
    border: '1px solid', backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  senderName: { fontSize: 12, fontWeight: 600, color: '#2A9D8F', display: 'block', marginBottom: 2 },
  messageText: {
    fontSize: 15, color: 'rgba(255,255,255,0.92)', lineHeight: '21px',
    whiteSpace: 'pre-wrap' as any, wordBreak: 'break-word' as any,
  },
  messageImage: { maxWidth: 220, maxHeight: 220, borderRadius: 12, display: 'block', marginBottom: 4 },
  messageFooter: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 3, gap: 3 },
  messageTime: { fontSize: 11, color: 'rgba(255,255,255,0.4)' },
  typingBar: { padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 0 },
  typingDots: { color: '#2A9D8F', fontSize: 16, fontWeight: 700, animation: 'pulse 1.2s infinite', letterSpacing: 2 },
  typingText: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontStyle: 'italic' as any },
  inputContainer: {
    padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
    borderTop: '1px solid rgba(255,255,255,0.08)', zIndex: 2,
  },
  gifBtn: {
    padding: '4px 8px', borderRadius: 6,
    border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
  },
  input: {
    flex: 1, padding: '10px 16px', borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.95)', fontSize: 15,
  },
  miembrosOverlay: {
    position: 'fixed' as any, top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
  },
  miembrosPanel: {
    background: 'rgba(15,20,20,0.95)', backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
    padding: 20, width: 340, maxWidth: '90%', maxHeight: '70vh',
    display: 'flex', flexDirection: 'column' as any, animation: 'slideIn 0.2s ease',
  },
  miembrosPanelHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  miembrosList: { overflowY: 'auto' as any, maxHeight: 400 },
  memberItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '8px 4px',
    borderRadius: 10,
  },
  memberAvatar: { width: 40, height: 40, borderRadius: 20, objectFit: 'cover' as any, flexShrink: 0 },
  memberAvatarPlaceholder: {
    width: 40, height: 40, borderRadius: 20,
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 600, flexShrink: 0,
  },
  memberName: { fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.9)', display: 'block' },
  memberEmail: { fontSize: 12, color: 'rgba(255,255,255,0.35)', display: 'block' },
  memberBadge: {
    fontSize: 10, fontWeight: 600, color: '#2A9D8F',
    padding: '2px 8px', borderRadius: 10,
    background: 'rgba(42,157,143,0.15)', border: '1px solid rgba(42,157,143,0.2)',
  },
  anonBanner: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 16px', background: 'rgba(107,114,128,0.12)',
    borderBottom: '1px solid rgba(107,114,128,0.15)',
  },
  anonBannerLeft: { display: 'flex', alignItems: 'center', gap: 8 },
  anonBannerTitle: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', display: 'block' },
  anonBannerSub: { fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'block' },
  anonBannerRight: { display: 'flex', alignItems: 'center', gap: 8 },
  anonTimer: {
    fontSize: 12, fontWeight: 600, color: '#FF453A',
    background: 'rgba(255,69,58,0.1)', padding: '2px 8px', borderRadius: 8,
    fontVariantNumeric: 'tabular-nums' as any,
  },
  anonRevealBtn: {
    padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
    background: 'rgba(42,157,143,0.15)', border: '1px solid rgba(42,157,143,0.3)',
    color: '#2A9D8F', cursor: 'pointer',
  },
  revealMenu: {
    background: 'rgba(15,20,20,0.95)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0 0 12px 12px',
    padding: 8, display: 'flex', flexDirection: 'column' as any, gap: 4,
  },
  revealOption: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 12px', borderRadius: 8, border: 'none',
    background: 'transparent', color: 'rgba(255,255,255,0.8)',
    cursor: 'pointer', textAlign: 'left' as any, fontSize: 14,
    width: '100%',
  },
  sendBtn: {
    width: 38, height: 38, borderRadius: 19, background: '#2A9D8F',
    color: '#FFF', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  micBtn: {
    width: 38, height: 38, borderRadius: 19,
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  recordingBar: {
    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
  },
  cancelRecBtn: {
    width: 36, height: 36, borderRadius: 18,
    background: 'rgba(255,69,58,0.15)', border: '1px solid rgba(255,69,58,0.3)',
    color: '#FF453A', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  recordingIndicator: {
    flex: 1, display: 'flex', alignItems: 'center', gap: 8,
    padding: '8px 16px', borderRadius: 20,
    background: 'rgba(255,69,58,0.08)', border: '1px solid rgba(255,69,58,0.15)',
  },
  recordingDot: {
    width: 8, height: 8, borderRadius: 4, background: '#FF453A',
    animation: 'pulse 1s infinite', flexShrink: 0,
  },
  recordingTimeText: { color: '#FF453A', fontSize: 14, fontWeight: 500, fontVariantNumeric: 'tabular-nums' as any },
  stopRecBtn: {
    width: 38, height: 38, borderRadius: 19, background: '#2A9D8F',
    color: '#FFF', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  audioMsg: {
    display: 'flex', alignItems: 'center', gap: 8, minWidth: 200,
    color: 'rgba(255,255,255,0.6)',
  },
  audioPlayer: {
    height: 32, flex: 1, borderRadius: 16,
    filter: 'invert(0.85) hue-rotate(180deg)',
  },
}
