"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageSquare, Plus, CheckCircle, Clock, AlertCircle, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Complaint = {
  id: string
  title: string
  description: string
  category: string
  status: "open" | "in-progress" | "resolved"
  date: string
}

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
    category: "Complaints",
  })
  const { toast } = useToast()

  // Simulate fetching complaints
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComplaint.title || !newComplaint.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("http://localhost:8081/api/requests/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newComplaint.title,
          description: newComplaint.description,
          category: newComplaint.category,
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to submit complaint")
      }
      // Optionally, fetch the updated list from the backend
      const fetchComplaints = async () => {
        const res = await fetch("http://localhost:8081/api/requests")
        if (res.ok) {
          const data = await res.json()
          setComplaints(data)
        }
      }
      await fetchComplaints()
      setNewComplaint({ title: "", description: "", category: "Complaints" })
      setIsModalOpen(false)
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been submitted successfully",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <span className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded text-xs">
            <AlertCircle size={12} className="mr-1" />
            Open
          </span>
        )
      case "in-progress":
        return (
          <span className="flex items-center text-amber-600 bg-amber-100 px-2 py-1 rounded text-xs">
            <Clock size={12} className="mr-1" />
            In Progress
          </span>
        )
      case "resolved":
        return (
          <span className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded text-xs">
            <CheckCircle size={12} className="mr-1" />
            Resolved
          </span>
        )
      default:
        return null
    }
  }

  // Filter complaints based on selected category
  const filteredComplaints =
    selectedCategory === "all" ? complaints : complaints.filter((complaint) => complaint.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Complaints / Maintenance</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          New Service
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Filter by Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            <option value="Complaints">Complaints</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Complaints</h3>
          <p className="text-gray-500 mb-4">
            {selectedCategory === "all"
              ? "You haven't filed any complaints yet."
              : `You haven't filed any ${selectedCategory.toLowerCase()} requests yet.`}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900 transition-colors"
          >
            File a Complaint
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
                      <div className="text-sm text-gray-500 max-w-md break-words">{complaint.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {complaint.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(complaint.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Complaint Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium text-gray-800">File a New Complaint</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Brief title of your complaint"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={newComplaint.category}
                  onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Complaints">Complaints</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  rows={4}
                  placeholder="Detailed description of the issue"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-800 text-white rounded-md text-sm font-medium hover:bg-purple-900"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

