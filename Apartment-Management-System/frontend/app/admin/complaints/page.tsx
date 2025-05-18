"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare, CheckCircle, XCircle, MessageCircle, Eye, Edit } from "lucide-react"

export default function AdminComplaintsPage() {
  const router = useRouter()
  const [complaints, setComplaints] = useState<any[]>([])
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchComplaints = async () => {
      const res = await fetch("http://localhost:8081/api/requests")
      if (res.ok) {
        const data = await res.json()
        setComplaints(data)
      }
      setIsLoading(false)
    }
    fetchComplaints()
  }, [])

  const filteredComplaints = complaints.filter((complaint) => {
    if (filter === "pending") return complaint.status === "pending"
    if (filter === "in-progress") return complaint.status === "in-progress"
    if (filter === "resolved") return complaint.status === "resolved"
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <XCircle className="h-3 w-3 mr-1" />
            Pending
          </span>
        )
      case "in-progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <MessageCircle className="h-3 w-3 mr-1" />
            In Progress
          </span>
        )
      case "resolved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Resolved
          </span>
        )
      default:
        return null
    }
  }

  const handleRespondToComplaint = (id: string) => {
    router.push(`/admin/complaints/respond?id=${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-purple-900 mb-2">Complaints</h1>
        <p className="text-gray-600">View and respond to resident complaints.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            All Complaints
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-md ${filter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`px-4 py-2 rounded-md ${filter === "in-progress" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter("resolved")}
            className={`px-4 py-2 rounded-md ${filter === "resolved" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            Resolved
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
          </div>
        ) : (
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-lg">{complaint.title}</h3>
                      {getStatusBadge(complaint.status || complaint.Status || "pending")}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Apartment: {complaint.apartment || "-"}</p>
                    <p className="text-gray-600 mt-1">{complaint.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Submitted on: {complaint.date || "-"}</p>
                    {complaint.resolution && (
                      <div className="mt-2 p-2 bg-gray-100 rounded-md">
                        <p className="text-sm font-medium">Resolution:</p>
                        <p className="text-sm text-gray-600">{complaint.resolution}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleRespondToComplaint(complaint.id)}
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    className="text-yellow-600 hover:text-yellow-800"
                    onClick={() => handleRespondToComplaint(complaint.id)}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredComplaints.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No complaints found with the selected filter.</p>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  )
}

