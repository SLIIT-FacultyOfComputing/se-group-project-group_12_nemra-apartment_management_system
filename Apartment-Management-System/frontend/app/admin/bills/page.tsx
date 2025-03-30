"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle, Download, Eye, Upload } from "lucide-react"

export default function AdminBillsPage() {
  const router = useRouter()
  const [bills] = useState([
    {
      id: "1",
      apartment: "A101",
      type: "Water",
      amount: 45.0,
      status: "paid",
      dueDate: "2023-05-15",
      paidDate: "2023-05-10",
    },
    {
      id: "2",
      apartment: "A102",
      type: "Electricity",
      amount: 78.5,
      status: "paid",
      dueDate: "2023-05-15",
      paidDate: "2023-05-12",
    },
    {
      id: "3",
      apartment: "B201",
      type: "Maintenance",
      amount: 100.0,
      status: "paid",
      dueDate: "2023-05-20",
      paidDate: "2023-05-18",
    },
    {
      id: "4",
      apartment: "C301",
      type: "Water",
      amount: 42.75,
      status: "pending",
      dueDate: "2023-05-25",
      paidDate: null,
    },
    {
      id: "5",
      apartment: "B205",
      type: "Electricity",
      amount: 65.3,
      status: "pending",
      dueDate: "2023-05-25",
      paidDate: null,
    },
    {
      id: "6",
      apartment: "A103",
      type: "Maintenance",
      amount: 100.0,
      status: "paid",
      dueDate: "2023-05-20",
      paidDate: "2023-05-15",
    },
    {
      id: "7",
      apartment: "C302",
      type: "Water",
      amount: 40.25,
      status: "paid",
      dueDate: "2023-05-15",
      paidDate: "2023-05-14",
    },
    {
      id: "8",
      apartment: "B202",
      type: "Electricity",
      amount: 72.8,
      status: "pending",
      dueDate: "2023-05-25",
      paidDate: null,
    },
  ])

  const [filter, setFilter] = useState("all")

  const filteredBills = bills.filter((bill) => {
    if (filter === "paid") return bill.status === "paid"
    if (filter === "pending") return bill.status === "pending"
    return true
  })

  const handleViewBill = (id: string) => {
    router.push(`/admin/bills/view?id=${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-purple-900 mb-2">Bills</h1>
        <p className="text-gray-600">View and manage all apartment bills.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              All Bills
            </button>
            <button
              onClick={() => setFilter("paid")}
              className={`px-4 py-2 rounded-md ${filter === "paid" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Paid
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-md ${filter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              Pending
            </button>
          </div>
          <a
            href="/admin/bills/upload"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Bills
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Apartment</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Paid Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{bill.apartment}</td>
                  <td className="py-3 px-4">{bill.type}</td>
                  <td className="py-3 px-4">${bill.amount.toFixed(2)}</td>
                  <td className="py-3 px-4">{bill.dueDate}</td>
                  <td className="py-3 px-4">
                    {bill.status === "paid" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">{bill.paidDate || "-"}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" onClick={() => handleViewBill(bill.id)}>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

