"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, send a request to backend
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Email Sent",
        description: `A password reset link has been sent to ${email}`,
        variant: "success",
      })

      router.push("/verify-code")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit}>
        <h2 className="forgot-password-title">Recover Password</h2>
        <p className="forgot-password-text">
          Forgot your password? Don't worry, enter your email to reset your current password.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-password-input"
          disabled={isLoading}
        />
        <button type="submit" className="forgot-password-button" disabled={isLoading}>
          {isLoading ? "Sending..." : "Submit"}
        </button>
        <div className="back-to-registration-container">
          <Link href="/" className="back-to-registration-link">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  )
}

