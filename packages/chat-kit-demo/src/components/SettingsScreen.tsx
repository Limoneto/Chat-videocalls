'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { useChatContext } from '@/context/ChatProvider'

interface UserSettings {
  nickname: string
  bio: string
  phone: string
  showLastSeen: boolean
  showProfilePhoto: boolean
  showBio: boolean
  notificationsEnabled: boolean
  soundsEnabled: boolean
  darkMode: boolean
}

const defaultSettings: UserSettings = {
  nickname: '',
  bio: '',
  phone: '',
  showLastSeen: true,
  showProfilePhoto: true,
  showBio: true,
  notificationsEnabled: true,
  soundsEnabled: true,
  darkMode: true,
}

export const SettingsScreen: React.FC = () => {
  const { user, signOut } = useChatContext()
  const router = useRouter()
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Cargar configuración
  useEffect(() => {
    if (!user?.id) return
    getDoc(doc(db, 'user_settings', user.id)).then(snap => {
      if (snap.exists()) setSettings({ ...defaultSettings, ...snap.data() as any })
    })
  }, [user?.id])

  // Guardar configuración
  const saveSettings = async (updates: Partial<UserSettings>) => {
    if (!user?.id) return
    setSaving(true)
    const newSettings = { ...settings, ...updates }
    setSettings(newSettings)
    await setDoc(doc(db, 'user_settings', user.id), newSettings, { merge: true })
    setSaving(false)
  }

  const startEdit = (field: string, currentValue: string) => {
    setEditingField(field)
    setTempValue(currentValue)
  }

  const saveEdit = () => {
    if (editingField) {
      saveSettings({ [editingField]: tempValue })
      // También actualizar en el perfil público
      if (editingField === 'nickname' || editingField === 'bio' || editingField === 'phone') {
        setDoc(doc(db, 'users', user!.id), { [editingField]: tempValue }, { merge: true })
      }
    }
    setEditingField(null)
  }

  const handleDeleteAccount = async () => {
    // Solo marca como eliminada, no borra datos realmente
    await setDoc(doc(db, 'user_settings', user!.id), { deleted: true, deletedAt: Date.now() }, { merge: true })
    await signOut()
  }

  return (
    <div style={s.wrapper}>
      <div style={s.panel}>
        {/* Header */}
        <div style={s.header}>
          <button style={s.backBtn} onClick={() => router.push('/')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 style={s.title}>Configuración</h1>
          {saving && <span style={s.savingBadge}>Guardando...</span>}
        </div>

        <div style={s.content}>
          {/* Perfil */}
          <div style={s.section}>
            <span style={s.sectionTitle}>PERFIL</span>

            <div style={s.profileCard}>
              {user?.avatar ? (
                <img src={user.avatar} alt="" style={s.profileAvatar} />
              ) : (
                <div style={s.profileAvatarPlaceholder}>
                  {user?.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
              )}
              <div style={s.profileInfo}>
                <span style={s.profileName}>{user?.name}</span>
                <span style={s.profileEmail}>{user?.email}</span>
              </div>
            </div>

            <SettingItem
              label="Apodo / Nickname"
              value={settings.nickname || 'Sin apodo'}
              onPress={() => startEdit('nickname', settings.nickname)}
            />
            <SettingItem
              label="Bio / Estado"
              value={settings.bio || 'Sin bio'}
              onPress={() => startEdit('bio', settings.bio)}
            />
            <SettingItem
              label="Teléfono"
              value={settings.phone || 'No configurado'}
              onPress={() => startEdit('phone', settings.phone)}
            />
          </div>

          {/* Privacidad */}
          <div style={s.section}>
            <span style={s.sectionTitle}>PRIVACIDAD</span>

            <SettingToggle
              label="Mostrar última conexión"
              description="Otros usuarios pueden ver cuándo te conectaste por última vez"
              value={settings.showLastSeen}
              onChange={(v) => saveSettings({ showLastSeen: v })}
            />
            <SettingToggle
              label="Mostrar foto de perfil"
              description="Tu foto es visible para todos los usuarios"
              value={settings.showProfilePhoto}
              onChange={(v) => saveSettings({ showProfilePhoto: v })}
            />
            <SettingToggle
              label="Mostrar bio"
              description="Tu bio/estado es visible para otros"
              value={settings.showBio}
              onChange={(v) => saveSettings({ showBio: v })}
            />
          </div>

          {/* Notificaciones */}
          <div style={s.section}>
            <span style={s.sectionTitle}>NOTIFICACIONES</span>

            <SettingToggle
              label="Notificaciones"
              description="Recibir notificaciones de mensajes y llamadas"
              value={settings.notificationsEnabled}
              onChange={(v) => saveSettings({ notificationsEnabled: v })}
            />
            <SettingToggle
              label="Sonidos"
              description="Reproducir sonidos al enviar y recibir mensajes"
              value={settings.soundsEnabled}
              onChange={(v) => saveSettings({ soundsEnabled: v })}
            />
          </div>

          {/* Apariencia */}
          <div style={s.section}>
            <span style={s.sectionTitle}>APARIENCIA</span>
            <SettingToggle
              label="Modo oscuro"
              description="Tema oscuro para la interfaz"
              value={settings.darkMode}
              onChange={(v) => saveSettings({ darkMode: v })}
            />
          </div>

          {/* Cuenta */}
          <div style={s.section}>
            <span style={s.sectionTitle}>CUENTA</span>

            <button style={s.dangerBtn} onClick={() => signOut()}>
              Cerrar sesión
            </button>
            <button style={{ ...s.dangerBtn, color: '#FF453A', borderColor: 'rgba(255,69,58,0.2)' }}
              onClick={() => setShowDeleteConfirm(true)}>
              Eliminar cuenta
            </button>
          </div>

          <p style={s.version}>Comvi v1.0.0</p>
        </div>

        {/* Edit modal */}
        {editingField && (
          <div style={s.overlay} onClick={() => setEditingField(null)}>
            <div style={s.modal} onClick={e => e.stopPropagation()}>
              <h3 style={s.modalTitle}>
                {editingField === 'nickname' ? 'Apodo / Nickname' :
                 editingField === 'bio' ? 'Bio / Estado' : 'Teléfono'}
              </h3>
              {editingField === 'bio' ? (
                <textarea style={s.modalTextarea} value={tempValue}
                  onChange={e => setTempValue(e.target.value)} placeholder="Escribí algo sobre vos..."
                  maxLength={150} autoFocus rows={3} />
              ) : (
                <input style={s.modalInput} value={tempValue}
                  onChange={e => setTempValue(e.target.value)}
                  placeholder={editingField === 'nickname' ? 'Tu apodo' : '+54 11 1234-5678'}
                  autoFocus />
              )}
              {editingField === 'bio' && (
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'right' as any, display: 'block' }}>
                  {tempValue.length}/150
                </span>
              )}
              <div style={s.modalActions}>
                <button style={s.modalBtnSecondary} onClick={() => setEditingField(null)}>Cancelar</button>
                <button style={s.modalBtnPrimary} onClick={saveEdit}>Guardar</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirmation */}
        {showDeleteConfirm && (
          <div style={s.overlay} onClick={() => setShowDeleteConfirm(false)}>
            <div style={s.modal} onClick={e => e.stopPropagation()}>
              <h3 style={s.modalTitle}>¿Eliminar cuenta?</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 20 }}>
                Esta acción no se puede deshacer. Se eliminarán todos tus datos y conversaciones.
              </p>
              <div style={s.modalActions}>
                <button style={s.modalBtnSecondary} onClick={() => setShowDeleteConfirm(false)}>Cancelar</button>
                <button style={{ ...s.modalBtnPrimary, background: '#FF453A' }} onClick={handleDeleteAccount}>
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Sub-components
const SettingItem: React.FC<{ label: string; value: string; onPress: () => void }> = ({ label, value, onPress }) => (
  <div style={s.settingItem} onClick={onPress}
    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
    <div>
      <span style={s.settingLabel}>{label}</span>
      <span style={s.settingValue}>{value}</span>
    </div>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
  </div>
)

const SettingToggle: React.FC<{ label: string; description: string; value: boolean; onChange: (v: boolean) => void }> = ({ label, description, value, onChange }) => (
  <div style={s.settingItem} onClick={() => onChange(!value)}>
    <div style={{ flex: 1 }}>
      <span style={s.settingLabel}>{label}</span>
      <span style={s.settingDescription}>{description}</span>
    </div>
    <div style={{ ...s.toggle, background: value ? '#2A9D8F' : 'rgba(255,255,255,0.1)' }}>
      <div style={{ ...s.toggleDot, transform: value ? 'translateX(18px)' : 'translateX(2px)' }} />
    </div>
  </div>
)

const s: Record<string, React.CSSProperties> = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 16 },
  panel: {
    width: 420, height: 'calc(100vh - 32px)', maxHeight: 800,
    background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(60px) saturate(150%)',
    WebkitBackdropFilter: 'blur(60px) saturate(150%)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24,
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  },
  header: {
    padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  backBtn: { background: 'none', border: 'none', color: '#2A9D8F', cursor: 'pointer', display: 'flex', padding: 4 },
  title: { fontSize: 20, fontWeight: 600, flex: 1 },
  savingBadge: { fontSize: 11, color: '#2A9D8F', background: 'rgba(42,157,143,0.1)', padding: '2px 8px', borderRadius: 8 },
  content: { flex: 1, overflowY: 'auto' as any, padding: '8px 0' },
  section: { padding: '12px 20px' },
  sectionTitle: { fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: 1.5, display: 'block', marginBottom: 8 },
  profileCard: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', marginBottom: 8,
  },
  profileAvatar: { width: 60, height: 60, borderRadius: 30, border: '2px solid rgba(42,157,143,0.3)' },
  profileAvatarPlaceholder: {
    width: 60, height: 60, borderRadius: 30,
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, fontWeight: 600,
  },
  profileInfo: { display: 'flex', flexDirection: 'column' },
  profileName: { fontSize: 18, fontWeight: 600 },
  profileEmail: { fontSize: 13, color: 'rgba(255,255,255,0.4)' },
  settingItem: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 4px', borderRadius: 10, cursor: 'pointer', transition: 'background 0.15s',
  },
  settingLabel: { fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.9)', display: 'block' },
  settingValue: { fontSize: 13, color: 'rgba(255,255,255,0.35)', display: 'block', marginTop: 2 },
  settingDescription: { fontSize: 12, color: 'rgba(255,255,255,0.3)', display: 'block', marginTop: 2 },
  toggle: {
    width: 44, height: 26, borderRadius: 13, position: 'relative' as any,
    transition: 'background 0.2s', flexShrink: 0, cursor: 'pointer',
  },
  toggleDot: {
    width: 22, height: 22, borderRadius: 11, background: '#FFF',
    position: 'absolute' as any, top: 2, transition: 'transform 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
  dangerBtn: {
    width: '100%', padding: '12px 16px', borderRadius: 10, marginTop: 8,
    border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)',
    color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 500,
    cursor: 'pointer', textAlign: 'left' as any,
  },
  version: { textAlign: 'center' as any, color: 'rgba(255,255,255,0.15)', fontSize: 12, padding: 20 },
  overlay: {
    position: 'fixed' as any, top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
  },
  modal: {
    background: 'rgba(20,20,30,0.95)', backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
    padding: 24, width: 340, maxWidth: '90%',
  },
  modalTitle: { fontSize: 18, fontWeight: 600, marginBottom: 16 },
  modalInput: {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)',
    color: '#F8FAFC', fontSize: 15, marginBottom: 12,
  },
  modalTextarea: {
    width: '100%', padding: '10px 14px', borderRadius: 10, resize: 'none' as any,
    border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)',
    color: '#F8FAFC', fontSize: 15, marginBottom: 4, fontFamily: 'inherit',
  },
  modalActions: { display: 'flex', gap: 8, marginTop: 12 },
  modalBtnSecondary: {
    flex: 1, padding: '10px 16px', borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
    color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
  },
  modalBtnPrimary: {
    flex: 1, padding: '10px 16px', borderRadius: 10, border: 'none',
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    color: '#FFF', fontSize: 14, fontWeight: 500, cursor: 'pointer',
  },
}
