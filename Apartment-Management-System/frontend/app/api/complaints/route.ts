import { type NextRequest, NextResponse } from "next/server"

// In a real app, this would be stored in a database
let complaints = [
  {
    id: "1",
    title: "Elevator not working",
    description: "The elevator on the east wing has been out of service for 2 days.",
    status: "in-progress",
    date: "2023-10-15",
    userId: "user1",
  },
  {
    id: "2",
    title: "Water leakage in bathroom",
    description: "There is water leaking from the ceiling in my bathroom.",
    status: "open",
    date: "2023-10-18",
    userId: "user1",
  },
  {
    id: "3",
    title: "Noise complaint",
    description: "Loud music from apartment 302 after 11 PM.",
    status: "resolved",
    date: "2023-10-10",
    userId: "user1",
  },
]

export async function GET(request: NextRequest) {
  // In a real app, you would filter complaints based on the authenticated user
  return NextResponse.json(complaints)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, userId } = body

    if (!title || !description || !userId) {
      return NextResponse.json({ error: "Title, description, and userId are required" }, { status: 400 })
    }

    const newComplaint = {
      id: Date.now().toString(),
      title,
      description,
      status: "open",
      date: new Date().toISOString().split("T")[0],
      userId,
    }

    complaints = [newComplaint, ...complaints]

    return NextResponse.json(newComplaint)
  } catch (error) {
    console.error("Create complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

