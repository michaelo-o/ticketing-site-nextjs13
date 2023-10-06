import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    await supabase.auth.getSession()
    return res
}

// Takes in a request object, that's the request whose result is to be modified
// .next() is literally what's next. After collecting the request, it then asks what's next, going back to what was being requested in the first place
//Then a middleware client is created with the request and the response passed in.
// then the getSession with the auth method gets the session and updates the cookie if need be to carry on

// Managing session with Middleware
// When using the Supabase client on the server, you must perform extra steps to ensure the user's auth session remains active. Since the user's session is tracked in a cookie, we need to read this cookie and update it if necessary.

// Next.js Server Components allow you to read a cookie but not write back to it. Middleware on the other hand allow you to both read and write to cookies.

// Next.js Middleware runs immediately before each route is rendered. We'll use Middleware to refresh the user's session before loading Server Component routes.