"use client"

import { useEffect, useState } from "react"
import DashboardOverview from "@/components/dashboard/overview"

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false)

  // This ensures the component only renders on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  return <DashboardOverview />
}

