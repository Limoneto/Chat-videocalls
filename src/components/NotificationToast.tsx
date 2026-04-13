'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useChatContext } from '@/context/ChatProvider'
import { subscribeChannels, ChatChannel } from '@/lib/chatClient'
import { playReceiveSound } from '@/lib/sounds'

interface Toast {
  id: string
  senderName: string
  message: string
  avatar?: string
  channelID: string
}

export const NotificationToast: React.FC = () => {
  const { user } = useChatContext()
  const [toasts, setToasts] = useState<Toast[]>([])
  const prevChannelsRef = useRef<Map<string, string>>(new Map())
  const isFirstLoadRef = useRef(true)

  useEffect(() => {
    if (!user?.id) return

    const unsubscribe = subscribeChannels(user.id, (channels: ChatChannel[]) => {
      if (isFirstLoadRef.current) {
        // Save initial state, don't notify
        channels.forEach(ch => {
          prevChannelsRef.current.set(ch.id || ch.channelID, ch.lastMessage || '')
        })
        isFirstLoadRef.current = false
        return
      }

      // Check for new messages
      channels.forEach(ch => {
        const chId = ch.id || ch.channelID
        const prevMsg = prevChannelsRef.current.get(chId)
        const currentMsg = ch.lastMessage || ''

        if (prevMsg !== undefined && currentMsg !== prevMsg && ch.lastMessageSenderId !== user.id) {
          // New message from someone else
          const other = ch.participants?.find(p => p.id !== user.id)
          const senderName = ch.name || (other ? [other.firstName, other.lastName].filter(Boolean).join(' ') : 'Unknown')

          const toast: Toast = {
            id: `${chId}_${Date.now()}`,
            senderName,
            message: currentMsg,
            avatar: other?.profilePictureURL,
            channelID: chId,
          }

          setToasts(prev => [toast, ...prev].slice(0, 3))
          playReceiveSound()

          // Auto-remove after 4 seconds
          setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== toast.id))
          }, 4000)
        }

        prevChannelsRef.current.set(chId, currentMsg)
      })
    })

    return () => unsubscribe()
  }, [user?.id])

  if (toasts.length === 0) return null

  return (
    <div style={s.container}>
      {toasts.map((toast, i) => (
        <div key={toast.id} style={{ ...s.toast, animation: 'fadeIn 0.3s ease', opacity: 1 - i * 0.2 }}>
          {toast.avatar ? (
            <img src={toast.avatar} alt="" style={s.avatar} />
          ) : (
            <div style={s.avatarPlaceholder}>{toast.senderName.charAt(0).toUpperCase()}</div>
          )}
          <div style={s.content}>
            <span style={s.name}>{toast.senderName}</span>
            <span style={s.message}>{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed' as any, top: 16, right: 16,
    display: 'flex', flexDirection: 'column', gap: 8,
    zIndex: 10000, pointerEvents: 'none' as any,
  },
  toast: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 16px', borderRadius: 14,
    background: 'rgba(20,30,30,0.9)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(42,157,143,0.2)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    maxWidth: 320, pointerEvents: 'auto' as any,
  },
  avatar: { width: 36, height: 36, borderRadius: 18, flexShrink: 0 },
  avatarPlaceholder: {
    width: 36, height: 36, borderRadius: 18,
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 600, flexShrink: 0,
  },
  content: { display: 'flex', flexDirection: 'column', minWidth: 0 },
  name: { fontSize: 13, fontWeight: 600, color: '#F8FAFC' },
  message: {
    fontSize: 12, color: 'rgba(255,255,255,0.5)',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as any,
  },
}
