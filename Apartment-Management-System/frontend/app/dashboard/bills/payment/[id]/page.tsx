"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronDown, Home, MessageSquare, Receipt, ShoppingBag, Upload, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

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

export default function BillPaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const bill = billsData.find((b) => b.id === params.id)

  if (!bill) {
    return <div>Bill not found</div>
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentSlip(e.target.files[0])
    }
  }

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push(`/dashboard/bills/payment-success/${params.id}`)
      }, 2000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard/bills" className="text-purple-700 hover:underline mr-2">
            Bills
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-2 text-gray-500">Payment</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-6">
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Pay directly with your card</div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div className="font-medium">Bank Transfer</div>
                      <div className="text-sm text-gray-500">Pay via bank transfer and upload receipt</div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">Bank Transfer Details</h3>
                      <p className="text-sm text-gray-600 mb-1">Account Name: Apartment Management</p>
                      <p className="text-sm text-gray-600 mb-1">Account Number: 1234567890</p>
                      <p className="text-sm text-gray-600 mb-1">Bank: National Bank</p>
                      <p className="text-sm text-gray-600 mb-1">
                        Reference: {bill.type}-{bill.id}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentSlip">Upload Payment Receipt</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Input
                          id="paymentSlip"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <Label htmlFor="paymentSlip" className="cursor-pointer">
                          {paymentSlip ? (
                            <div className="flex items-center justify-center text-green-600">
                              <Check className="h-5 w-5 mr-2" />
                              <span>{paymentSlip.name}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center text-gray-500">
                              <Upload className="h-10 w-10 mb-2" />
                              <span className="text-sm">Click to upload or drag and drop</span>
                              <span className="text-xs mt-1">PNG, JPG or PDF (max. 5MB)</span>
                            </div>
                          )}
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-purple-700 hover:bg-purple-800"
                  onClick={handlePayment}
                  disabled={isProcessing || isSuccess || (paymentMethod === "bank" && !paymentSlip)}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </div>
                  ) : isSuccess ? (
                    <div className="flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      Payment Successful
                    </div>
                  ) : (
                    'Pay ${bill.amount}'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bill Type</span>
                    <span className="font-medium">{bill.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Due Date</span>
                    <span className="font-medium">
                      {new Date(bill.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{bill.amount}</span>
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
