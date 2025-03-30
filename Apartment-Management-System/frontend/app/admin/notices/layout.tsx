"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AdminHeader from "@/components/admin/header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, isAdmin } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // If not loading and no user or not admin, redirect to login
    if (!loading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [router, user, loading, mounted, isAdmin])

  // Show loading state while checking auth or before mounting
  if (loading || !mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  // If no user or not admin, don't render the dashboard (will redirect in useEffect)
  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <style jsx global>{`
        body {
          background: #f5f5f5 !important;
          display: block !important;
          align-items: initial !important;
          justify-content: initial !important;
        }
        
        body::before {
          display: none !important;
        }
      `}</style>
      <AdminHeader />
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  )
}

