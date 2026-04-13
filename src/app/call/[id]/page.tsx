'use client'

import React, { Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { AuthGate } from '@/components/AuthGate'
import { CallScreen } from '@/components/CallScreen'

function CallContent() {
  const params = useParams()
  const searchParams = useSearchParams()

  const callID = params.id as string
  const channelName = searchParams.get('name') || 'Call'
  const callType = (searchParams.get('type') || 'audio') as 'audio' | 'video'

  return (
    <CallScreen
      callID={callID}
      channelName={channelName}
      callType={callType}
    />
  )
}

export default function CallPage() {
  return (
    <AuthGate>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Cargando...</div>}>
        <CallContent />
      </Suspense>
    </AuthGate>
  )
}
