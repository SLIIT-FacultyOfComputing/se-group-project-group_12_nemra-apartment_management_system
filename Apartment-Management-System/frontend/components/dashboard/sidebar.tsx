"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  FileText,
  ShoppingBag,
  CreditCard,
  Settings,
  User,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function DashboardSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()
  const { user } = useAuth()

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu)
  }

  const isAdmin = user?.role === "admin"

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } pt-20`}
      >
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-purple-800 text-white flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.username || "User"}</p>
              <p className="text-xs text-gray-500">{user?.role || "Resident"}</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive("/dashboard") ? "bg-purple-800 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home size={18} className="mr-3" />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/complaints"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive("/dashboard/complaints") ? "bg-purple-800 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <MessageSquare size={18} className="mr-3" />
                Complaints
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/bills"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive("/dashboard/bills") ? "bg-purple-800 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                Bills
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/marketplace"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive("/dashboard/marketplace") ? "bg-purple-800 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ShoppingBag size={18} className="mr-3" />
                Marketplace
              </Link>
            </li>

            {isAdmin && (
              <li>
                <button
                  onClick={() => toggleSubmenu("admin")}
                  className={`flex items-center justify-between w-full px-4 py-2 rounded-md ${
                    pathname.startsWith("/dashboard/admin")
                      ? "bg-purple-800 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <Settings size={18} className="mr-3" />
                    Admin
                  </div>
                  {activeSubmenu === "admin" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                {activeSubmenu === "admin" && (
                  <ul className="ml-6 mt-1 space-y-1">
                    <li>
                      <Link
                        href="/dashboard/admin/users"
                        className={`flex items-center px-4 py-2 rounded-md ${
                          isActive("/dashboard/admin/users")
                            ? "bg-purple-800 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <User size={16} className="mr-3" />
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/admin/reports"
                        className={`flex items-center px-4 py-2 rounded-md ${
                          isActive("/dashboard/admin/reports")
                            ? "bg-purple-800 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <FileText size={16} className="mr-3" />
                        Reports
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            <li>
              <Link
                href="/dashboard/profile"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive("/dashboard/profile") ? "bg-purple-800 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile toggle button */}
      <button
        className="fixed bottom-4 left-4 z-40 md:hidden bg-purple-800 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu size={24} />
      </button>
    </>
  )
}

