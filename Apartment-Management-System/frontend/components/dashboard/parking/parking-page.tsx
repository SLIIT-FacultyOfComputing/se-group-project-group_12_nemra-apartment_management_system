 "use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function ParkingPage() {
  const [activeTab, setActiveTab] = useState<string>("book")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState<string>("10:00")
  const [endTime, setEndTime] = useState<string>("12:00")
  const [visitorName, setVisitorName] = useState<string>("")
  const [vehicleNumber, setVehicleNumber] = useState<string>("")
  const [vehicleModel, setVehicleModel] = useState<string>("")
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()

  // Mock parking slots - replace with data from your backend
  const parkingSlots = [
    { id: "slot-1", name: "P1", isAvailable: true },
    { id: "slot-2", name: "P2", isAvailable: true },
    { id: "slot-3", name: "P3", isAvailable: false },
    { id: "slot-4", name: "P4", isAvailable: true },
    { id: "slot-5", name: "P5", isAvailable: false },
    { id: "slot-6", name: "P6", isAvailable: true },
    { id: "slot-7", name: "P7", isAvailable: true },
    { id: "slot-8", name: "P8", isAvailable: true },
    { id: "slot-9", name: "P9", isAvailable: false },
    { id: "slot-10", name: "P10", isAvailable: true },
  ]

  // Mock bookings - replace with data from your backend
  const [bookings, setBookings] = useState([
    {
      id: "booking-1",
      visitorName: "K.Narayan",
      vehicleNumber: "KA-01-AB-1234",
      slotName: "P5",
      date: new Date(),
      startTime: "14:00",
      endTime: "16:00",
      status: "upcoming",
    },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedSlot) {
      toast({
        title: "Error",
        description: "Please select a parking slot",
        variant: "destructive",
      })
      return
    }

    if (!visitorName || !vehicleNumber || !vehicleModel) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Booking Successful",
        description: "Your parking slot has been reserved",
        variant: "success",
      })

      // Reset form
      setVisitorName("")
      setVehicleNumber("")
      setVehicleModel("")
      setSelectedSlot(null)
      setActiveTab("bookings")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book parking slot",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Booking Cancelled",
        description: "Your parking reservation has been cancelled",
        variant: "success",
      })
 
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Visitor Parking</h1>
      </div>

      <Tabs defaultValue="book" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="book">Book Parking</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="book" className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Information</CardTitle>
                  <CardDescription>Enter details about your visitor and their vehicle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="visitorName">Visitor Name</Label>
                    <Input
                      id="visitorName"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Enter visitor's name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                    <Input
                      id="vehicleNumber"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      placeholder="e.g., KA-01-AB-1234"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleModel">Vehicle Model</Label>
                    <Input
                      id="vehicleModel"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g., Honda Civic"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>Select date and time for the parking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <select
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                            {`${i.toString().padStart(2, "0")}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <select
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                            {`${i.toString().padStart(2, "0")}:00`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Select Parking Slot</CardTitle>
                <CardDescription>Choose an available parking slot for your visitor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-3 md:gap-4">
                  {parkingSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => slot.isAvailable && setSelectedSlot(slot.id)}
                      className={cn(
                        "h-14 rounded-md flex items-center justify-center font-medium border-2",
                        slot.isAvailable
                          ? selectedSlot === slot.id
                            ? "bg-purple-100 border-purple-800 text-purple-800"
                            : "bg-white border-gray-200 text-gray-800 hover:border-purple-800 hover:text-purple-800"
                          : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
                      )}
                      disabled={!slot.isAvailable}
                    >
                      {slot.name}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-6 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded"></div>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-100 border-2 border-purple-800 rounded"></div>
                    <span className="text-sm text-gray-600">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-100 border-2 border-gray-200 rounded"></div>
                    <span className="text-sm text-gray-600">Unavailable</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    "Book Parking Slot"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>Your scheduled parking reservations</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-6">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No Bookings</h3>
                  <p className="text-gray-500 mb-4">You don't have any parking reservations.</p>
                  <Button onClick={() => setActiveTab("book")} variant="outline">
                    Book Parking
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">{booking.visitorName}</p>
                          <p className="text-sm text-gray-600">{booking.vehicleNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{format(booking.date, "EEE, MMM d, yyyy")}</p>
                          <p className="text-sm text-gray-600">
                            {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                            Slot {booking.slotName}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
