"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Bill = {
  id: string
  type: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
  paidDate?: string
}

export default function PaymentPage() {
  const [bill, setBill] = useState<Bill | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const billId = searchParams.get("billId")
  const { toast } = useToast()

  // Simulate fetching bill details
  useEffect(() => {
    const fetchBill = async () => {
      if (!billId) {
        setIsLoading(false)
        return
      }

      // In a real app, you would fetch this data from your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data - in a real app, you would fetch the specific bill by ID
      const mockBills: Bill[] = [
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
      ]

      const foundBill = mockBills.find((b) => b.id === billId)
      setBill(foundBill || null)
      setIsLoading(false)
    }

    fetchBill()
  }, [billId])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsSuccess(true)

    toast({
      title: "Payment Successful",
      description: `Your ${bill?.type} bill of Rs${bill?.amount.toFixed(2)} has been paid successfully.`,
      variant: "success",
    })

    // In a real app, you would update the bill status in your database
    setTimeout(() => {
      router.push("/dashboard/bills")
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  if (!bill) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bill Not Found</h2>
        <p className="text-gray-600 mb-6">The bill you are looking for does not exist.</p>
        <Button onClick={() => router.push("/dashboard/bills")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bills
        </Button>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto my-12 text-center">
        <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your {bill.type} bill of Rs{bill.amount.toFixed(2)} has been paid successfully.
        </p>
        <p className="text-sm text-gray-500 mb-8">You will be redirected to the bills page shortly...</p>
        <Button onClick={() => router.push("/dashboard/bills")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bills
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <Button variant="ghost" onClick={() => router.push("/dashboard/bills")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bills
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Pay your {bill.type} bill securely.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Bill Type:</span>
                <span className="font-medium">{bill.type}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">Rs{bill.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-medium">{bill.dueDate}</span>
              </div>
            </div>

            <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
              </TabsList>
              <TabsContent value="card">
                <form onSubmit={handlePayment} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <div className="flex space-x-2">
                        <Select required>
                          <SelectTrigger id="month">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                              <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                                {month.toString().padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select required>
                          <SelectTrigger id="year">
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                              <SelectItem key={year} value={year.toString().slice(-2)}>
                                {year.toString().slice(-2)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>Pay Rs{bill.amount.toFixed(2)}</>
                    )}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="paypal">
                <div className="text-center py-6 space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                    <Button
                      onClick={handlePayment}
                      className="bg-[#0070ba] hover:bg-[#005ea6] w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                          Processing...
                        </>
                      ) : (
                        <>Pay with PayPal</>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-xs text-gray-500 text-center w-full">
            <p>Your payment information is encrypted and secure.</p>
            <p>We do not store your card details.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

