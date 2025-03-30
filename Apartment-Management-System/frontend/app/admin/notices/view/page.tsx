"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Bell, ArrowLeft, Edit, Trash2 } from "lucide-react"

export default function ViewNoticePage() {
  const [notice, setNotice] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()

  const noticeId = searchParams.get("id")

  // Mock notices data
  const notices = [
    {
      id: "1",
      title: "Scheduled Maintenance",
      content: "There will be scheduled maintenance of the water supply on May 25th from 10 AM to 2 PM.",
      date: "2023-05-20",
      priority: "high",
    },
    {
      id: "2",
      title: "Community Meeting",
      content: "Annual community meeting will be held in the common area on June 5th at 6 PM.",
      date: "2023-05-18",
      priority: "medium",
    },
    {
      id: "3",
      title: "Parking Regulations",
      content: "Please ensure to park only in designated spots. Violations will result in fines.",
      date: "2023-05-15",
      priority: "medium",
    },
    {
      id: "4",
      title: "Fire Alarm Testing",
      content: "Fire alarm testing will be conducted on May 30th from 9 AM to 11 AM.",
      date: "2023-05-10",
      priority: "high",
    },
    {
      id: "5",
      title: "Holiday Schedule",
      content: "The management office will be closed on May 29th for Memorial Day.",
      date: "2023-05-05",
      priority: "low",
    },
  ]

  useEffect(() => {
    if (noticeId) {
      // Simulate API call to fetch notice details
      setTimeout(() => {
        const foundNotice = notices.find((n) => n.id === noticeId)
        if (foundNotice) {
          setNotice(foundNotice)
        }
        setIsLoading(false)
      }, 500)
    } else {
      router.push("/admin/notices")
    }
  }, [noticeId, router])

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
      case "medium":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium</span>
      case "low":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Low</span>
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  if (!notice) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-red-600">Notice Not Found</h1>
        <p className="text-gray-600 mt-2">The notice you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => router.push("/admin/notices")}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Back to Notices
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-900">View Notice</h1>
          <button
            onClick={() => router.push("/admin/notices")}
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Notices
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start space-x-3">
            <Bell className="h-6 w-6 text-purple-500 mt-1" />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold text-gray-800">{notice.title}</h2>
                {getPriorityBadge(notice.priority)}
              </div>
              <p className="text-sm text-gray-500 mt-1">Posted on: {notice.date}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-full">
              <Edit className="h-5 w-5" />
            </button>
            <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-gray-700 whitespace-pre-line">{notice.content}</p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <h3 className="font-medium text-gray-700 mb-3">Distribution</h3>
          <p className="text-gray-600">This notice has been sent to all residents.</p>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => router.push(`/admin/notices/edit?id=${notice.id}`)}
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Notice
          </button>
        </div>
      </div>
    </div>
  )
}

