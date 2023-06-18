'use client'

import { useCallback, useEffect } from 'react'

interface SpotifyRefreshDailyTokenClientProps {
  clientId: string
  redirectUri: string
}

export function SpotifyRefreshDailyTokenClient(props: SpotifyRefreshDailyTokenClientProps) {
  const { clientId, redirectUri } = props

  useEffect(() => {
    authroize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const authroize = useCallback(async () => {
    const codeVerifier = generateRandomString(128)
    const state = generateRandomString(16)
    const challengeCode = await generateCodeChallenge(codeVerifier)

    const scope = 'user-read-private user-read-email'

    localStorage.setItem('code_verifier', codeVerifier)

    const args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: challengeCode
    })

    window.location = 'https://accounts.spotify.com/authorize?' + args
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}

export function generateRandomString(length: number) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

export async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(str: string) {
    return Buffer.from(String.fromCharCode.apply(null, new Uint8Array(str)))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)

  return base64encode(digest)
}
