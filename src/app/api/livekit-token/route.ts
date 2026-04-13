import { NextRequest, NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'

export async function POST(req: NextRequest) {
  try {
    const { callID, userID, userName, callType } = await req.json()

    if (!callID || !userID) {
      return NextResponse.json({ error: 'callID and userID required' }, { status: 400 })
    }

    const apiKey = process.env.LIVEKIT_API_KEY
    const apiSecret = process.env.LIVEKIT_API_SECRET

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: 'LiveKit not configured' }, { status: 500 })
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity: userID,
      name: userName || userID,
      ttl: '2h', // 2 hour token for longer calls
    })

    token.addGrant({
      room: callID,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
      // Allow high quality
      canPublishSources: ['camera', 'microphone', 'screen_share'],
    })

    const jwt = await token.toJwt()

    return NextResponse.json({
      token: jwt,
      roomName: callID,
      // Return LiveKit URL so client doesn't need env var
      url: process.env.NEXT_PUBLIC_LIVEKIT_URL,
    })
  } catch (err: any) {
    console.error('LiveKit token error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
