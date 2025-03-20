"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for auth token in cookies
        const hasToken = document.cookie.includes("auth-token=")

        if (hasToken) {
          // Try to get user from localStorage
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          } else {
            // For demo purposes, we'll set a default user
            const defaultUser = {
              username: "DemoUser",
              email: "demo@example.com",
              houseNo: "A101",
              role: "user",
            }
            setUser(defaultUser)
            localStorage.setItem("user", JSON.stringify(defaultUser))
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
  }, [])

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

