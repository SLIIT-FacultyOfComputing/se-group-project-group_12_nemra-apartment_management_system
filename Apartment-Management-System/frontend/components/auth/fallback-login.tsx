"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { STORAGE_KEYS, ROUTES, USER_ROLES } from "@/constants"

export default function FallbackLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleFallbackLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement)
      const username = formData.get("username") as string
      const password = formData.get("password") as string

      // Simple validation
      if (!username || !password) {
        throw new Error("Username and password are required")
      }

      // For fallback, accept any username with password "password"
      if (password !== "password") {
        throw new Error("Invalid credentials. For fallback login, use any username with password 'password'")
      }

      // Create a mock user
      const mockUser = {
        id: 1,
        username,
        email: `${username}@example.com`,
        role: username.toLowerCase() === "admin" ? USER_ROLES.ADMIN : USER_ROLES.USER,
      }

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser))

      toast({
        title: "Fallback Login Successful",
        description: "Using fallback login due to API unavailability. This is for development purposes only.",
        variant: "warning",
      })

      // Navigate to dashboard
      router.push(ROUTES.DASHBOARD)
    } catch (error) {
      console.error("Fallback login error:", error)

      let errorMessage = "Invalid credentials"
      if (error instanceof Error) {
        errorMessage = error.message
      }

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold text-center mb-6">Fallback Login</h2>
      <p className="text-sm text-gray-600 mb-4">
        API connection failed. Use this fallback login for development purposes only. Any username with password
        'password' will work.
      </p>

      <form onSubmit={handleFallbackLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter any username"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="Use 'password'"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-900 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login (Fallback)"}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>For admin access, use username "admin" with password "password"</p>
      </div>
    </div>
  )
}

