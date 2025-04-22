import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StyledComponentsRegistry from "@/lib/registry"
import { AuthProvider } from "@/context/auth-context"
import { ToastProvider } from "@/components/ui/toast-provider"
import { GoogleOAuthProvider } from "@react-oauth/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Apartment Management System",
  description: "Manage your apartment with ease",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
        <GoogleOAuthProvider clientId = "1043950846769-ob1jmjdr5mdmsir9hbjn7jjkf480v0gc.apps.googleusercontent.com">
          
          <AuthProvider>
          
            <ToastProvider>{children}</ToastProvider>
          
          </AuthProvider>
          </GoogleOAuthProvider>
        
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

