'use client'

import React from 'react'
import { AuthGate } from '@/components/AuthGate'
import { SettingsScreen } from '@/components/SettingsScreen'

export default function SettingsPage() {
  return (
    <AuthGate>
      <SettingsScreen />
    </AuthGate>
  )
}
