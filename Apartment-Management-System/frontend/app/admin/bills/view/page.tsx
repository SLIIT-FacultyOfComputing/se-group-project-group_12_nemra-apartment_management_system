"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Download, CheckCircle, XCircle, ArrowLeft } from "lucide-react"

export default function ViewBillPage() {
  const [bill, setBill] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const billId = searchParams.get("id")

  // Mock bills data
  const bills = [
    {
      id: "1",
      apartment: "A101",
      type: "Water",
      amount: 45.0,
      status: "paid",
      dueDate: "2023-05-15",
      paidDate: "2023-05-10",
      details: {
        billNumber: "W-2023-A101-05",
        period: "April 2023",
        consumption: "15 cubic meters",
        rate: "$3.00 per cubic meter",
        additionalFees: [
          { name: "Service Fee", amount: 5.0 },
          { name: "Maintenance", amount: 10.0 },
        ],
      },
    },
    {
      id: "2",
      apartment: "A102",
      type: "Electricity",
      amount: 78.5,
      status: "paid",
      dueDate: "2023-05-15",
      paidDate: "2023-05-12",
      details: {
        billNumber: "E-2023-A102-05",
        period: "April 2023",
        consumption: "250 kWh",
        rate: "$0.25 per kWh",
        additionalFees: [
          { name: "Service Fee", amount: 5.0 },
          { name: "Grid Maintenance", amount: 11.0 },
        ],
      },
    },
    {
      id: "3",
      apartment: "B201",
      type: "Maintenance",
      amount: 100.0,
      status: "paid",
      dueDate: "2023-05-20",
      paidDate: "2023-05-18",
      details: {
        billNumber: "M-2023-B201-05",
        period: "May 2023",
        description: "Monthly maintenance fee",
        additionalFees: [],
      },
    },
    {
      id: "4",
      apartment: "C301",
      type: "Water",
      amount: 42.75,
      status: "pending",
      dueDate: "2023-05-25",
      paidDate: null,
      details: {
        billNumber: "W-2023-C301-05",
        period: "April 2023",
        consumption: "12.5 cubic meters",
        rate: "$3.00 per cubic meter",
        additionalFees: [{ name: "Service Fee", amount: 5.0 }],
      },
    },
    {
      id: "5",
      apartment: "B205",
      type: "Electricity",
      amount: 65.3,
      status: "pending",
      dueDate: "2023-05-25",
      paidDate: null,
      details: {
        billNumber: "E-2023-B205-05",
        period: "April 2023",
        consumption: "210 kWh",
        rate: "$0.25 per kWh",
        additionalFees: [
          { name: "Service Fee", amount: 5.0 },
          { name: "Grid Maintenance", amount: 7.5 },
        ],
      },
    },
  ]

  useEffect(() => {
    if (billId) {
      // Simulate API call to fetch bill details
      setTimeout(() => {
        const foundBill = bills.find((b) => b.id === billId)
        if (foundBill) {
          setBill(foundBill)
        }
        setIsLoading(false)
      }, 500)
    } else {
      router.push("/admin/bills")
    }
  }, [billId, router])

  const handleMarkAsPaid = async () => {
    if (!bill || bill.status === "paid") return

    setIsUpdating(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update bill status
      setBill({
        ...bill,
        status: "paid",
        paidDate: new Date().toISOString().split("T")[0],
      })

      toast({
        title: "Bill Updated",
        description: "The bill has been marked as paid.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the bill. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  if (!bill) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-red-600">Bill Not Found</h1>
        <p className="text-gray-600 mt-2">The bill you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => router.push("/admin/bills")}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Back to Bills
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-900">Bill Details</h1>
          <button
            onClick={() => router.push("/admin/bills")}
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Bills
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {bill.type} Bill - {bill.apartment}
            </h2>
            <p className="text-gray-500">Bill #{bill.details.billNumber}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-gray-800">${bill.amount.toFixed(2)}</span>
            {bill.status === "paid" ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Paid on {bill.paidDate}
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                <XCircle className="h-3 w-3 mr-1" />
                Due on {bill.dueDate}
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium text-gray-700 mb-3">Bill Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Billing Period</p>
              <p className="font-medium">{bill.details.period}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-medium">{bill.dueDate}</p>
            </div>
            {bill.details.consumption && (
              <div>
                <p className="text-sm text-gray-500">Consumption</p>
                <p className="font-medium">{bill.details.consumption}</p>
              </div>
            )}
            {bill.details.rate && (
              <div>
                <p className="text-sm text-gray-500">Rate</p>
                <p className="font-medium">{bill.details.rate}</p>
              </div>
            )}
            {bill.details.description && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium">{bill.details.description}</p>
              </div>
            )}
          </div>
        </div>

        {bill.details.additionalFees && bill.details.additionalFees.length > 0 && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="font-medium text-gray-700 mb-3">Additional Fees</h3>
            <div className="space-y-2">
              {bill.details.additionalFees.map((fee: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{fee.name}</span>
                  <span className="font-medium">${fee.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="font-medium text-gray-700 mb-3">Total</h3>
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span>${bill.amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>

          {bill.status !== "paid" && (
            <button
              onClick={handleMarkAsPaid}
              disabled={isUpdating}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Paid
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

