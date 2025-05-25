import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("auth-session")
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/settings"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Auth routes (should redirect to dashboard if already logged in)
  const authRoutes = ["/sign-in", "/sign-up"]
  const isAuthRoute = authRoutes.includes(pathname)

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
