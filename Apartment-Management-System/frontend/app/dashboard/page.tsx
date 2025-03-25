"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardOverview from "@/components/dashboard/overview"
import { useAuth } from "@/context/auth-context"

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router, mounted])

  // Show loading state while checking auth or before mounting
  if (loading || !mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  // If no user, don't render the dashboard (will redirect in useEffect)
  if (!user) {
    return null
  }

  // User is authenticated, render the dashboard
  return <DashboardOverview />
}

