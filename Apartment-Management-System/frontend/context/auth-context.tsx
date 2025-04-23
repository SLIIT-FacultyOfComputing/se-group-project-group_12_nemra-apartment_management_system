"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { STORAGE_KEYS } from "@/constants"

type User = {
  username?: string
  email?: string
  houseNo?: string
  role?: "admin" | "user"
} | null

type AuthContextType = {
  user: User
  setUser: (user: User) => void
  loading: boolean
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch by only running effects after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if user is logged in on mount
  useEffect(() => {
    if (!mounted) return

    const checkAuth = () => {
      try {
        // Check for auth token in cookies
        const hasToken = document.cookie.includes("auth-token=")

        if (hasToken) {
          // Try to get user from localStorage
          const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          } else {
            // For demo purposes, we'll set a default user
            const defaultUser: User = {
              username: "DemoUser",
              email: "demo@example.com",
              houseNo: "A101",
              role: "user",
            }
            setUser(defaultUser)
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser))
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    // Use a slight delay to ensure the check happens after hydration
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [mounted])

  // Update localStorage when user changes
  useEffect(() => {
    if (!mounted) return

    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER)
    }
  }, [user, mounted])

  // Logout function
  const logout = () => {
    // Clear the auth token cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.USER)

    // Clear user state
    setUser(null)
  }

  // Check if user is admin
  const isAdmin = user?.role === "admin"

  return <AuthContext.Provider value={{ user, setUser, loading, logout, isAdmin }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

