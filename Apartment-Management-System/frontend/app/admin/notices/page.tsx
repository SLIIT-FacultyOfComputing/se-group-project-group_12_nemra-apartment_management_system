"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NoticesList } from "./notices-list"
import { UploadNotice } from "./upload-notice"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function NoticesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"upload" | "manage">("upload")

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-white font-bold">Notice Management</h1>
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-lg border border-gray-200 p-1 w-full max-w-md">
          <button
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
              activeTab === "upload" ? "bg-purple-600 text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Notice
          </button>
          <button
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
              activeTab === "manage" ? "bg-purple-600 text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Notices
          </button>
        </div>
      </div>

      <div className="relative" style={{ minHeight: "650px" }}>
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "upload" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
        >
          <UploadNotice />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "manage" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
        >
          <NoticesList />
        </div>
      </div>
    </div>
  )
}
