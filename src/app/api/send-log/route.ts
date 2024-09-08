import { getAccessToken } from '@/helpers/logdrive'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const accessToken = await getAccessToken()

  if (!accessToken)
    return NextResponse.json({ message: 'error', error: 'No access token' })

  const { label, content } = await request.json()

  if (!label)
    return NextResponse.json({ message: 'error', error: 'Missing label' })

  try {
    await axios({
      method: 'post',
      url: 'https://api.logdrive.io/entries',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        label,
        content,
      },
    })
    return NextResponse.json({ message: 'success' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'error', error })
  }
}
