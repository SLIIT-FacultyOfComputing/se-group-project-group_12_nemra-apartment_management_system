"use client"

import { type ReactNode, useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, dismiss } = useToast()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
        {toasts.map((toast) => {
          // Determine icon based on variant
          let Icon = CheckCircle
          const bgColor = "bg-white"
          let borderColor = "border-gray-200"
          let iconColor = "text-gray-500"

          if (toast.variant === "success") {
            Icon = CheckCircle
            borderColor = "border-green-500"
            iconColor = "text-green-500"
          } else if (toast.variant === "destructive") {
            Icon = AlertCircle
            borderColor = "border-red-500"
            iconColor = "text-red-500"
          } else if (toast.variant === "warning") {
            Icon = AlertTriangle
            borderColor = "border-amber-500"
            iconColor = "text-amber-500"
          }

          return (
            <div
              key={toast.id}
              className={`${bgColor} border-l-4 ${borderColor} rounded-md shadow-md p-4 flex items-start animate-in slide-in-from-right`}
            >
              <div className={`${iconColor} mr-3 mt-0.5`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{toast.title}</h3>
                {toast.description && <p className="mt-1 text-sm text-gray-500">{toast.description}</p>}
              </div>
              <button onClick={() => dismiss(toast.id)} className="ml-4 text-gray-400 hover:text-gray-500">
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

