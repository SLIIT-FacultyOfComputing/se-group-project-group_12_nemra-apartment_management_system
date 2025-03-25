"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Home, Phone, Key, Save, Shield, Bell, Settings } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, setUser, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    houseNo: "",
    phone: "555-123-4567", // Example data
    password: "",
    confirmPassword: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
    if (user) {
      setProfile({
        ...profile,
        username: user.username || "",
        email: user.email || "",
        houseNo: user.houseNo || "",
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (profile.password && profile.password !== profile.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would send this to your API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user context
      setUser({
        ...user,
        username: profile.username,
        email: profile.email,
        houseNo: profile.houseNo,
      })

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
        variant: "success",
      })

      // Clear password fields
      setProfile({
        ...profile,
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "success",
    })
    router.push("/")
  }

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("general")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "general"
                  ? "border-b-2 border-purple-800 text-purple-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <User size={16} className="inline mr-2" />
              General
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "security"
                  ? "border-b-2 border-purple-800 text-purple-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Shield size={16} className="inline mr-2" />
              Security
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "notifications"
                  ? "border-b-2 border-purple-800 text-purple-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Bell size={16} className="inline mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "settings"
                  ? "border-b-2 border-purple-800 text-purple-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Settings size={16} className="inline mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "general" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Personal Information</h2>
                <p className="text-sm text-gray-500">Update your personal details</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="username"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 mb-1">
                      House/Apartment Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Home size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="houseNo"
                        value={profile.houseNo}
                        onChange={(e) => setProfile({ ...profile, houseNo: e.target.value })}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Security Settings</h2>
                <p className="text-sm text-gray-500">Manage your password and security preferences</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-800 mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="password"
                            id="password"
                            value={profile.password}
                            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Leave blank to keep current password"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="password"
                            id="confirmPassword"
                            value={profile.confirmPassword}
                            onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Leave blank to keep current password"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-800 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-800">Enhance your account security</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Enable
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Notification Preferences</h2>
                <p className="text-sm text-gray-500">Manage how you receive notifications</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Bill Reminders</p>
                        <p className="text-sm text-gray-500">Receive reminders when bills are due</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-800"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Complaint Updates</p>
                        <p className="text-sm text-gray-500">Receive updates on your complaints</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-800"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Marketplace Activity</p>
                        <p className="text-sm text-gray-500">Receive notifications about marketplace activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-800"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-800 mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Enable Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications on your device</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-800"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="flex items-center bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900 transition-colors"
                >
                  <Save size={16} className="mr-2" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">Account Settings</h2>
                <p className="text-sm text-gray-500">Manage your account preferences</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-4">Language & Region</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                        Language
                      </label>
                      <select
                        id="language"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        defaultValue="en"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        defaultValue="UTC-5"
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                        <option value="UTC-6">Central Time (UTC-6)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">UTC</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-800 mb-4">Danger Zone</h3>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <h4 className="text-red-600 font-medium">Delete Account</h4>
                    <p className="text-sm text-red-500 mt-1">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-white border border-red-300 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="flex items-center bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900 transition-colors"
                >
                  <Save size={16} className="mr-2" />
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

