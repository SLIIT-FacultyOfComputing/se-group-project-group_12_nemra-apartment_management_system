"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Car, AlertTriangle, CheckCircle, Edit, Lock, Unlock } from "lucide-react"

// Define the ParkingSlot type first
type ParkingSlot = {
  id: string
  status: "available" | "reserved" | "blocked"
  visitor: string | null
  vehicle: string | null
  time: string | null
  reason?: string
}

// Then define the initial data with the correct type
const INITIAL_PARKING_DATA: ParkingSlot[] = [
  { id: "P1", status: "reserved", visitor: "John Smith", vehicle: "KA-01-AB-1234", time: "10:00 - 12:00" },
  { id: "P2", status: "reserved", visitor: "Sarah Johnson", vehicle: "KA-02-CD-5678", time: "11:00 - 14:00" },
  { id: "P3", status: "available", visitor: null, vehicle: null, time: null },
  { id: "P4", status: "available", visitor: null, vehicle: null, time: null },
  { id: "P5", status: "blocked", visitor: null, vehicle: null, time: null, reason: "Maintenance" },
  { id: "P6", status: "available", visitor: null, vehicle: null, time: null },
  { id: "P7", status: "reserved", visitor: "Michael Brown", vehicle: "KA-03-EF-9012", time: "13:00 - 15:00" },
  { id: "P8", status: "available", visitor: null, vehicle: null, time: null },
  { id: "P9", status: "blocked", visitor: null, vehicle: null, time: null, reason: "Reserved for management" },
  { id: "P10", status: "available", visitor: null, vehicle: null, time: null },
  { id: "P11", status: "reserved", visitor: "Emily Davis", vehicle: "KA-04-GH-3456", time: "14:00 - 16:00" },
  { id: "P12", status: "available", visitor: null, vehicle: null, time: null },
  { id: "P13", status: "available", visitor: null, vehicle: null, time: null },
  { id: "P14", status: "available", visitor: null, vehicle: null, time: null },
  { id: "P15", status: "blocked", visitor: null, vehicle: null, time: null, reason: "Construction" },
]

export default function AdminParkingPage() {
  const router = useRouter()
  const [parkingData, setParkingData] = useState<ParkingSlot[]>(INITIAL_PARKING_DATA)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null)
  const [blockReason, setBlockReason] = useState("")

  const filteredSlots = parkingData.filter((slot) => {
    if (filterStatus === "all") return true
    return slot.status === filterStatus
  })

  const stats = {
    total: parkingData.length,
    available: parkingData.filter((slot) => slot.status === "available").length,
    reserved: parkingData.filter((slot) => slot.status === "reserved").length,
    blocked: parkingData.filter((slot) => slot.status === "blocked").length,
  }

  const handleSlotAction = (slot: ParkingSlot, action: "block" | "unblock" | "view") => {
    setSelectedSlot(slot)

    if (action === "block" && slot.status === "available") {
      // Open block dialog
    } else if (action === "unblock" && slot.status === "blocked") {
      // Unblock the slot
      setParkingData(parkingData.map((s) => (s.id === slot.id ? { ...s, status: "available", reason: undefined } : s)))
      setSelectedSlot(null)
    }
  }

  const handleBlockSlot = () => {
    if (!selectedSlot || !blockReason) return

    setParkingData(
      parkingData.map((slot) =>
        slot.id === selectedSlot.id ? { ...slot, status: "blocked", reason: blockReason } : slot,
      ),
    )

    setSelectedSlot(null)
    setBlockReason("")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Parking Management</h1>
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Slots</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Available</p>
                <p className="text-2xl font-bold text-green-700">{stats.available}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Reserved</p>
                <p className="text-2xl font-bold text-purple-700">{stats.reserved}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Blocked</p>
                <p className="text-2xl font-bold text-amber-700">{stats.blocked}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-[650px]">
        <Tabs defaultValue="slots" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="slots" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                Parking Slots
              </TabsTrigger>
              <TabsTrigger
                value="reservations"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Reservations
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="slots" className="mt-0 transition-all duration-300 animate-in fade-in-0">
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Parking Slots Overview</CardTitle>
                <CardDescription className="text-gray-200">
                  Manage parking slots, block areas, and view reservations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Reserved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">Blocked</span>
                    </div>
                  </div>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Slots</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {filteredSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`
                        border rounded-lg p-4 flex flex-col items-center justify-center relative
                        ${slot.status === "available" ? "bg-green-50 border-green-200" : ""}
                        ${slot.status === "reserved" ? "bg-purple-50 border-purple-200" : ""}
                        ${slot.status === "blocked" ? "bg-amber-50 border-amber-200" : ""}
                      `}
                    >
                      <span className="text-lg font-bold">{slot.id}</span>
                      <Badge
                        variant="outline"
                        className={`
                          mt-2
                          ${slot.status === "available" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                          ${slot.status === "reserved" ? "bg-purple-100 text-purple-800 hover:bg-purple-100" : ""}
                          ${slot.status === "blocked" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : ""}
                        `}
                      >
                        {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                      </Badge>

                      {slot.status === "reserved" && (
                        <div className="mt-2 text-xs text-center text-gray-500">
                          <p className="truncate max-w-full">{slot.visitor}</p>
                          <p>{slot.time}</p>
                        </div>
                      )}

                      {slot.status === "blocked" && slot.reason && (
                        <div className="mt-2 text-xs text-center text-amber-700">
                          <p>{slot.reason}</p>
                        </div>
                      )}

                      <div className="absolute top-2 right-2 flex gap-1">
                        {slot.status === "available" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-500 hover:text-amber-600"
                            onClick={() => handleSlotAction(slot, "block")}
                          >
                            <Lock className="h-3 w-3" />
                          </Button>
                        )}

                        {slot.status === "blocked" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-500 hover:text-green-600"
                            onClick={() => handleSlotAction(slot, "unblock")}
                          >
                            <Unlock className="h-3 w-3" />
                          </Button>
                        )}

                        {slot.status === "reserved" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-500 hover:text-blue-600"
                            onClick={() => handleSlotAction(slot, "view")}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations" className="mt-0 transition-all duration-300 animate-in fade-in-0">
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Parking Reservations</CardTitle>
                <CardDescription className="text-gray-200">View and manage all parking reservations</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {parkingData.filter((slot) => slot.status === "reserved").length > 0 ? (
                  <div className="overflow-hidden rounded-md border border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Slot
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Visitor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Vehicle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {parkingData
                            .filter((slot) => slot.status === "reserved")
                            .map((reservation) => (
                              <tr key={reservation.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {reservation.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {reservation.visitor}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {reservation.vehicle}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {reservation.time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Active</Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                    Edit
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">
                                    Cancel
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No reservations found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Block Slot Dialog */}
      {selectedSlot && selectedSlot.status === "available" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Block Parking Slot {selectedSlot.id}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="block-reason">Reason for blocking</Label>
                <Input
                  id="block-reason"
                  placeholder="Enter reason"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedSlot(null)}>
                  Cancel
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700" onClick={handleBlockSlot} disabled={!blockReason}>
                  Block Slot
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
