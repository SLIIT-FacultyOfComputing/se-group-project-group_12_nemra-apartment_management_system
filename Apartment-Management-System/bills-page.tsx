"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Download, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Bill = {
  id: string
  type: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
  paidDate?: string
}

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "paid" | "pending" | "overdue">("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const { toast } = useToast()
  const router = useRouter()

  // Simulate fetching bills
  useEffect(() => {
    const fetchBills = async () => {
      // In a real app, you would fetch this data from your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setBills([
        {
          id: "1",
          type: "Maintenance",
          amount: 2300,
          dueDate: "2025-04-15",
          status: "pending",
        },
        {
          id: "2",
          type: "Water",
          amount: 4000,
          dueDate: "2025-03-25",
          status: "overdue",
        },
        {
          id: "3",
          type: "Electricity",
          amount: 5400,
          dueDate: "2025-02-10",
          status: "paid",
          paidDate: "2025-02-08",
        },
        {
          id: "4",
          type: "Internet",
          amount: 4580,
          dueDate: "2025-01-09",
          status: "paid",
          paidDate: "2025-01-08",
        },
      ])

      setIsLoading(false)
    }

    fetchBills()
  }, [])

  const handlePayBill = (id: string) => {
    // Navigate to payment page with bill ID
    router.push(`/dashboard/payment?billId=${id}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded text-xs">
            <CheckCircle size={12} className="mr-1" />
            Paid
          </span>
        )
      case "pending":
        return (
          <span className="flex items-center text-amber-600 bg-amber-100 px-2 py-1 rounded text-xs">
            <Clock size={12} className="mr-1" />
            Pending
          </span>
        )
      case "overdue":
        return (
          <span className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded text-xs">
            <AlertCircle size={12} className="mr-1" />
            Overdue
          </span>
        )
      default:
        return null
    }
  }

  // Get unique bill types for the filter
  const billTypes = ["all", ...Array.from(new Set(bills.map((bill) => bill.type)))]

  // Filter bills based on status and type
  const filteredBills = bills.filter((bill) => {
    const matchesStatus = filter === "all" || bill.status === filter
    const matchesType = typeFilter === "all" || bill.type === typeFilter
    return matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Bills</h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Filter by Status:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Filter by Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              {billTypes
                .filter((type) => type !== "all")
                .map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
        </div>
      ) : filteredBills.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Bills Found</h3>
          <p className="text-gray-500">
            {filter === "all" && typeFilter === "all"
              ? "You don't have any bills yet."
              : `You don't have any ${filter !== "all" ? filter : ""} ${typeFilter !== "all" ? typeFilter : ""} bills.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{bill.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Rs{bill.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{bill.dueDate}</div>
                      {bill.paidDate && <div className="text-xs text-gray-400">Paid: {bill.paidDate}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(bill.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {bill.status === "paid" ? (
                        <button className="text-purple-800 hover:text-purple-900 flex items-center justify-end w-full">
                          <Download size={16} className="mr-1" />
                          Receipt
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePayBill(bill.id)}
                          className="text-purple-800 hover:text-purple-900"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

