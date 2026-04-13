'use client'

import React from 'react'

interface MessageStatusProps {
  status?: 'sending' | 'sent' | 'delivered' | 'read'
}

export const MessageStatus: React.FC<MessageStatusProps> = ({ status }) => {
  if (!status) return null

  const config = {
    sending: { icon: '\u23F2', color: 'rgba(255,255,255,0.3)' },
    sent: { icon: '\u2713', color: 'rgba(255,255,255,0.4)' },
    delivered: { icon: '\u2713\u2713', color: 'rgba(255,255,255,0.4)' },
    read: { icon: '\u2713\u2713', color: '#2A9D8F' },
  }[status]

  if (!config) return null

  return (
    <span style={{ fontSize: 12, fontWeight: 600, color: config.color, marginLeft: 4, letterSpacing: -1 }}>
      {config.icon}
    </span>
  )
}
