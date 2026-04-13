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
  const isAnonymous = searchParams.get('anon') === '1'
  const expiresAt = searchParams.get('expires') ? parseInt(searchParams.get('expires')!) : undefined
  let participants: any[] = []
  try {
    participants = JSON.parse(searchParams.get('participants') || '[]')
  } catch {}

  return (
    <ChatScreen
      channelID={channelID}
      channelName={channelName}
      participants={participants}
      isAnonymous={isAnonymous}
      expiresAt={expiresAt}
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
