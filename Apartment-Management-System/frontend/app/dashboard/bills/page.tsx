"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Home, MessageSquare, Receipt, ShoppingBag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for bills
const billsData = [
  {
    id: "1",
    type: "Maintenance",
    amount: "Rs2300.00",
    dueDate: "2025-04-15",
    status: "Pending",
    paidDate: null,
    paymentSlip: null,
  },
  {
    id: "2",
    type: "Water",
    amount: "Rs4000.00",
    dueDate: "2025-03-25",
    status: "Overdue",
    paidDate: null,
    paymentSlip: null,
  },
  {
    id: "3",
    type: "Electricity",
    amount: "Rs5400.00",
    dueDate: "2025-02-10",
    status: "Paid",
    paidDate: "2025-02-08",
    paymentSlip: "/images/electricity-receipt.jpg",
  },
  {
    id: "4",
    type: "Internet",
    amount: "Rs4580.00",
    dueDate: "2025-01-09",
    status: "Paid",
    paidDate: "2025-01-08",
    paymentSlip: "/images/internet-receipt.jpg",
  },
]

export default function BillsPage() {
  const [bills, setBills] = useState(billsData)
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [typeFilter, setTypeFilter] = useState("All Types")

  const filteredBills = bills.filter((bill) => {
    const statusMatch = statusFilter === "All Status" || bill.status === statusFilter
    const typeMatch = typeFilter === "All Types" || bill.type === typeFilter
    return statusMatch && typeMatch
  })

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bills</h2>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Filter by Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Filter by Type:</span>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Water">Water</SelectItem>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Internet">Internet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm uppercase">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Due Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="border-t">
                    <td className="py-4">{bill.type}</td>
                    <td className="py-4">{bill.amount}</td>
                    <td className="py-4">
                      {new Date(bill.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                      {bill.paidDate && (
                        <div className="text-xs text-gray-500">
                          Paid:{" "}
                          {new Date(bill.paidDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </div>
                      )}
                    </td>
                    <td className="py-4">
                      {bill.status === "Pending" && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          ⦿ Pending
                        </Badge>
                      )}
                      {bill.status === "Overdue" && (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          ⦿ Overdue
                        </Badge>
                      )}
                      {bill.status === "Paid" && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          ⦿ Paid
                        </Badge>
                      )}
                    </td>
                    <td className="py-4">
                      {(bill.status === "Pending" || bill.status === "Overdue") && (
                        <Link href={`/dashboard/bills/payment/${bill.id}`}>
                          <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
                            Pay Now
                          </Button>
                        </Link>
                      )}
                      {bill.status === "Paid" && (
                        <Link href={`/dashboard/bills/details/${bill.id}`}>
                          <Button size="sm" variant="outline" className="text-purple-700 border-purple-700">
                            <Receipt className="h-4 w-4 mr-1" /> Receipt
                          </Button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
