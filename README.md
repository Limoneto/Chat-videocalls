# Comvi Chat & Video Calls

A real-time chat and video calling application built with Next.js, Firebase, and LiveKit. Features a glassmorphism UI inspired by Apple Vision Pro with Comvi brand colors.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange) ![LiveKit](https://img.shields.io/badge/LiveKit-WebRTC-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## Demo

This is a fully functional web demo that shares the same Firebase backend as the React Native mobile library (`@comvi/chat`). Messages sync in real-time between web and mobile.

## Features

### Messaging
- **1-on-1 and group chat** with real-time Firebase Firestore sync
- **Text, images, GIFs** (via Giphy), and **voice messages** (recorded in-browser)
- **Read receipts** with WhatsApp-style checks: sent, delivered, read
- **Typing indicator** ("Juan is typing...")
- **Recording indicator** ("Juan is recording audio")
- **Unread badge** with message count per conversation
- **Toast notifications** with sound when new messages arrive
- **Content moderation** - automatic profanity filter (Spanish/English) + rate limiting

### Calls
- **Audio and video calls** powered by LiveKit Cloud (WebRTC)
- **1080p @ 60fps** with simulcast (auto-adapts quality to bandwidth)
- **Group calls** with adaptive grid layout (1-6+ participants)
- **Switch audio to video** mid-call
- **Mute, camera toggle, connection quality indicator**
- **Auto-reconnect** on network interruption
- **Incoming call banner** visible from any screen (global overlay)

### Anonymous Chat
- **Random nickname** generation ("Veloz Aguila 42", "Sabio Jaguar 7")
- **Hidden identity** - real name and photo are not shown
- **Reveal identity** option - user can choose to unmask themselves
- **Temporary chat** - auto-expires after a configurable duration (default: 60 min)

### Settings
- **Editable profile** - nickname, bio/status, phone number
- **Privacy controls** - show/hide last seen, profile photo, bio
- **Notifications** - toggle notifications and sounds
- **Appearance** - dark mode toggle
- **Account** - sign out, delete account

### UI/UX
- **Glassmorphism** design with backdrop blur and translucent panels
- **Comvi teal** (#2A9D8F) brand colors throughout
- **Sound effects** - send, receive, ring, connect, disconnect (Web Audio API)
- **Fully in Spanish** (UI text)
- **User profile panel** - click any avatar to see user details
- **Group members panel** - click "X members" to see all participants

## Architecture

```
Browser                         Cloud Services
+-------------------+          +------------------+
|   Next.js App     |          |  Firebase        |
|                   | <------> |  Firestore       |
|  - React          |  real    |  (messages,      |
|  - TypeScript     |  time    |   channels,      |
|  - Tailwind-free  |  sync    |   signals)       |
|    (inline CSS)   |          +------------------+
|                   |
|  API Routes       |          +------------------+
|  /api/livekit-    | -------> |  LiveKit Cloud   |
|    token          |  tokens  |  (WebRTC rooms,  |
|                   |          |   video/audio)   |
+-------------------+          +------------------+
                               +------------------+
                               |  Giphy API       |
                               |  (GIF search)    |
                               +------------------+
```

### Data Flow

**Sending a message:**
```
User types "Hello" -> moderateAndFilter() -> sendMessage()
  -> Firestore batch write:
       1. channels/{id}/messages_live/{msgId}  (the message)
       2. channels/{id}                        (lastMessage update)
       3. social_feeds/{recipientId}/...       (unreadCount +1)
  -> Recipient's onSnapshot fires -> message appears in real-time
```

**Making a call:**
```
User clicks phone icon -> startCall()
  -> Firestore write: call_signals/{recipientId} = { status: 'incoming' }
  -> Recipient's onSnapshot fires -> IncomingCallBanner appears
  -> Recipient clicks Accept -> respondToCall() + clearCallSignal()
  -> Both users: getLiveKitToken() -> POST /api/livekit-token
  -> Both users: room.connect(livekitUrl, token)
  -> LiveKit handles WebRTC negotiation, media streaming
```

**Anonymous chat:**
```
User clicks anonymous icon -> createAnonymousChannel()
  -> Generates random nicknames for all participants
  -> Creates channel with isAnonymous: true, expiresAt: now + 60min
  -> Messages show nickname instead of real name
  -> User can call revealIdentity() -> system message sent
  -> After expiration: isChannelExpired() = true -> hidden from list
```

## Firestore Collections

| Collection | Description |
|-----------|-------------|
| `users/{userId}` | User profiles (name, email, avatar) |
| `user_settings/{userId}` | Per-user settings (privacy, notifications) |
| `channels/{channelId}` | Chat channels (participants, metadata, anonymous config) |
| `channels/{id}/messages_live/{msgId}` | Messages (content, type, status, readUserIDs) |
| `channels/{id}/typing/{userId}` | Typing indicators (auto-expire 5s) |
| `channels/{id}/recording/{userId}` | Recording indicators (auto-expire 30s) |
| `social_feeds/{userId}/chat_feed_live/{channelId}` | Per-user conversation feed (lastMessage, unreadCount) |
| `calls/{callId}` | Call metadata |
| `call_signals/{userId}` | Incoming call signals (callID, caller, type) |

## Tech Stack

| Technology | Purpose | Cost |
|-----------|---------|------|
| **Next.js 14** | Web framework (App Router) | Free |
| **Firebase Firestore** | Real-time database | Free tier (50K reads/day) |
| **Firebase Auth** | Google Sign-In | Free |
| **LiveKit Cloud** | WebRTC video/audio | Free tier (5K min/month) |
| **Giphy API** | GIF search and display | Free |
| **Vercel** | Hosting and deployment | Free tier |
| **Web Audio API** | Sound effects | Built-in |

## Getting Started

### Prerequisites
- Node.js 20+
- Firebase project with Firestore and Auth enabled
- LiveKit Cloud account (free)
- Giphy API key (free)

### Setup

```bash
git clone https://github.com/Limoneto/Chat-videocalls.git
cd Chat-videocalls
git checkout comvi-demo

npm install

cp .env.local.example .env.local
# Edit .env.local with your credentials

npm run dev
```

Open http://localhost:3000

### Environment Variables

```env
# Firebase (from Firebase Console > Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# LiveKit (from cloud.livekit.io > Settings)
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=

# Giphy (from developers.giphy.com)
NEXT_PUBLIC_GIPHY_API_KEY=
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. **Authentication** > Sign-in method > Enable **Google**
3. **Authentication** > Settings > Authorized domains > Add your Vercel domain
4. **Firestore** > Rules > Publish:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Deploy to Vercel

### Option A: Vercel Dashboard (easiest)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Limoneto/Chat-videocalls` repo
3. Set branch to `comvi-demo`
4. Add all environment variables
5. Deploy

### Option B: GitHub Actions (automatic)
The repo includes CI/CD workflows:
- **CI** (`ci.yml`): Type check + build on every push/PR
- **Deploy** (`deploy.yml`): Auto-deploy to Vercel

Required GitHub Secrets:
| Secret | How to get it |
|--------|--------------|
| `VERCEL_TOKEN` | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Vercel dashboard > Settings |
| `VERCEL_PROJECT_ID` | Run `npx vercel link` |

## React Native Library

This web demo shares the same Firebase backend as the React Native library at `packages/chat-kit/`. Install it in your mobile app:

```tsx
import {
  ChatKitProvider,
  ConversationList,
  Chat,
  Call,
  IncomingCallBanner,
} from '@comvi/chat'

<ChatKitProvider
  livekitUrl="wss://your-project.livekit.cloud"
  giphyApiKey="your-key"
  user={{ id: uid, name: 'Juan', avatar: photoURL }}
>
  <IncomingCallBanner onAccept={(callID, type) => navigate('Call', { callID, type })} />
  <Stack.Screen name="Chats" component={ConversationList} />
  <Stack.Screen name="Chat" component={Chat} />
  <Stack.Screen name="Call" component={Call} />
</ChatKitProvider>
```

## Project Structure

```
src/
  app/
    page.tsx                     # Conversation list (home)
    layout.tsx                   # Root layout with global overlays
    settings/page.tsx            # Settings screen
    chat/[id]/page.tsx           # Chat screen
    call/[id]/page.tsx           # Call screen
    api/livekit-token/route.ts   # LiveKit JWT token generator
  components/
    AuthGate.tsx                 # Google Sign-In gate
    ConversationList.tsx         # Chat list with tabs (All/Unread/Groups)
    ChatScreen.tsx               # Chat with bubbles, audio, GIFs, moderation
    CallScreen.tsx               # Audio/video call with grid layout
    SettingsScreen.tsx           # Full settings (profile, privacy, notifications)
    UserProfile.tsx              # User profile panel
    IncomingCallBanner.tsx       # Incoming call overlay (global)
    NotificationToast.tsx        # Message notification toasts
    MessageStatus.tsx            # Read receipt checks
    GifPicker.tsx                # Giphy GIF selector
    GlobalOverlays.tsx           # Wraps children with global banners
  lib/
    firebase.ts                  # Firebase initialization
    chatClient.ts                # Firestore operations (messages, channels, calls, anonymous)
    livekitClient.ts             # LiveKit token fetcher
    moderator.ts                 # Content moderation (profanity filter + rate limit)
    sounds.ts                    # Sound effects via Web Audio API
  context/
    ChatProvider.tsx              # Auth state context
```

## License

MIT
