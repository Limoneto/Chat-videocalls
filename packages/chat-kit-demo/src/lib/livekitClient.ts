export interface ParticipantTrack {
  identity: string
  name: string
  videoTrack: MediaStreamTrack | null
  audioTrack: MediaStreamTrack | null
  isLocal: boolean
}

export async function getLiveKitToken(
  callID: string,
  userID: string,
  userName: string,
  callType: 'audio' | 'video',
): Promise<string | null> {
  try {
    const res = await fetch('/api/livekit-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callID, userID, userName, callType }),
    })
    const data = await res.json()
    return data.token || null
  } catch (err) {
    console.warn('Failed to get LiveKit token:', err)
    return null
  }
}
