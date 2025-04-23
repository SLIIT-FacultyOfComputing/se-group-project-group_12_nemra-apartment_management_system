"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { FileText, MessageSquare, CreditCard, Bell, Upload, CheckCircle, AlertCircle, LogOut, Car } from "lucide-react"

export default function AdminDashboardOverview() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [stats] = useState({
    pendingBills: 15,
    paidBills: 42,
    activeComplaints: 8,
    resolvedComplaints: 23,
    notices: 5,
  })

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-purple-900 mb-2">Welcome, {user?.username || "Admin"}!</h1>
            <p className="text-gray-600">
              This is your admin dashboard where you can manage all apartment-related tasks.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Bills</p>
              <p className="text-2xl font-bold text-purple-900">{stats.pendingBills}</p>
            </div>
            <CreditCard className="h-10 w-10 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Paid Bills</p>
              <p className="text-2xl font-bold text-blue-600">{stats.paidBills}</p>
            </div>
            <CheckCircle className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Complaints</p>
              <p className="text-2xl font-bold text-red-600">{stats.activeComplaints}</p>
            </div>
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Notices</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.notices}</p>
            </div>
            <Bell className="h-10 w-10 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-purple-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/bills"
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FileText className="h-8 w-8 text-blue-700 mb-2" />
            <span className="text-blue-900 font-medium">View Paid Bills</span>
          </Link>

          <Link
            href="/admin/complaints"
            className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <MessageSquare className="h-8 w-8 text-red-700 mb-2" />
            <span className="text-red-900 font-medium">View Complaints</span>
          </Link>

          <Link
            href="/admin/notices"
            className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <Bell className="h-8 w-8 text-yellow-700 mb-2" />
            <span className="text-yellow-900 font-medium">Post Notices</span>
          </Link>
          
          <Link
            href="/admin/parking"
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Car className="h-8 w-8 text-green-700 mb-2" />
            <span className="text-green-900 font-medium">View Parking</span>
          </Link>

          
          <Link
            href="/admin/bills/upload"
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Upload className="h-8 w-8 text-purple-700 mb-2" />
            <span className="text-purple-900 font-medium">Upload Bills</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-purple-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
            <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium">Bill Payment Received</p>
              <p className="text-sm text-gray-600">Apartment A101 paid water bill - $45.00</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
            <MessageSquare className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium">New Complaint Filed</p>
              <p className="text-sm text-gray-600">Apartment B205 reported plumbing issue</p>
              <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
            <Bell className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium">Notice Posted</p>
              <p className="text-sm text-gray-600">Maintenance scheduled for tomorrow</p>
              <p className="text-xs text-gray-500 mt-1">Yesterday</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
            <Car className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Parking Slot Received</p>
              <p className="text-sm text-gray-600">Parkin Slot 011 Received for tomorrow(11th April)</p>
              <p className="text-xs text-gray-500 mt-1">Today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

