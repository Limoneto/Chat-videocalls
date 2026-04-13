import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  getDoc,
  arrayUnion,
  increment,
  writeBatch,
} from 'firebase/firestore'
import { db } from './firebase'

// Types
export interface ChatMessage {
  id: string
  senderID: string
  senderFirstName: string
  senderLastName?: string
  senderProfilePictureURL?: string
  content: string
  url?: string
  type: 'text' | 'image' | 'gif' | 'system'
  createdAt: string
  readUserIDs?: string[]
  deliveredUserIDs?: string[]
  status?: 'sending' | 'sent' | 'delivered' | 'read'
}

export interface ChatChannel {
  id: string
  channelID: string
  name: string
  participants: Array<{
    id: string
    name?: string
    firstName?: string
    lastName?: string
    profilePictureURL?: string
  }>
  createdAt: string
  lastMessage?: string
  lastMessageDate?: string
  lastMessageSenderId?: string
  readUserIDs?: string[]
}

// Subscribe to user's conversation list
export const subscribeChannels = (
  userID: string,
  callback: (channels: ChatChannel[]) => void,
) => {
  // No orderBy to avoid needing Firestore index - sort client-side
  const ref = collection(db, 'social_feeds', userID, 'chat_feed_live')

  return onSnapshot(ref,
    (snapshot) => {
      const channels = snapshot.docs.map((d) => d.data() as ChatChannel)
      // Sort by latest activity
      channels.sort((a, b) => {
        const dateA = a.lastMessageDate || a.createdAt || '0'
        const dateB = b.lastMessageDate || b.createdAt || '0'
        return dateB.localeCompare(dateA)
      })
      callback(channels)
    },
    (error) => { console.warn('[ChatKit] subscribeChannels:', error); callback([]) },
  )
}

// Set recording status
export const setRecording = async (channelID: string, userID: string, userName: string, isRecording: boolean) => {
  if (isRecording) {
    await setDoc(doc(db, 'channels', channelID, 'recording', userID), {
      userID, userName, timestamp: Date.now(),
    })
  } else {
    const { deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db, 'channels', channelID, 'recording', userID)).catch(() => {})
  }
}

// Subscribe to recording indicators
export const subscribeToRecording = (
  channelID: string,
  currentUserID: string,
  callback: (recordingUsers: string[]) => void,
) => {
  const ref = collection(db, 'channels', channelID, 'recording')
  return onSnapshot(ref,
    (snapshot) => {
      const now = Date.now()
      const users = snapshot.docs
        .map(d => d.data())
        .filter(r => r.userID !== currentUserID && now - r.timestamp < 30000)
        .map(r => r.userName || 'Someone')
      callback(users)
    },
    () => callback([]),
  )
}

// Set typing status
export const setTyping = async (channelID: string, userID: string, userName: string, isTyping: boolean) => {
  if (isTyping) {
    await setDoc(doc(db, 'channels', channelID, 'typing', userID), {
      userID,
      userName,
      timestamp: Date.now(),
    })
  } else {
    const { deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db, 'channels', channelID, 'typing', userID)).catch(() => {})
  }
}

// Subscribe to typing indicators
export const subscribeToTyping = (
  channelID: string,
  currentUserID: string,
  callback: (typingUsers: string[]) => void,
) => {
  const ref = collection(db, 'channels', channelID, 'typing')
  return onSnapshot(ref,
    (snapshot) => {
      const now = Date.now()
      const typingUsers = snapshot.docs
        .map((d) => d.data())
        .filter((t) => t.userID !== currentUserID && now - t.timestamp < 5000) // 5s timeout
        .map((t) => t.userName || 'Someone')
      callback(typingUsers)
    },
    () => callback([]),
  )
}

// Subscribe to messages
export const subscribeToMessages = (
  channelID: string,
  callback: (messages: ChatMessage[]) => void,
) => {
  const ref = collection(db, 'channels', channelID, 'messages_live')
  const q = query(ref, orderBy('createdAt', 'desc'))

  return onSnapshot(q,
    (snapshot) => callback(snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as ChatMessage))),
    (error) => { console.warn('[ChatKit] subscribeToMessages:', error); callback([]) },
  )
}

