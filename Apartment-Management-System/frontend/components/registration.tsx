"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import * as Components from "@/components/ui/auth-components"

export default function Registration() {
  const [signIn, setSignIn] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { setUser } = useAuth()

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    // In a real app, you would validate credentials with your backend
    // For demo purposes, we'll just simulate a successful login
    setUser({
      username,
      email: `${username}@example.com`,
      issuer: "local-auth",
      publicAddress: "0x123...",
    })

    router.push("/dashboard")
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get("username") as string
    const houseNo = formData.get("houseNo") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // In a real app, you would send this data to your backend
    // For demo purposes, we'll just simulate a successful signup
    setUser({
      username,
      email,
      houseNo,
      issuer: "local-auth",
      publicAddress: "0x123...",
    })

    router.push("/dashboard")
  }

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignupSubmit}>
          <Components.Title>Create an Account</Components.Title>
          <Components.Input type="text" name="username" placeholder="User Name" required />
          <Components.Input type="text" name="houseNo" placeholder="House No" required />
          <Components.Input type="email" name="email" placeholder="Email" required />
          <Components.Input type="password" name="password" placeholder="Password" required />
          <Components.Button type="submit">Sign Up</Components.Button>

          <Components.Divider>OR</Components.Divider>

          <Components.GoogleButton type="button">
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
          <Components.Input type="text" name="username" placeholder="User Name" required />
          <Components.Input type="password" name="password" placeholder="Password" required />

          <Components.RememberMeContainer>
            <Components.RememberMeInput
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Remember Me</label>
          </Components.RememberMeContainer>

          <Link href="/forgot-password" passHref legacyBehavior>
            <Components.Anchor>Forgot your username or password?</Components.Anchor>
          </Link>
          <Components.Button type="submit">LOGIN</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>To keep connected with us please login with your personal info</Components.Paragraph>
            <Components.GhostButton onClick={() => setSignIn(true)}>Sign In</Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome!</Components.Title>
            <Components.Paragraph>Enter your personal details and start your journey with us</Components.Paragraph>
            <Components.GhostButton onClick={() => setSignIn(false)}>Sign Up</Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  )
}

