"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  username?: string
  email?: string
  isAdmin?: boolean
} | null

type AuthContextType = {
  user: User
  setUser: (user: User) => void
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Handle hydration mismatch by only running effects after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if user is logged in on mount
  useEffect(() => {
    if (!mounted) return

    const checkAuth = async () => {
      try {
        // Check for auth token in cookies
        const hasToken = document.cookie.includes("auth-token=")

        if (hasToken) {
          // Try to get user from localStorage
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
            
            // Redirect based on user role
            if (parsedUser.isAdmin === true) {
              console.log("Redirecting to admin dashboard")
              router.push("/admin/dashboard")
            } else {
              console.log("Redirecting to user dashboard")
              router.push("/dashboard")
            }
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [mounted, router])

  // Update localStorage when user changes
  useEffect(() => {
    if (!mounted) return

    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user, mounted])

  // Logout function
  const logout = () => {
    // Clear the auth token cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    // Clear localStorage
    localStorage.removeItem("user")
    // Clear user state
    setUser(null)
    // Redirect to login page
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, setUser, loading, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

