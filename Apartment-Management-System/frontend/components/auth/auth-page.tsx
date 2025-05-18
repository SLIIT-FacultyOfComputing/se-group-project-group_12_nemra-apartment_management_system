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
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { user, setUser } = useAuth()
  const { toast } = useToast()

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if already logged in
  useEffect(() => {
    if (!mounted) return

    const checkAuth = () => {
      const hasToken = document.cookie.includes("auth-token=")
      if (hasToken && user) {
        // Redirect based on user role
        if (user.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/dashboard")
        }
      }
    }

    checkAuth()
  }, [router, user, mounted])

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement)
      const username = formData.get("username") as string
      const password = formData.get("password") as string

      // Make API call to backend for login
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error(await response.text() || 'Login failed')
      }

      const userData = await response.json()
      console.log('Login response:', userData)

      // Set user in context and localStorage
      const user = {
        username: userData.username,
        email: userData.email,
        role: userData.isAdmin === true ? "admin" : "user" as "user" | "admin",
        houseNo: userData.houseNo || "",
        phone: userData.phone || ""
      }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      document.cookie = `auth-token=demo-token; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days

      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
        variant: "success",
      })

      // Redirect based on isAdmin
      if (userData.isAdmin) {
        console.log('Navigating to admin dashboard')
        router.push("/admin/dashboard")
      } else {
        console.log('Navigating to user dashboard')
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid username or password",
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
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      console.log('Attempting signup with:', { username, email, password })

      // Make API call to backend
      const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      });

      console.log('Signup response status:', response.status)
      const responseText = await response.text()
      console.log('Signup response text:', responseText)

      if (!response.ok) {
        throw new Error(responseText || 'Registration failed');
      }

      const userData = JSON.parse(responseText)
      console.log('Parsed user data:', userData)

      // Create user object
      const user: { username: string; email: string; role: "user" | "admin" } = {
        username: userData.username,
        email: userData.email,
        role: "user"
      }

      console.log('Created user object:', user)

      // Set a cookie to maintain session
      document.cookie = `auth-token=demo-token; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days

      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user))

      // Set user in context
      setUser(user)

      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
        variant: "success",
      })

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  return (
    <div>
      <header style={{ textAlign: "center", padding: "20px", fontSize: "24px", fontWeight: "bold", color: "#ffffff" }}>
        NEMRA - Apartment Management System
      </header>

      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignupSubmit}>
            <Components.Title>Create an Account</Components.Title>
            <Components.Input type="text" name="username" placeholder="User Name" required disabled={isLoading} />
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

            <Link href="/forgot-password" passHref >
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
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
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
    </div>
  )
}

