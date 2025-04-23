"use client"

// This is not a complete file, just the part you need to modify in your existing bills-page file

// Add this import at the top of your file
import { useRouter } from "next/navigation"

// Add this inside your component
const router = useRouter()

// Replace your existing handlePayBill function with this:
const handlePayBill = (id: string) => {
  // Navigate to payment page with bill ID
  router.push(`/payment?billId=${id}`)
  // If your routes are structured differently, adjust the path accordingly
  // For example: router.push(`/bills/payment?billId=${id}`)
}

