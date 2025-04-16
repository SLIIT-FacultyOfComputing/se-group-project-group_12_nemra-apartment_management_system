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
          imageUrl="https://www.creativefabrica.com/wp-content/uploads/2021/10/05/Security-Camera-CCTV-Icon-Graphics-18348730-1-1-580x386.jpg"
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
