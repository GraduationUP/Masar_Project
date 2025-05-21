"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "seller" | "admin"
  avatar?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: "user" | "seller") => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("masar_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock users
      const users = [
        {
          id: "1",
          name: "John User",
          email: "user@example.com",
          password: "password",
          role: "user",
          avatar: "/mystical-forest-spirit.png",
        },
        {
          id: "2",
          name: "Sarah Seller",
          email: "seller@example.com",
          password: "password",
          role: "seller",
          avatar: "/mystical-forest-spirit.png",
        },
        {
          id: "3",
          name: "Admin User",
          email: "admin@example.com",
          password: "password",
          role: "admin",
          avatar: "/mystical-forest-spirit.png",
        },
      ]

      const foundUser = users.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword as User)
        localStorage.setItem("masar_user", JSON.stringify(userWithoutPassword))
        toast({
          title: "Login successful",
          description: `Welcome back, ${userWithoutPassword.name}!`,
        })
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: "user" | "seller") => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if email already exists in localStorage
      const users = JSON.parse(localStorage.getItem("masar_users") || "[]")
      if (users.some((u: any) => u.email === email)) {
        throw new Error("Email already in use")
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        role,
        avatar: `/placeholder.svg?height=32&width=32&query=${name.charAt(0)}`,
      }

      // Save user to localStorage
      users.push({ ...newUser, password })
      localStorage.setItem("masar_users", JSON.stringify(users))

      // Log user in
      setUser(newUser)
      localStorage.setItem("masar_user", JSON.stringify(newUser))

      toast({
        title: "Registration successful",
        description: `Welcome to Masar, ${name}!`,
      })
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("masar_user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
