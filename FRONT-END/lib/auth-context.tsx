"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { AuthUser } from "@/lib/types"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  setUser: (user: AuthUser | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser: AuthUser | null
}) {
  const [user, setUser] = useState<AuthUser | null>(initialUser)
  const [loading, setLoading] = useState(false)

  return <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
