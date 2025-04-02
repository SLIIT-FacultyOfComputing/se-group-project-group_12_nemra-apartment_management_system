"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { LogOut, User } from "lucide-react"

export default function AdminHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <header className="bg-purple-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              NEMRA Admin
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/admin/dashboard"
                className={`hover:text-purple-200 transition-colors ${isActive("/admin/dashboard") ? "font-medium" : ""}`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/bills"
                className={`hover:text-purple-200 transition-colors ${isActive("/admin/bills") ? "font-medium" : ""}`}
              >
                Bills
              </Link>
              <Link
                href="/admin/notices"
                className={`hover:text-purple-200 transition-colors ${isActive("/admin/notices") ? "font-medium" : ""}`}
              >
                Notices
              </Link>
              <Link
                href="/admin/complaints"
                className={`hover:text-purple-200 transition-colors ${isActive("/admin/complaints") ? "font-medium" : ""}`}
              >
                Complaints
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{user?.username || "Admin"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center hover:text-purple-200 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

