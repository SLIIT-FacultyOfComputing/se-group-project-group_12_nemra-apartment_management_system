"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Check } from "lucide-react"

export default function RespondToComplaintPage() {
  const [complaint, setComplaint] = useState<any>(null)
  const [responseText, setResponseText] = useState("")
  const [status, setStatus] = useState("in-progress")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const complaintId = searchParams.get("id")

  useEffect(() => {
    if (complaintId) {
      // Fetch complaint details from backend
      const fetchComplaint = async () => {
        const res = await fetch(`http://localhost:8081/api/requests/${complaintId}`)
        if (res.ok) {
          const data = await res.json()
          setComplaint(data)
          setResponseText(data.adminResponse || "")
          setStatus(data.status || "in-progress")
        }
        setIsLoading(false)
      }
      fetchComplaint()
    } else {
      router.push("/admin/complaints")
    }
  }, [complaintId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!responseText.trim()) {
      toast({
        title: "Response Required",
        description: "Please enter a response before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch(`http://localhost:8081/api/requests/${complaintId}/admin-respond`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          adminResponse: responseText,
        }),
      })
      if (!res.ok) throw new Error("Failed to submit response")

      toast({
        title: "Response Submitted",
        description: "Your response has been submitted successfully.",
        variant: "success",
      })

      router.push("/admin/complaints")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  if (!complaint) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-red-600">Complaint Not Found</h1>
        <p className="text-gray-600 mt-2">The complaint you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => router.push("/admin/complaints")}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Back to Complaints
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-purple-900 mb-2">Respond to Complaint</h1>
        <p className="text-gray-600">Provide a response to the resident's complaint.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{complaint.title}</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 text-sm text-gray-500">
            <p>
              Apartment: <span className="font-medium">{complaint.apartment || "-"}</span>
            </p>
            <p>
              Submitted: <span className="font-medium">{complaint.date || "-"}</span>
            </p>
            <p>
              Status: <span className="font-medium capitalize">{complaint.status}</span>
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-gray-700">{complaint.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Update Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isSubmitting}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-1">
                Your Response <span className="text-red-500">*</span>
              </label>
              <textarea
                id="response"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[150px]"
                placeholder="Enter your response to this complaint..."
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/admin/complaints")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Submit Response
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

