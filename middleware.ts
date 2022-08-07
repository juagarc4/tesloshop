import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest | any) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  console.log(session)
  if (!session) {
    return NextResponse.redirect(`http://localhost:3000/auth/login?p=${config.matcher}`)
  }
}
export const config = {
  matcher: '/checkout/address',
}
