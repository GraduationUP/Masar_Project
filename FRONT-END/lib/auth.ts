import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, AuthUser } from "./types"

const SESSION_COOKIE = "auth-session"

export async function getUsers(): Promise<User[]> {
  // TODO: implement
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers()
  return users.find((user) => user.email === email) || null
}

export async function createUser(userData: Omit<User, "id">): Promise<User> {
  // TODO: implement
}

export async function validateCredentials(email: string, password: string): Promise<AuthUser | null> {
  const user = await findUserByEmail(email)
  if (user && user.password === password) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      role: user.account_type
    }
  }
  return null
}

export async function setSession(user: AuthUser) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE)
    if (sessionCookie) {
      return JSON.parse(sessionCookie.value)
    }
  } catch (error) {
    console.error("Error parsing session:", error)
  }
  return null
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);

  if (typeof window !== 'undefined') {
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userInfo");
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/sign-in")
  }
  return session
}
