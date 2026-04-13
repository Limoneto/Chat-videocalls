'use client'

import React, { Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { AuthGate } from '@/components/AuthGate'
import { ChatScreen } from '@/components/ChatScreen'

function ChatContent() {
  const params = useParams()
  const searchParams = useSearchParams()

  const channelID = params.id as string
  const channelName = searchParams.get('name') || 'Chat'
  let participants: any[] = []
  try {
    participants = JSON.parse(searchParams.get('participants') || '[]')
  } catch {}

  return (
    <ChatScreen
      channelID={channelID}
      channelName={channelName}
      participants={participants}
    />
  )
}

export default function ChatPage() {
  return (
    <AuthGate>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Cargando...</div>}>
        <ChatContent />
      </Suspense>
    </AuthGate>
  )
}
