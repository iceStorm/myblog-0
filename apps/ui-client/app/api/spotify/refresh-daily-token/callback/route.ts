import { resolve } from 'path'
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const accessToken = await refreshDailyToken(request)

    await saveDailyToken(accessToken)

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.log('Exception when refreshDailyToken', error)

    return NextResponse.json({
      success: false,
      error
    })
  }
}

async function saveDailyToken(token: any) {
  return writeFile(resolve(__dirname, '../daily-token.json'), token, { encoding: 'utf8' })
}
