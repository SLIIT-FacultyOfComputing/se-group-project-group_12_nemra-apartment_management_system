import { type NextRequest, NextResponse } from "next/server"

// In a real app, this would be stored in a database
const bills = [
  {
    id: "1",
    type: "Maintenance",
    amount: 150,
    dueDate: "2023-10-25",
    status: "pending",
    userId: "user1",
  },
  {
    id: "2",
    type: "Water",
    amount: 75,
    dueDate: "2023-10-15",
    status: "overdue",
    userId: "user1",
  },
  {
    id: "3",
    type: "Electricity",
    amount: 120,
    dueDate: "2023-10-10",
    status: "paid",
    paidDate: "2023-10-08",
    userId: "user1",
  },
  {
    id: "4",
    type: "Internet",
    amount: 60,
    dueDate: "2023-10-05",
    status: "paid",
    paidDate: "2023-10-03",
    userId: "user1",
  },
]

export async function GET(request: NextRequest) {
  // In a real app, you would filter bills based on the authenticated user
  return NextResponse.json(bills)
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: "Bill ID and status are required" }, { status: 400 })
    }

    const billIndex = bills.findIndex((bill) => bill.id === id)

    if (billIndex === -1) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 })
    }

    bills[billIndex] = {
      ...bills[billIndex],
      status,
      ...(status === "paid" ? { paidDate: new Date().toISOString().split("T")[0] } : {}),
    }

    return NextResponse.json(bills[billIndex])
  } catch (error) {
    console.error("Update bill error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

