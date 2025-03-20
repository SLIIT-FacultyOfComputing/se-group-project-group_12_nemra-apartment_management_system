"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import * as Components from "@/components/ui/auth-components"

export default function AuthPage() {
  const [signIn, setSignIn] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useAuth()
  const { toast } = useToast()

  // Check if already logged in
  useEffect(() => {
    const checkAuth = () => {
      const hasToken = document.cookie.includes("auth-token=")
      if (hasToken) {
        router.push("/dashboard")
      }
    }

    checkAuth()
  }, [router])

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement)
      const username = formData.get("username") as string
      const password = formData.get("password") as string

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create user object
      const user = {
        username,
        email: `${username}@example.com`,
        role: "user",
        houseNo: "A101",
      }

      // Set user in context
      setUser(user)

      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user))

      // Set a cookie to maintain session
      document.cookie = `auth-token=demo-token; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days

      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
        variant: "success",
      })

      // Use a slight delay to ensure the cookie is set before navigation
      setTimeout(() => {
        router.push("/dashboard")
      }, 100)
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement)
      const username = formData.get("username") as string
      const houseNo = formData.get("houseNo") as string
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create user object
      const user = {
        username,
        email,
        role: "user",
        houseNo,
      }

      // Set user in context
      setUser(user)

      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user))

      // Set a cookie to maintain session
      document.cookie = `auth-token=demo-token; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days

      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
        variant: "success",
      })

      // Use a slight delay to ensure the cookie is set before navigation
      setTimeout(() => {
        router.push("/dashboard")
      }, 100)
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignupSubmit}>
          <Components.Title>Create an Account</Components.Title>
          <Components.Input type="text" name="username" placeholder="User Name" required disabled={isLoading} />
          <Components.Input type="text" name="houseNo" placeholder="House No" required disabled={isLoading} />
          <Components.Input type="email" name="email" placeholder="Email" required disabled={isLoading} />
          <Components.Input type="password" name="password" placeholder="Password" required disabled={isLoading} />
          <Components.Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Components.Button>

          <Components.Divider>OR</Components.Divider>

          <Components.GoogleButton type="button" disabled={isLoading}>
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="Google Logo"
            />
            Sign In with Google
          </Components.GoogleButton>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLoginSubmit}>
          <Components.Title>LOG IN</Components.Title>
          <Components.Input type="text" name="username" placeholder="User Name" required disabled={isLoading} />
          <Components.Input type="password" name="password" placeholder="Password" required disabled={isLoading} />

          <Components.RememberMeContainer>
            <Components.RememberMeInput
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              disabled={isLoading}
            />
            <label>Remember Me</label>
          </Components.RememberMeContainer>

          <Link href="/forgot-password" passHref legacyBehavior>
            <Components.Anchor>Forgot your username or password?</Components.Anchor>
          </Link>
          <Components.Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging In..." : "LOGIN"}
          </Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>To keep connected with us please login with your personal info</Components.Paragraph>
            <Components.GhostButton onClick={() => setSignIn(true)} disabled={isLoading}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome!</Components.Title>
            <Components.Paragraph>Enter your personal details and start your journey with us</Components.Paragraph>
            <Components.GhostButton onClick={() => setSignIn(false)} disabled={isLoading}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  )
}

