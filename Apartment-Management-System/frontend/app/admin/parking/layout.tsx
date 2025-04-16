import type { ReactNode } from "react"

interface ParkingLayoutProps {
  children: ReactNode
}

export default function ParkingLayout({ children }: ParkingLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
