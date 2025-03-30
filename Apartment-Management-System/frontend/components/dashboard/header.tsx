"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  Bell,
  Menu,
  User,
  LogOut,
  Home,
  MessageSquare,
  CreditCard,
  ShoppingBag,
  ChevronDown,
  UserCircle,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function DashboardHeader() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close menus when clicking outside
  useEffect(() => {
    if (!mounted) return

    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false)
      }

      // Close mobile menu when clicking outside
      if (!e.target || !(e.target as HTMLElement).closest("[data-mobile-menu]")) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mounted])

  const handleLogout = () => {
    // Use the logout function from auth context
    logout()

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "success",
    })

    // Redirect to login page
    router.push("/")
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Complaints", path: "/dashboard/complaints", icon: MessageSquare },
    { name: "Bills", path: "/dashboard/bills", icon: CreditCard },
    { name: "Marketplace", path: "/dashboard/marketplace", icon: ShoppingBag },
  ]

  // Don't render until client-side to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-mobile-menu="trigger"
            >
              <Menu size={24} />
            </button>
            <Link href="/dashboard" className="text-xl font-bold text-purple-800">
              Apartment Management
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path) ? "bg-purple-800 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={16} className="mr-2" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User menu and notifications */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-purple-800 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            <div className="relative" ref={profileMenuRef}>
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-800 p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-purple-800 text-white flex items-center justify-center overflow-hidden">
                  {user?.username ? (
                    <span className="text-lg font-semibold">{user.username.charAt(0).toUpperCase()}</span>
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <span className="hidden md:block font-medium">{user?.username || "User"}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-20 border border-gray-200 transition-all duration-200 ease-in-out">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.username || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || "user@example.com"}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <UserCircle size={16} className="mr-3 text-gray-500" />
                      Your Profile
                    </Link>
                  </div>

                  <div className="py-1 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        handleLogout()
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2" data-mobile-menu="dropdown">
          <div className="container mx-auto px-4">
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path) ? "bg-purple-800 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={16} className="mr-2" />
                  {item.name}
                </Link>
              ))}
              <Link
                href="/dashboard/profile"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/dashboard/profile") ? "bg-purple-800 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={16} className="mr-2" />
                Your Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

