'use client'

import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'
import { useChatContext } from '@/context/ChatProvider'

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useChatContext()

  if (isLoading) {
    return (
      <div style={s.container}>
        <div style={s.loader} />
      </div>
    )
  }

  if (!user) {
    return (
      <div style={s.container}>
        <div style={s.card}>
          <div style={s.logoWrap}>
            <div style={s.logo}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
          </div>
          <h1 style={s.title}>Comvi</h1>
          <p style={s.subtitle}>Compartí, matcheá, viajá</p>

          <button style={s.googleBtn} onClick={() => signInWithPopup(auth, googleProvider).catch(console.error)}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 10, flexShrink: 0 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>
        </div>

        {/* Decorative orbs */}
        <div style={{ ...s.orb, top: '15%', left: '10%', width: 200, height: 200, background: 'radial-gradient(circle, rgba(42,157,143,0.08), transparent)' }} />
        <div style={{ ...s.orb, bottom: '10%', right: '5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(139,92,246,0.06), transparent)' }} />
      </div>
    )
  }

  return <>{children}</>
}

const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', position: 'relative' as any, overflow: 'hidden',
  },
  loader: {
    width: 32, height: 32, border: '2px solid rgba(255,255,255,0.1)',
    borderTopColor: '#2A9D8F', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 24, padding: '48px 40px', textAlign: 'center' as any,
    maxWidth: 380, width: '90%', animation: 'slideIn 0.4s ease',
    position: 'relative' as any, zIndex: 1,
  },
  logoWrap: { marginBottom: 20 },
  logo: {
    width: 64, height: 64, borderRadius: 20,
    background: 'rgba(42,157,143,0.1)', border: '1px solid rgba(42,157,143,0.2)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 },
  googleBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
    padding: '12px 20px', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
    color: '#F8FAFC', fontSize: 15, fontWeight: 500, cursor: 'pointer',
  },
  orb: { position: 'absolute' as any, borderRadius: '50%', pointerEvents: 'none' as any },
}
