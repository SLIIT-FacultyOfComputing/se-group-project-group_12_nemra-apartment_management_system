"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import { useSearchParams } from "next/navigation"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match!",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, send the new password to backend
      // Simulate API call
      await axios.post("http://localhost:8081/reset-password2",{
        email:email,
        password:password
      });

      toast({
        title: "Success",
        description: "Your password has been successfully reset!",
        variant: "success",
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h2 className="reset-password-title">Reset Password</h2>

        <p className="reset-password-text">Create a password that you haven't used before.</p>

        <div className="input-container">
          <label htmlFor="password" className="input-label">
            Create Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="reset-password-input"
            disabled={isLoading}
          />
        </div>

        <div className="input-container">
          <label htmlFor="confirm-password" className="input-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="reset-password-input"
            disabled={isLoading}
          />
        </div>

        <p className="password-strength-text">Make sure password is strong</p>

        <button type="submit" className="reset-password-button" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
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

