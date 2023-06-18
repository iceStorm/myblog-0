import { resolve } from 'path'
import { writeFile } from 'fs/promises'
import { stringify } from 'querystring'

import { NextResponse } from 'next/server'

import { v4 as uuidv4 } from 'uuid'

const client_id = process.env.SPOTIFY_CLIENT_ID

export async function GET(request: Request) {
  try {
    const accessToken = await refreshDailyToken(request)

    await saveDailyToken(accessToken)

    // return NextResponse.json({
    //   success: true
    // })
  } catch (error) {
    console.log('Exception when refreshDailyToken', error)

    return NextResponse.json({
      success: false,
      error
    })
  }
}

async function refreshDailyToken(response: Response) {
  const state = uuidv4()
  const scope = 'user-read-private user-read-email'
  const redirect_uri = process.env.UI_CLIENT_URL

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  )
}
