import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, AuthUser } from "./types"
import mockData from "./db.json"

const SESSION_COOKIE = "auth-session"

export async function getUsers(): Promise<User[]> {
  return mockData.users
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers()
  return users.find((user) => user.email === email) || null
}

export async function findUserByUsername(username: string): Promise<User | null> {
  const users = await getUsers()
  return users.find((user) => user.username === username) || null
}

export async function createUser(userData: Omit<User, "id">): Promise<User> {
  const users = await getUsers()
  const newUser: User = {
    ...userData,
    id: Math.max(...users.map((u) => u.id)) + 1,
  }
  // In a real app, you'd save this to a database
  return newUser
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
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/sign-in")
  }
  return session
}
