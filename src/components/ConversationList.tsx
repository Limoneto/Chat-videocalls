'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useChatContext } from '@/context/ChatProvider'
import { subscribeChannels, ChatChannel, createChannel, createAnonymousChannel, isChannelExpired } from '@/lib/chatClient'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { IncomingCallBanner } from './IncomingCallBanner'

export const ConversationList: React.FC = () => {
  const { user, signOut } = useChatContext()
  const router = useRouter()
  const [channels, setChannels] = useState<ChatChannel[]>([])
  const [search, setSearch] = useState('')
  const [showNewChat, setShowNewChat] = useState(false)
  const [showGroupCreate, setShowGroupCreate] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [availableUsers, setAvailableUsers] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups'>('all')

  useEffect(() => {
    if (!user) return
    const unsub = subscribeChannels(user.id, setChannels)
    return () => unsub()
  }, [user?.id])

  const loadUsers = async () => {
    const snap = await getDocs(collection(db, 'users'))
    setAvailableUsers(snap.docs.map(d => d.data()).filter(u => u.id !== user?.id))
  }

  const filtered = channels
    .filter(c => {
      const name = getChannelName(c)
      if (search && !name.toLowerCase().includes(search.toLowerCase())) return false
      if (activeTab === 'unread' && c.readUserIDs?.includes(user?.id || '')) return false
      if (activeTab === 'groups' && (c.participants?.length || 0) <= 2) return false
      return true
    })

  function getChannelName(ch: ChatChannel) {
    if (ch.name) return ch.name
    const other = ch.participants?.find(p => p.id !== user?.id)
    return other ? (other.name || [other.firstName, other.lastName].filter(Boolean).join(' ') || 'Desconocido') : 'Chat'
  }

  function getAvatar(ch: ChatChannel) {
    const other = ch.participants?.find(p => p.id !== user?.id)
    return other?.profilePictureURL
  }

  function formatTime(ts: string) {
    if (!ts) return ''
    const d = new Date(parseInt(ts) * 1000)
    const now = new Date()
    const diff = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diff === 0) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (diff < 7) return d.toLocaleDateString([], { weekday: 'short' })
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  const openChat = (ch: ChatChannel) => {
    const id = ch.id || ch.channelID
    router.push(`/chat/${id}?name=${encodeURIComponent(getChannelName(ch))}&participants=${encodeURIComponent(JSON.stringify(ch.participants || []))}`)
  }

  const handleCreateChat = async (other: any) => {
    if (!user) return
    await createChannel(
      { id: user.id, firstName: user.firstName, lastName: user.lastName, profilePictureURL: user.avatar },
      [{ id: other.id, firstName: other.firstName, lastName: other.lastName, profilePictureURL: other.profilePictureURL }],
    )
    setShowNewChat(false)
  }

  const handleCreateGroup = async () => {
    if (!user || !selectedUsers.length || !groupName.trim()) return
    const members = availableUsers.filter(u => selectedUsers.includes(u.id))
    await createChannel(
      { id: user.id, firstName: user.firstName, lastName: user.lastName, profilePictureURL: user.avatar },
      members.map(u => ({ id: u.id, firstName: u.firstName, lastName: u.lastName, profilePictureURL: u.profilePictureURL })),
      groupName.trim(), true,
    )
    setShowGroupCreate(false); setShowNewChat(false); setGroupName(''); setSelectedUsers([])
  }

  return (
    <div style={s.wrapper}>
      <IncomingCallBanner />

      <div style={s.panel}>
        {/* Header */}
        <div style={s.header}>
          <h1 style={s.title}>Comvi</h1>
          <div style={s.headerRight}>
            {user?.avatar && <img src={user.avatar} alt="" style={s.userAvatar} onClick={() => router.push('/settings')} />}
            <button style={s.iconBtn} onClick={() => router.push('/settings')} title="Configuración">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={s.searchWrap}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input style={s.searchInput} placeholder="Buscar" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          {(['all', 'unread', 'groups'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ ...s.tab, ...(activeTab === tab ? s.tabActive : {}) }}>
              {tab === 'all' ? 'Todos' : tab === 'unread' ? 'No leídos' : 'Grupos'}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={s.list}>
          {filtered.length === 0 ? (
            <div style={s.empty}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                {activeTab === 'unread' ? 'Sin mensajes no leídos' : 'Sin conversaciones'}
              </p>
            </div>
          ) : filtered.map(ch => {
            const isAnon = (ch as any).isAnonymous
            const expired = isChannelExpired(ch)
            if (expired) return null // No mostrar chats expirados

            const name = isAnon ? (ch.name || 'Chat anónimo') : getChannelName(ch)
            const avatar = isAnon ? undefined : getAvatar(ch)
            const isGroup = (ch.participants?.length || 0) > 2
            const unread = !ch.readUserIDs?.includes(user?.id || '')
            const unreadCount = (ch as any).unreadCount || (unread ? 1 : 0)

            return (
              <div key={ch.id || ch.channelID} style={s.item} onClick={() => openChat(ch)}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                {avatar ? (
                  <img src={avatar} alt="" style={s.avatar} />
                ) : (
                  <div style={{ ...s.avatarPlaceholder, background: isAnon ? 'linear-gradient(135deg, #6B7280, #374151)' : isGroup ? 'linear-gradient(135deg, #2A9D8F, #1A7A6E)' : 'linear-gradient(135deg, #1A7A6E, #2A9D8F)' }}>
                    {isAnon ? '🎭' : isGroup ? '👥' : name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div style={s.itemContent}>
                  <div style={s.itemTop}>
                    <span style={{ ...s.itemName, fontWeight: unread ? 700 : 500 }}>{name}</span>
                    <span style={{ ...s.itemTime, color: unread ? '#2A9D8F' : 'rgba(255,255,255,0.3)' }}>
                      {formatTime(ch.lastMessageDate || ch.createdAt)}
                    </span>
                  </div>
                  <div style={s.itemBottom}>
                    <span style={{ ...s.itemMsg, color: unread ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)' }}>
                      {ch.lastMessage || 'Inicia una conversación'}
                    </span>
                    {unreadCount > 0 && (
                      <div style={s.badge}>{unreadCount > 99 ? '99+' : unreadCount}</div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* FAB */}
        <button style={s.fab} onClick={() => { setShowNewChat(true); loadUsers() }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
        </button>
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div style={s.overlay} onClick={() => { setShowNewChat(false); setShowGroupCreate(false) }}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            {!showGroupCreate ? (
              <>
                <h3 style={s.modalTitle}>Nuevo chat</h3>
                <div style={s.modalItem} onClick={() => setShowGroupCreate(true)}>
                  <div style={{ ...s.modalItemAvatar, background: 'linear-gradient(135deg, #2A9D8F, #A78BFA)' }}>👥</div>
                  <div>
                    <div style={s.modalItemName}>Nuevo grupo</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Crear un chat grupal</div>
                  </div>
                </div>

                {/* Chat anónimo */}
                <div style={s.modalItem} onClick={async () => {
                  if (!user || availableUsers.length === 0) { await loadUsers(); return }
                  // Por ahora crea con el primer usuario disponible - en producción se seleccionaría
                  const other = availableUsers[0]
                  await createAnonymousChannel(
                    { id: user.id, firstName: user.firstName, lastName: user.lastName },
                    [{ id: other.id, firstName: other.firstName, lastName: other.lastName }],
                    undefined,
                    60, // expira en 60 minutos
                  )
                  setShowNewChat(false)
                }}>
                  <div style={{ ...s.modalItemAvatar, background: 'linear-gradient(135deg, #6B7280, #374151)' }}>🎭</div>
                  <div>
                    <div style={s.modalItemName}>Chat anónimo</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Nickname aleatorio, expira en 1h</div>
                  </div>
                </div>

                <div style={s.divider} />
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 8, textTransform: 'uppercase' as any, letterSpacing: 1 }}>Contactos</p>
                {availableUsers.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, textAlign: 'center' as any, padding: 20 }}>Sin otros usuarios</p>
                ) : (
                  <div style={{ maxHeight: 300, overflowY: 'auto' as any }}>
                    {availableUsers.map(u => (
                      <div key={u.id} style={s.modalItem} onClick={() => handleCreateChat(u)}>
                        {u.profilePictureURL ? <img src={u.profilePictureURL} alt="" style={{ width: 40, height: 40, borderRadius: 20 }} /> : (
                          <div style={s.modalItemAvatar}>{(u.firstName || '?').charAt(0).toUpperCase()}</div>
                        )}
                        <div>
                          <div style={s.modalItemName}>{[u.firstName, u.lastName].filter(Boolean).join(' ')}</div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{u.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 style={s.modalTitle}>Nuevo grupo</h3>
                <input style={s.modalInput} placeholder="Nombre del grupo" value={groupName} onChange={e => setGroupName(e.target.value)} />
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: '12px 0 8px', textTransform: 'uppercase' as any, letterSpacing: 1 }}>Miembros</p>
                <div style={{ maxHeight: 220, overflowY: 'auto' as any }}>
                  {availableUsers.map(u => (
                    <div key={u.id} style={{ ...s.modalItem, background: selectedUsers.includes(u.id) ? 'rgba(42,157,143,0.1)' : 'transparent' }}
                      onClick={() => setSelectedUsers(prev => prev.includes(u.id) ? prev.filter(id => id !== u.id) : [...prev, u.id])}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${selectedUsers.includes(u.id) ? '#2A9D8F' : 'rgba(255,255,255,0.15)'}`, background: selectedUsers.includes(u.id) ? '#2A9D8F' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, marginRight: 8 }}>
                        {selectedUsers.includes(u.id) ? '✓' : ''}
                      </div>
                      {u.profilePictureURL ? <img src={u.profilePictureURL} alt="" style={{ width: 36, height: 36, borderRadius: 18 }} /> : (
                        <div style={{ ...s.modalItemAvatar, width: 36, height: 36 }}>{(u.firstName || '?').charAt(0).toUpperCase()}</div>
                      )}
                      <div style={{ marginLeft: 4 }}><div style={s.modalItemName}>{[u.firstName, u.lastName].filter(Boolean).join(' ')}</div></div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <button style={s.modalBtnSecondary} onClick={() => setShowGroupCreate(false)}>Volver</button>
                  <button style={{ ...s.modalBtnPrimary, opacity: selectedUsers.length && groupName.trim() ? 1 : 0.4 }}
                    onClick={handleCreateGroup} disabled={!selectedUsers.length || !groupName.trim()}>
                    Crear ({selectedUsers.length})
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 16 },
  panel: {
    width: 420, height: 'calc(100vh - 32px)', maxHeight: 800,
    background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(60px) saturate(150%)',
    WebkitBackdropFilter: 'blur(60px) saturate(150%)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24,
    display: 'flex', flexDirection: 'column', position: 'relative' as any,
    overflow: 'hidden', animation: 'slideIn 0.3s ease',
  },
  header: { padding: '20px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 8 },
  userAvatar: { width: 32, height: 32, borderRadius: 16, cursor: 'pointer', border: '2px solid rgba(255,255,255,0.1)' },
  iconBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', padding: 6, borderRadius: 8, display: 'flex' },
  searchWrap: {
    margin: '0 16px 8px', padding: '8px 12px', borderRadius: 12,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  searchInput: { flex: 1, background: 'none', border: 'none', color: '#F8FAFC', fontSize: 14 },
  tabs: { display: 'flex', gap: 4, padding: '0 16px 8px' },
  tab: {
    padding: '5px 14px', borderRadius: 20, border: 'none', fontSize: 13, fontWeight: 500,
    background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
  },
  tabActive: { background: 'rgba(42,157,143,0.15)', color: '#5EC4B6' },
  list: { flex: 1, overflowY: 'auto' as any, padding: '0 8px' },
  empty: { display: 'flex', justifyContent: 'center', paddingTop: 60 },
  item: {
    display: 'flex', alignItems: 'center', padding: '10px 12px', borderRadius: 14,
    cursor: 'pointer', transition: 'background 0.15s', gap: 12,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, objectFit: 'cover' as any, flexShrink: 0 },
  avatarPlaceholder: {
    width: 48, height: 48, borderRadius: 24, color: '#FFF',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 18, fontWeight: 600, flexShrink: 0,
  },
  itemContent: { flex: 1, minWidth: 0 },
  itemTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  itemName: { fontSize: 15, color: 'rgba(255,255,255,0.9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as any },
  itemTime: { fontSize: 11, flexShrink: 0, marginLeft: 8 },
  itemBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  itemMsg: { fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as any, flex: 1 },
  badge: {
    minWidth: 20, height: 20, borderRadius: 10, background: '#2A9D8F',
    color: '#FFF', fontSize: 11, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '0 6px', flexShrink: 0, marginLeft: 8,
  },
  fab: {
    position: 'absolute' as any, bottom: 20, right: 20,
    width: 50, height: 50, borderRadius: 16,
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)',
    border: 'none', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(42,157,143,0.3)',
  },
  overlay: {
    position: 'fixed' as any, top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
  },
  modal: {
    background: 'rgba(20,20,30,0.9)', backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
    padding: 24, width: 380, maxWidth: '90%', animation: 'slideIn 0.2s ease',
  },
  modalTitle: { fontSize: 20, fontWeight: 600, marginBottom: 16 },
  modalItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '8px 4px',
    borderRadius: 10, cursor: 'pointer', transition: 'background 0.15s',
  },
  modalItemAvatar: {
    width: 40, height: 40, borderRadius: 20, background: 'linear-gradient(135deg, #1A7A6E, #2A9D8F)',
    color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600,
  },
  modalItemName: { fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.9)' },
  divider: { height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' },
  modalInput: {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)',
    color: '#F8FAFC', fontSize: 14,
  },
  modalBtnSecondary: {
    flex: 1, padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
    background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500,
  },
  modalBtnPrimary: {
    flex: 1, padding: '10px 16px', borderRadius: 10, border: 'none',
    background: 'linear-gradient(135deg, #2A9D8F, #1A7A6E)', color: '#FFF', fontSize: 14, fontWeight: 500,
  },
}
