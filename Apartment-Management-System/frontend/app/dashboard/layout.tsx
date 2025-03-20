"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/header"
import { useAuth } from "@/context/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // If no auth token or user, redirect to login
    const hasToken = document.cookie.includes("auth-token=")
    if (!hasToken || !user) {
      router.push("/")
    }
  }, [router, user])

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
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  )
}

