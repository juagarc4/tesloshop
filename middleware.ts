import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest | any) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const url = req.nextUrl.clone()

  if (req.nextUrl.pathname.startsWith(config.matcher[0])) {
    if (!session) {
      url.pathname = '/auth/login'
      url.searchParams.set('p', config.matcher[0])
      return NextResponse.redirect(url)
    }
  }
  if (req.nextUrl.pathname.startsWith(config.matcher[1])) {
    const validRoles = ['admin', 'super-user', 'SEO']
    if (!session || !validRoles.includes(session.user.role)) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
export const config = {
  matcher: ['/checkout/address', '/admin'],
}
