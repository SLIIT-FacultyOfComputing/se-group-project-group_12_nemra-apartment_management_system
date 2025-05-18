"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Download, Home, MessageSquare, Receipt, ShoppingBag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for bills
const billsData = [
  {
    id: "3",
    type: "Electricity",
    amount: "Rs5400.00",
    dueDate: "2025-02-10",
    status: "Paid",
    paidDate: "2025-02-08",
    paymentSlip: "/placeholder.svg?height=800&width=600",
    paymentMethod: "Credit Card",
    transactionId: "TXN123456",
    billingPeriod: "January 2025",
    meterReading: {
      previous: "4532",
      current: "4721",
      units: "189",
    },
  },
  {
    id: "4",
    type: "Internet",
    amount: "Rs4580.00",
    dueDate: "2025-01-09",
    status: "Paid",
    paidDate: "2025-01-08",
    paymentSlip: "/placeholder.svg?height=800&width=600",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN789012",
    billingPeriod: "December 2024",
    planDetails: "100 Mbps Fiber Optic",
  },
]

export default function BillDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("details")

  const bill = billsData.find((b) => b.id === params.id)

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
          <span className="ml-2 text-gray-500">Bill Details</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{bill.type} Bill Details</CardTitle>
                <Button variant="outline" size="sm" className="text-purple-700 border-purple-700">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="details">Bill Details</TabsTrigger>
                    <TabsTrigger value="payment">Payment Slip</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Bill Type</h3>
                        <p className="mt-1">{bill.type}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                        <p className="mt-1">{bill.amount}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                        <p className="mt-1">
                          {new Date(bill.dueDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Payment Date</h3>
                        <p className="mt-1">
                          {bill.paidDate &&
                            new Date(bill.paidDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Status</h3>
                        <p className="mt-1 text-green-600 font-medium">{bill.status}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                        <p className="mt-1">{bill.paymentMethod}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Transaction ID</h3>
                        <p className="mt-1">{bill.transactionId}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Billing Period</h3>
                        <p className="mt-1">{bill.billingPeriod}</p>
                      </div>
                    </div>

                    <Separator />

                    {bill.type === "Electricity" && bill.meterReading && (
                      <div>
                        <h3 className="text-sm font-medium mb-3">Meter Reading</h3>
                        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                          <div>
                            <h4 className="text-xs text-gray-500">Previous Reading</h4>
                            <p className="font-medium">{bill.meterReading.previous}</p>
                          </div>
                          <div>
                            <h4 className="text-xs text-gray-500">Current Reading</h4>
                            <p className="font-medium">{bill.meterReading.current}</p>
                          </div>
                          <div>
                            <h4 className="text-xs text-gray-500">Units Consumed</h4>
                            <p className="font-medium">{bill.meterReading.units}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {bill.type === "Internet" && bill.planDetails && (
                      <div>
                        <h3 className="text-sm font-medium mb-3">Plan Details</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>{bill.planDetails}</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="payment">
                    <div className="flex flex-col items-center">
                      <div className="border rounded-lg overflow-hidden mb-4 max-w-md">
                        <Image
                          src={bill.paymentSlip || "/placeholder.svg?height=800&width=600"}
                          alt="Payment Receipt"
                          width={600}
                          height={800}
                          className="object-contain"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="text-purple-700 border-purple-700">
                        <Download className="h-4 w-4 mr-2" /> Download Payment Slip
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Receipt className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{bill.amount}</p>
                        <p className="text-sm text-gray-500">
                          {bill.paidDate &&
                            new Date(bill.paidDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">{bill.paymentMethod}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      If you have any questions about this bill, please contact our support team.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
