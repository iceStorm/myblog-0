import qs from 'querystring'

import axios from 'axios'

import { NextResponse } from 'next/server'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

interface SpotifyTokenResponse {
  access_token: string
  token_type: 'bearer'
  expires_in: number
}

export async function GET(request: Request) {
  const accessToken = await getSpotifyApplicationAccessToken()

  const { data } = await axios.get(
    `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  data.accessToken = accessToken
  return NextResponse.json(data)
}

async function getSpotifyApplicationAccessToken() {
  const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64')

  const url = 'https://accounts.spotify.com/api/token'

  const requestData = qs.stringify({ grant_type: 'client_credentials' })

  const { data } = await axios.post<SpotifyTokenResponse>(url, requestData, {
    headers: {
      Authorization: `Basic ${auth_token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return data.access_token
}

