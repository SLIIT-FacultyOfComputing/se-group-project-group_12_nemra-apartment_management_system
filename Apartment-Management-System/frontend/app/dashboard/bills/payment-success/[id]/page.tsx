"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, CheckCircle, Home, MessageSquare, Receipt, ShoppingBag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

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
]

export default function PaymentSuccessPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const [bill, setBill] = useState<{
    id: string
    type: string
    amount: string
    dueDate: string
    status: string
    paidDate: string | null
    paymentSlip: string | null
  } | null>(null)

  useEffect(() => {
    const foundBill = billsData.find((b) => b.id === params.id)
    if (foundBill) {
      // Update bill status to paid
      const updatedBill = {
        ...foundBill,
        status: "Paid",
        paidDate: new Date().toISOString().split("T")[0],
      }
      setBill(updatedBill)
    }
  }, [params.id])

  useEffect(() => {
    let timer
    if (bill) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            router.push("/dashboard/bills")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [router, bill])

  if (!bill) {
    return <div>Bill not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard/bills" className="text-purple-700 hover:underline mr-2">
            Bills
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-2 text-gray-500">Payment Success</span>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-center">Payment Successful!</h2>
            <p className="text-gray-500 text-center mt-2">
              Your payment for {bill.type} has been processed successfully.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Bill Type</span>
                <span className="font-medium">{bill.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">{bill.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Date</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-green-600">Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-medium">TXN{Math.floor(Math.random() * 1000000)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-purple-700 hover:bg-purple-800 mb-2" onClick={() => router.push("/dashboard/bills")}>
              Return to Bills
            </Button>
            <p className="text-sm text-gray-500 text-center">Redirecting in {countdown} seconds...</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
