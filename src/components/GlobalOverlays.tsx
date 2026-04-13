'use client'

import React from 'react'
import { IncomingCallBanner } from './IncomingCallBanner'
import { NotificationToast } from './NotificationToast'

export const GlobalOverlays: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <IncomingCallBanner />
      <NotificationToast />
      {children}
    </>
  )
}
