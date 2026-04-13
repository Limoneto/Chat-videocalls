'use client'

import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface UserProfileProps {
  userId: string
  onClose: () => void
  onStartChat?: (userId: string) => void
  onStartCall?: (userId: string, type: 'audio' | 'video') => void
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, onClose, onStartChat, onStartCall }) => {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', userId))
        setProfile(snap.data() || null)
      } catch { setProfile(null) }
      setLoading(false)
    }
    load()
  }, [userId])

  const name = profile ? [profile.firstName, profile.lastName].filter(Boolean).join(' ') : 'Desconocido'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.panel} onClick={e => e.stopPropagation()}>
        {loading ? (
          <div style={s.loading}>Cargando...</div>
        ) : !profile ? (
          <div style={s.loading}>Usuario no encontrado</div>
        ) : (
          <>
            {/* Close */}
            <button style={s.closeBtn} onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {/* Avatar */}
            <div style={s.avatarSection}>
              {profile.profilePictureURL ? (
                <img src={profile.profilePictureURL} alt="" style={s.avatar} />
              ) : (
                <div style={s.avatarPlaceholder}>{initials}</div>
              )}
              <h2 style={s.name}>{name}</h2>
              {profile.email && <p style={s.email}>{profile.email}</p>}
              <div style={s.statusDot}>
                <span style={s.dot} />
                <span style={s.statusText}>En línea</span>
              </div>
            </div>

            {/* Actions */}
            <div style={s.actions}>
              {onStartChat && (
                <button style={s.actionBtn} onClick={() => onStartChat(userId)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                  </svg>
                  <span>Mensaje</span>
                </button>
              )}
              {onStartCall && (
                <>
                  <button style={s.actionBtn} onClick={() => onStartCall(userId, 'audio')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    <span>Audio</span>
                  </button>
                  <button style={s.actionBtn} onClick={() => onStartCall(userId, 'video')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                    <span>Video</span>
                  </button>
                </>
              )}
            </div>

            {/* Info */}
            <div style={s.infoSection}>
              <div style={s.infoItem}>
                <span style={s.infoLabel}>ID de usuario</span>
                <span style={s.infoValue}>{userId.slice(0, 12)}...</span>
              </div>
              {profile.email && (
                <div style={s.infoItem}>
                  <span style={s.infoLabel}>Email</span>
                  <span style={s.infoValue}>{profile.email}</span>
                </div>
              )}
              {profile.phone && (
                <div style={s.infoItem}>
                  <span style={s.infoLabel}>Teléfono</span>
                  <span style={s.infoValue}>{profile.phone}</span>
                </div>
              )}
              <div style={s.infoItem}>
                <span style={s.infoLabel}>Se unió</span>
                <span style={s.infoValue}>{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Recientemente'}</span>
              </div>
            </div>

            {/* Shared media placeholder */}
            <div style={s.mediaSection}>
              <span style={s.mediaSectionTitle}>Multimedia compartida</span>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, margin: '12px 0 0' }}>
                Fotos y GIFs compartidos en esta conversación aparecerán aquí
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed' as any, top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
  },
  panel: {
    background: 'rgba(12,20,20,0.95)', backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24,
    padding: 0, width: 360, maxWidth: '92%', maxHeight: '85vh',
    overflow: 'hidden', animation: 'slideIn 0.25s ease', position: 'relative' as any,
  },
  loading: { padding: 60, textAlign: 'center' as any, color: 'rgba(255,255,255,0.4)' },
  closeBtn: {
    position: 'absolute' as any, top: 16, right: 16,
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, width: 36, height: 36,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'rgba(255,255,255,0.5)', cursor: 'pointer', zIndex: 2,
  },
  avatarSection: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '32px 24px 20px',
    background: 'linear-gradient(180deg, rgba(42,157,143,0.08) 0%, transparent 100%)',
  },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    border: '3px solid rgba(42,157,143,0.3)',
    boxShadow: '0 0 30px rgba(42,157,143,0.15)',
  },
  avatarPlaceholder: {
    width: 88, height: 88, borderRadius: 44,
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 32, fontWeight: 600,
    border: '3px solid rgba(42,157,143,0.3)',
  },
  name: { fontSize: 20, fontWeight: 600, marginTop: 14, color: '#F8FAFC' },
  email: { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 },
  statusDot: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, background: '#30D158' },
  statusText: { fontSize: 12, color: 'rgba(255,255,255,0.4)' },
  actions: {
    display: 'flex', justifyContent: 'center', gap: 12,
    padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  actionBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    padding: '10px 16px', borderRadius: 14,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
    color: '#2A9D8F', fontSize: 11, fontWeight: 500, cursor: 'pointer',
    minWidth: 70,
  },
  infoSection: { padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' },
  infoItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 0',
  },
  infoLabel: { fontSize: 13, color: 'rgba(255,255,255,0.35)' },
  infoValue: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 },
  mediaSection: { padding: '16px 24px 24px' },
  mediaSectionTitle: { fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase' as any, letterSpacing: 1 },
}
