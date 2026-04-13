# Comvi Chat

> Chat, llamadas y mensajeria en tiempo real. Configurable, tematico, con moderacion y chats anonimos.

## Features

- **Chat 1-1 y grupal** con Firebase Firestore en tiempo real
- **Videollamadas y audio** con LiveKit Cloud (1080p@60fps, simulcast)
- **GIFs** via Giphy SDK
- **Mensajes de voz** con grabacion y reproduccion
- **Checks de lectura** - enviado, entregado, leido
- **Indicadores** de escribiendo y grabando audio
- **Notificaciones** toast en tiempo real con sonido
- **Llamadas entrantes** con banner global persistente
- **Chats anonimos** con nickname aleatorio, identidad oculta y expiracion temporal
- **Moderacion de contenido** automatica (ES/EN) con filtro de palabras y rate limiting
- **Perfil de usuario** editable (apodo, bio, telefono)
- **Configuraciones** completas (privacidad, notificaciones, apariencia)
- **Llamadas grupales** con grid adaptativo (hasta 6+ participantes)
- **Switch audio a video** durante una llamada
- **UI glassmorphism** estilo Apple Vision

## Stack

| Servicio | Uso | Costo |
|----------|-----|-------|
| Firebase Firestore | Chat, mensajes, señalizacion | Gratis (free tier) |
| Firebase Auth | Login con Google | Gratis |
| LiveKit Cloud | Videollamadas WebRTC | Gratis (5000 min/mes) |
| Giphy | GIFs | Gratis |
| Next.js | Frontend web | - |
| Vercel | Hosting | Gratis |

## Setup local

```bash
# Clonar
git clone https://github.com/Limoneto/Portfolio.git
cd Portfolio

# Instalar
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales

# Correr
npm run dev
```

Abrir http://localhost:3000

## Variables de entorno

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# LiveKit (videollamadas)
NEXT_PUBLIC_LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=

# Giphy (GIFs)
NEXT_PUBLIC_GIPHY_API_KEY=
```

## Requisitos en Firebase

1. **Authentication** - Habilitar provider Google
2. **Firestore** - Crear base de datos con estas rules:

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

3. **Authorized domains** - Agregar tu dominio de Vercel

## Estructura del proyecto

```
src/
  app/
    page.tsx                    # Lista de conversaciones
    layout.tsx                  # Layout global con overlays
    settings/page.tsx           # Configuraciones
    chat/[id]/page.tsx          # Pantalla de chat
    call/[id]/page.tsx          # Pantalla de llamada
    api/livekit-token/route.ts  # Generador de tokens LiveKit
  components/
    AuthGate.tsx                # Login con Google
    ConversationList.tsx        # Lista de chats con tabs
    ChatScreen.tsx              # Chat con burbujas, audio, GIFs
    CallScreen.tsx              # Llamada audio/video con grid
    SettingsScreen.tsx          # Configuraciones completas
    UserProfile.tsx             # Perfil de usuario
    IncomingCallBanner.tsx      # Banner de llamada entrante
    NotificationToast.tsx       # Notificaciones de mensajes
    MessageStatus.tsx           # Checks de lectura
    GifPicker.tsx               # Selector de GIFs
    GlobalOverlays.tsx          # Overlays globales
  lib/
    firebase.ts                 # Configuracion Firebase
    chatClient.ts               # Operaciones Firestore (mensajes, canales, llamadas, anonimo)
    livekitClient.ts            # Cliente LiveKit
    moderator.ts                # Moderacion de contenido
    sounds.ts                   # Efectos de sonido (Web Audio API)
  context/
    ChatProvider.tsx             # Contexto de autenticacion
```

## Colecciones Firestore

| Coleccion | Descripcion |
|-----------|-------------|
| `users` | Perfiles de usuario |
| `user_settings` | Configuraciones por usuario |
| `channels` | Canales de chat (metadatos + participantes) |
| `channels/{id}/messages_live` | Mensajes del canal |
| `channels/{id}/typing` | Indicadores de escritura |
| `channels/{id}/recording` | Indicadores de grabacion |
| `social_feeds/{userId}/chat_feed_live` | Feed de conversaciones por usuario |
| `calls` | Metadata de llamadas |
| `call_signals/{userId}` | Señales de llamada entrante |

## Libreria React Native

Este demo web comparte el mismo backend con la libreria React Native en `packages/chat-kit/`. Los mensajes se sincronizan entre web y mobile en tiempo real.

```tsx
// Instalacion en tu app React Native
import { ChatKitProvider, ConversationList, Chat, Call } from '@comvi/chat'

<ChatKitProvider
  livekitUrl="wss://tu-servidor.livekit.cloud"
  giphyApiKey="tu-api-key"
  user={{ id: uid, name: 'Juan', avatar: photoURL }}
>
  <Stack.Screen name="Chats" component={ConversationList} />
  <Stack.Screen name="Chat" component={Chat} />
  <Stack.Screen name="Call" component={Call} />
</ChatKitProvider>
```

## Deploy en Vercel

1. Importar repo en [vercel.com/new](https://vercel.com/new)
2. Agregar las environment variables
3. Deploy

## Licencia

MIT