// Send message + update feeds in a single batch
export const sendMessage = async (channelID: string, message: Partial<ChatMessage>) => {
  const timestamp = Math.round(Date.now() / 1000).toString()
  const msgID = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  const msgData = {
    ...message,
    id: msgID,
    createdAt: message.createdAt || timestamp,
    status: 'sent',
  }

  // Get channel to know participants
  const channelDoc = await getDoc(doc(db, 'channels', channelID))
  const channelData = channelDoc.data()

  // Single batch: message + channel update + all feeds
  const batch = writeBatch(db)

  // 1. Write message
  batch.set(doc(db, 'channels', channelID, 'messages_live', msgID), msgData)

  // 2. Update channel metadata
  batch.set(doc(db, 'channels', channelID), {
    lastMessage: message.content || '',
    lastMessageDate: timestamp,
    lastMessageSenderId: message.senderID,
  }, { merge: true })

  // 3. Update each participant's feed
  if (channelData?.participants) {
    for (const p of channelData.participants) {
      const isSender = p.id === message.senderID
      const feedUpdate: any = {
        lastMessage: message.content || '',
        lastMessageDate: timestamp,
        lastMessageSenderId: message.senderID,
      }
      if (!isSender) {
        // Increment unread count for receivers
        feedUpdate.unreadCount = increment(1)
        feedUpdate.readUserIDs = [] // mark as unread
      }
      batch.set(
        doc(db, 'social_feeds', p.id, 'chat_feed_live', channelID),
        feedUpdate,
        { merge: true },
      )
    }
  }

  await batch.commit()
  return msgData
}

