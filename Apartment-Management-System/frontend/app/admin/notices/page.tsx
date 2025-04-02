"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bell, Plus, Eye, Edit, Trash2 } from "lucide-react"

export default function AdminNoticesPage() {
  const router = useRouter()
  const [notices] = useState([
    {
      id: 1,
      title: "Scheduled Maintenance",
      content: "There will be scheduled maintenance of the water supply on May 25th from 10 AM to 2 PM.",
      date: "2023-05-20",
      priority: "high",
    },
    {
      id: 2,
      title: "Community Meeting",
      content: "Annual community meeting will be held in the common area on June 5th at 6 PM.",
      date: "2023-05-18",
      priority: "medium",
    },
    {
      id: 3,
      title: "Parking Regulations",
      content: "Please ensure to park only in designated spots. Violations will result in fines.",
      date: "2023-05-15",
      priority: "medium",
    },
    {
      id: 4,
      title: "Fire Alarm Testing",
      content: "Fire alarm testing will be conducted on May 30th from 9 AM to 11 AM.",
      date: "2023-05-10",
      priority: "high",
    },
    {
      id: 5,
      title: "Holiday Schedule",
      content: "The management office will be closed on May 29th for Memorial Day.",
      date: "2023-05-05",
      priority: "low",
    },
  ])

  const handleViewNotice = (id: number) => {
    router.push(`/admin/notices/view?id=${id}`)
  }

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

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-purple-900 mb-2">Notices</h1>
        <p className="text-gray-600">Manage notices for apartment residents.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">All Notices</h2>
          <Link
            href="/admin/notices/create"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Notice
          </Link>
        </div>

        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <Bell className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-lg">{notice.title}</h3>
                      {getPriorityBadge(notice.priority)}
                    </div>
                    <p className="text-gray-600 mt-1">{notice.content}</p>
                    <p className="text-sm text-gray-500 mt-2">Posted on: {notice.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => handleViewNotice(notice.id)}>
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

