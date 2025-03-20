"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function VerifyCode() {
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would verify the code with your backend
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Code Verified",
        description: "Your verification code has been accepted.",
        variant: "success",
      })

      router.push("/reset-password")
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="verify-code-container">
      <form onSubmit={handleSubmit} className="verify-code-form">
        <h2 className="verify-code-title">Verify Your Email</h2>

        <p className="verify-code-text">We have sent a verification code to your email. Please enter the code below.</p>

        <div className="input-container">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="verify-code-input"
            disabled={isLoading}
          />
        </div>

        <div className="input-container">
          <label htmlFor="verification-code" className="input-label">
            Verification Code
          </label>
          <input
            type="text"
            id="verification-code"
            placeholder="Enter the verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            className="verify-code-input"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="verify-code-button" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
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

