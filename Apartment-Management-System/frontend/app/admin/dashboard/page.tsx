"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AdminDashboardOverview from "@/components/admin/overview"

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // If not loading and no user or not admin, redirect to login
    if (!loading && (!user || user.isAdmin !== true)) {
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

  // If no user or not admin, don't render the dashboard (will redirect in useEffect)
  if (!user || user.isAdmin !== true) {
    return null
  }

  // User is authenticated and is admin, render the dashboard
  return <AdminDashboardOverview />
}

