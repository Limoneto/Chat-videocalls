'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useChatContext } from '@/context/ChatProvider'
import { subscribeToIncomingCalls, respondToCall, clearCallSignal } from '@/lib/chatClient'
import { playRingSound, stopRingSound } from '@/lib/sounds'

export const IncomingCallBanner: React.FC = () => {
  const { user } = useChatContext()
  const router = useRouter()
  const [incomingCall, setIncomingCall] = useState<any>(null)

  useEffect(() => {
    if (!user?.id) return
    const unsub = subscribeToIncomingCalls(user.id, (call) => {
      setIncomingCall(call)
      if (call) playRingSound()
      else stopRingSound()
    })
    return () => { unsub(); stopRingSound() }
  }, [user?.id])

  if (!incomingCall) return null

  const accept = async () => {
    stopRingSound()
    await respondToCall(user!.id, true)
    await clearCallSignal(user!.id)
    const c = incomingCall
    setIncomingCall(null)
    router.push(`/call/${c.callID}?name=${encodeURIComponent(c.channelName || c.caller?.name || 'Call')}&type=${c.callType}`)
  }

  const reject = async () => {
    stopRingSound()
    await respondToCall(user!.id, false)
    await clearCallSignal(user!.id)
    setIncomingCall(null)
  }

  return (
    <div style={s.overlay}>
      <div style={s.banner}>
        <div style={s.info}>
          {incomingCall.caller?.avatar ? (
            <img src={incomingCall.caller.avatar} alt="" style={s.avatar} />
          ) : (
            <div style={s.avatarPlaceholder}>{(incomingCall.caller?.name || '?').charAt(0).toUpperCase()}</div>
          )}
          <div>
            <div style={s.name}>{incomingCall.caller?.name || 'Desconocido'}</div>
            <div style={s.type}>Llamada {incomingCall.callType === 'video' ? 'de video' : 'de audio'} entrante</div>
          </div>
        </div>
        <div style={s.actions}>
          <button style={s.rejectBtn} onClick={reject}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>
          </button>
          <button style={s.acceptBtn} onClick={accept}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  overlay: { position: 'fixed' as any, top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 9999 },
  banner: {
    background: 'rgba(20,20,35,0.9)', backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
    padding: 24, margin: '40px 16px 0', width: '100%', maxWidth: 400,
    boxShadow: '0 8px 40px rgba(0,0,0,0.4)', animation: 'slideIn 0.3s ease',
  },
  info: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  avatarPlaceholder: { width: 52, height: 52, borderRadius: 26, background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600 },
  name: { fontSize: 18, fontWeight: 600 },
  type: { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  actions: { display: 'flex', justifyContent: 'center', gap: 32 },
  rejectBtn: { width: 56, height: 56, borderRadius: 28, background: '#FF453A', border: 'none', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  acceptBtn: { width: 56, height: 56, borderRadius: 28, background: '#30D158', border: 'none', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
}