// Create channel
export const createChannel = async (creator: any, otherParticipants: any[], name?: string) => {
  const id1 = creator.id
  let channelID = `ch_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  if (otherParticipants.length === 1) {
    const id2 = otherParticipants[0].id
    if (id1 === id2) return null
    channelID = id1 < id2 ? id1 + id2 : id2 + id1
  }

  const timestamp = Math.round(Date.now() / 1000).toString()
  const allParticipants = [...otherParticipants, creator]

  const channelData = {
    id: channelID,
    channelID,
    creatorID: id1,
    name: name || '',
    participants: allParticipants,
    createdAt: timestamp,
    lastMessage: '',
    lastMessageDate: timestamp,
  }

  const batch = writeBatch(db)

  batch.set(doc(db, 'channels', channelID), channelData)

  for (const p of allParticipants) {
    batch.set(
      doc(db, 'social_feeds', p.id, 'chat_feed_live', channelID),
      { ...channelData, readUserIDs: [id1] },
    )
  }

  await batch.commit()
  return channelData
}

// Mark as read - update message + reset unread count in feed
export const markAsRead = async (channelID: string, userID: string, messageID: string, readUserIDs: string[]) => {
  await setDoc(
    doc(db, 'channels', channelID, 'messages_live', messageID),
    { readUserIDs, status: 'read' },
    { merge: true },
  )
  // Reset unread count in user's feed
  await setDoc(
    doc(db, 'social_feeds', userID, 'chat_feed_live', channelID),
    { unreadCount: 0, readUserIDs: arrayUnion(userID) },
    { merge: true },
  ).catch(() => {})
}

// Start a call - writes to Firestore so the other user gets notified
export const startCall = async (
  callID: string,
  callType: 'audio' | 'video',
  caller: { id: string; name: string; avatar?: string },
  participants: Array<{ id: string; name?: string; firstName?: string }>,
  channelName: string,
) => {
  const timestamp = Math.round(Date.now() / 1000).toString()
  const batch = writeBatch(db)

  // Write call data
  batch.set(doc(db, 'calls', callID), {
    callID,
    callType,
    channelName,
    caller,
    participants,
    status: 'ringing',
    createdAt: timestamp,
  })

  // Notify each participant
  for (const p of participants) {
    if (p.id !== caller.id) {
      batch.set(doc(db, 'call_signals', p.id), {
        callID,
        callType,
        channelName,
        caller,
        status: 'incoming',
        createdAt: timestamp,
      })
    }
  }

  await batch.commit()
}

// Subscribe to incoming calls
export const subscribeToIncomingCalls = (
  userID: string,
  callback: (call: any | null) => void,
) => {
  return onSnapshot(
    doc(db, 'call_signals', userID),
    (snapshot) => {
      const data = snapshot.data()
      if (data && data.status === 'incoming') {
        callback(data)
      } else {
        callback(null)
      }
    },
    () => callback(null),
  )
}

// Accept/reject call
export const respondToCall = async (userID: string, accept: boolean) => {
  await setDoc(doc(db, 'call_signals', userID), { status: accept ? 'accepted' : 'rejected' }, { merge: true })
}

// Clear call signal
export const clearCallSignal = async (userID: string) => {
  const { deleteDoc } = await import('firebase/firestore')
  await deleteDoc(doc(db, 'call_signals', userID)).catch(() => {})
}

// ===== Chats anónimos =====

const ANIMAL_NAMES = [
  'Lobo', 'Águila', 'Zorro', 'Delfín', 'León', 'Búho', 'Halcón', 'Puma',
  'Cóndor', 'Jaguar', 'Colibrí', 'Tucán', 'Orca', 'Lince', 'Fénix', 'Ciervo',
  'Gato', 'Caballo', 'Tigre', 'Oso', 'Ballena', 'Mariposa', 'Gavilán', 'Pantera',
]

const ADJECTIVES = [
  'Veloz', 'Sabio', 'Noble', 'Audaz', 'Libre', 'Ágil', 'Valiente', 'Astuto',
  'Sereno', 'Intrépido', 'Bravo', 'Silencioso', 'Misterioso', 'Radiante',
]

export function generateAnonymousNickname(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const animal = ANIMAL_NAMES[Math.floor(Math.random() * ANIMAL_NAMES.length)]
  const num = Math.floor(Math.random() * 99) + 1
  return `${adj} ${animal} ${num}`
}

export interface AnonymousConfig {
  isAnonymous: boolean
  nickname: string
  revealedIdentity: boolean
  expiresAt?: number // timestamp - chat temporal
}

// Crear chat anónimo
export const createAnonymousChannel = async (
  creator: any,
  otherParticipants: any[],
  name?: string,
  expiresInMinutes?: number, // 0 = no expira
) => {
  const channelID = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const timestamp = Math.round(Date.now() / 1000).toString()

  // Generar nicknames anónimos para cada participante
  const anonymousParticipants = [creator, ...otherParticipants].map(p => ({
    ...p,
    anonymousNickname: generateAnonymousNickname(),
    isAnonymous: true,
    revealedIdentity: false,
  }))

  const channelData: any = {
    id: channelID,
    channelID,
    creatorID: creator.id,
    name: name || 'Chat anónimo',
    participants: anonymousParticipants,
    createdAt: timestamp,
    lastMessage: '',
    lastMessageDate: timestamp,
    isAnonymous: true,
    anonymousConfig: {
      createdAt: Date.now(),
      expiresAt: expiresInMinutes ? Date.now() + expiresInMinutes * 60 * 1000 : null,
    },
  }

  const batch = writeBatch(db)
  batch.set(doc(db, 'channels', channelID), channelData)

  for (const p of anonymousParticipants) {
    batch.set(
      doc(db, 'social_feeds', p.id, 'chat_feed_live', channelID),
      { ...channelData, readUserIDs: [creator.id] },
    )
  }

  await batch.commit()
  return channelData
}

// Revelar identidad en chat anónimo
export const revealIdentity = async (channelID: string, userID: string) => {
  const channelDoc = await getDoc(doc(db, 'channels', channelID))
  const data = channelDoc.data()
  if (!data?.participants) return

  const updatedParticipants = data.participants.map((p: any) =>
    p.id === userID ? { ...p, revealedIdentity: true } : p,
  )

  await setDoc(doc(db, 'channels', channelID), { participants: updatedParticipants }, { merge: true })

  // Enviar mensaje de sistema
  const msgID = `sys_${Date.now()}`
  const participant = data.participants.find((p: any) => p.id === userID)
  const realName = [participant?.firstName, participant?.lastName].filter(Boolean).join(' ')
  const anonName = participant?.anonymousNickname || 'Alguien'

  await setDoc(doc(db, 'channels', channelID, 'messages_live', msgID), {
    id: msgID,
    senderID: 'system',
    senderFirstName: 'Sistema',
    content: `${anonName} reveló su identidad: ${realName}`,
    type: 'system',
    createdAt: Math.round(Date.now() / 1000).toString(),
    status: 'sent',
  })
}

// Verificar si un chat temporal expiró
export const isChannelExpired = (channel: any): boolean => {
  if (!channel?.anonymousConfig?.expiresAt) return false
  return Date.now() > channel.anonymousConfig.expiresAt
}
