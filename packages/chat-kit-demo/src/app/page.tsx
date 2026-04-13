'use client'

import React from 'react'
import { AuthGate } from '@/components/AuthGate'
import { ConversationList } from '@/components/ConversationList'

export default function Home() {
  return (
    <AuthGate>
      <ConversationList />
    </AuthGate>
  )
}
