'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

interface AppUser {
  id: string
  name: string
  email: string
  avatar?: string
  firstName?: string
  lastName?: string
}

interface ChatContextValue {
  user: AppUser | null
  firebaseUser: User | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const ChatContext = createContext<ChatContextValue>({
  user: null,
  firebaseUser: null,
  isLoading: true,
  signOut: async () => {},
})

export const useChatContext = () => useContext(ChatContext)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [user, setUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser)
        const displayName = fbUser.displayName || fbUser.email || 'Usuario'
        const appUser = {
          id: fbUser.uid,
          name: displayName,
          email: fbUser.email || '',
          avatar: fbUser.photoURL || undefined,
          firstName: displayName.split(' ')[0],
          lastName: displayName.split(' ').slice(1).join(' '),
        }
        setUser(appUser)

        // Save user profile to Firestore so other users can find them
        setDoc(doc(db, 'users', fbUser.uid), {
          id: fbUser.uid,
          firstName: appUser.firstName,
          lastName: appUser.lastName,
          email: appUser.email,
          profilePictureURL: appUser.avatar || '',
        }, { merge: true }).catch(() => {})
      } else {
        setFirebaseUser(null)
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = async () => {
    await auth.signOut()
  }

  return (
    <ChatContext.Provider value={{ user, firebaseUser, isLoading, signOut }}>
      {children}
    </ChatContext.Provider>
  )
}
