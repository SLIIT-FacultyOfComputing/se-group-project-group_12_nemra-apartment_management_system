// DashboardOverview.tsx
"use client"

import { useState, useEffect } from "react"
import { CreditCard, MessageSquare, ShoppingBag, AlertCircle, CheckCircle, Clock, AlignCenter } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import NoticeBox from './NoticeBox'

export default function DashboardOverview() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    pendingBills: 0,
    paidBills: 0,
    overdueBills: 0,
    complaints: 0,
    resolvedComplaints: 0,
    marketplaceItems: 0,
     
  })

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStats({
        pendingBills: 2,
        paidBills: 2,
        overdueBills : 1,
        complaints: 3,
        resolvedComplaints: 1,
        marketplaceItems: 6,
        
      })
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, {user?.username || "User"}</p>
      </div>

      {/* Post Notices Section */}
      <div className="flex justify-center items-center mb-6">
  <h1 className="text-2xl font-bold text-gray-800">Recent Notices</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NoticeBox
          imageUrl="https://i.pinimg.com/564x/f3/ae/26/f3ae261f06558ebc95534516ac06d04c.jpg"
          postName="Spring BBQ Event"
          description="Join us for the annual Spring BBQ on July 5th at 4 PM in the community courtyard. Free food and drinks for all residents!"
        />
        <NoticeBox
          imageUrl="https://png.pngtree.com/png-clipart/20230922/original/pngtree-red-do-not-icon-indicates-contaminated-tap-water-should-not-be-png-image_12826372.png"
          postName="Scheduled Maintenance on Water Supply"
          description="Please note that water supply will be interrupted from 9 AM to 12 PM on July 15nd, 2025, for essential maintenance. Kindly plan accordingly"
        />
        <NoticeBox
          imageUrl="data:image/png;base64,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"
          postName="New Security Cameras Installed"
          description="We have installed new security cameras in common areas for your safety. If you have any concerns, please contact management"
        />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bills Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Bills</h2>
            <div className="p-2 bg-purple-100 rounded-full">
              <CreditCard className="h-6 w-6 text-purple-800" />
            </div>
          </div>

          <div className="space-y-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-600">Overdue</span>
              </div>
              <span className="font-semibold">{stats.complaints - stats.resolvedComplaints}</span>
            </div>


            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-gray-600">Pending</span>
              </div>
              <span className="font-semibold">{stats.pendingBills}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">Paid</span>
              </div>
              <span className="font-semibold">{stats.paidBills}</span>
            </div>

            <div className="pt-2">
              <a href="/dashboard/bills" className="text-sm text-purple-800 hover:underline">
                View all bills →
              </a>
            </div>
          </div>
        </div>

        {/* Complaints Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Complaints / Maintenance</h2>
            <div className="p-2 bg-purple-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-purple-800" />
            </div>
          </div>

          <div className="space-y-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-gray-600">Pending</span>
              </div>
              <span className="font-semibold">{stats.pendingBills}</span>
            </div>


            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-600">Open</span>
              </div>
              <span className="font-semibold">{stats.complaints - stats.resolvedComplaints}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">Resolved</span>
              </div>
              <span className="font-semibold">{stats.resolvedComplaints}</span>
            </div>

            <div className="pt-2">
              <a href="/dashboard/complaints" className="text-sm text-purple-800 hover:underline">
                View all Complaints / Maintenance →
              </a>
            </div>
          </div>
        </div>

        {/* Marketplace Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Marketplace</h2>
            <div className="p-2 bg-purple-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-purple-800" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Available Items</span>
              <span className="font-semibold">{stats.marketplaceItems}</span>
            </div>

            <div className="pt-2">
              <a href="/dashboard/marketplace" className="text-sm text-purple-800 hover:underline">
                Browse marketplace →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>

        <div className="space-y-4">
          <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
            <div className="bg-purple-100 p-2 rounded-full">
              <CreditCard className="h-5 w-5 text-purple-800" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Bill Payment</p>
              <p className="text-xs text-gray-500">You paid Rs.2500 for water bill</p>
              <p className="text-xs text-gray-400 mt-1">2 days ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
            <div className="bg-purple-100 p-2 rounded-full">
              <MessageSquare className="h-5 w-5 text-purple-800" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Complaint Filed</p>
              <p className="text-xs text-gray-500">You reported an issue with the elevator</p>
              <p className="text-xs text-gray-400 mt-1">3 days ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-purple-800" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Item Listed</p>
              <p className="text-xs text-gray-500">You listed a sofa for sale in the marketplace</p>
              <p className="text-xs text-gray-400 mt-1">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
