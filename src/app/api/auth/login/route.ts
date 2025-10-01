import { NextRequest, NextResponse } from 'next/server'

const DIRECTORY_PASSWORD = process.env.DIRECTORY_PASSWORD || 'heaton2024'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === DIRECTORY_PASSWORD) {
      const response = NextResponse.json({ success: true })

      // Set authentication cookie
      response.cookies.set('directory-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return response
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
