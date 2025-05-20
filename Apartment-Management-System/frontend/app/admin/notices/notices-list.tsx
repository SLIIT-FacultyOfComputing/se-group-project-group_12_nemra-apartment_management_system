"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash2 } from "lucide-react"
import { EditNoticeDialog } from "./edit-notice-dialog"
import axios from "axios"

// Mock data for demonstration
const MOCK_NOTICES = [
  {
    id: "1",
    subject: "Building Maintenance Notice",
    content: "The water will be shut off on Monday from 10am to 2pm for routine maintenance.",
    imageUrl: "/placeholder.svg?height=100&width=100",
    createdAt: "2025-04-10T10:00:00Z",
    status: "active",
  },
  {
    id: "2",
    subject: "Community Meeting",
    content: "Please join us for the monthly community meeting on Friday at 7pm in the common area.",
    imageUrl: "/placeholder.svg?height=100&width=100",
    createdAt: "2025-04-08T14:30:00Z",
    status: "active",
  },
  {
    id: "3",
    subject: "Holiday Schedule",
    content: "The management office will be closed on May 25th for the holiday.",
    imageUrl: null,
    createdAt: "2025-04-05T09:15:00Z",
    status: "archived",
  },
]

export type Notice = {
  id: string
  subject: string
  content: string
  createdAt: string
  status?: string
}

export function NoticesList() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/notices")
        setNotices(res.data)
      } catch (err) {
        setNotices([])
      }
    }
    fetchNotices()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      try {
        await axios.delete(`http://localhost:8081/api/notices/${id}`)
        setNotices(notices.filter((notice) => notice.id !== id))
      } catch (err) {
        alert("Failed to delete notice!")
      }
    }
  }

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice)
  }

  const handleSaveEdit = async (updatedNotice: Notice) => {
    try {
      const res = await axios.put(`http://localhost:8081/api/notices/${updatedNotice.id}`, updatedNotice)
      setNotices(notices.map((notice) => (notice.id === updatedNotice.id ? res.data : notice)))
      setEditingNotice(null)
    } catch (err) {
      alert("Failed to update notice!")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-t-lg">
        <CardTitle className="text-2xl">All Notices</CardTitle>
        <CardDescription className="text-gray-200">Manage notices sent to apartment residents.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* <div className="flex justify-end mb-6">
          <Button variant="outline">Filter</Button>
        </div> */}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell className="font-medium">{notice.subject}</TableCell>
                  <TableCell>{formatDate(notice.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEdit(notice)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDelete(notice.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {notices.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No notices found</p>
          </div>
        )}
      </CardContent>

      {editingNotice && (
        <EditNoticeDialog notice={editingNotice} onSave={handleSaveEdit} onCancel={() => setEditingNotice(null)} />
      )}
    </Card>
  )
}
