import { type NextRequest, NextResponse } from "next/server"

// In a real app, this would be stored in a database
let items = [
  {
    id: "1",
    title: "Leather Sofa",
    description: "Brown leather sofa in excellent condition, 3 years old.",
    price: 450,
    image: "/placeholder.svg?height=200&width=300",
    category: "furniture",
    sellerId: "user2",
    sellerName: "John Doe",
    date: "2023-10-10",
  },
  {
    id: "2",
    title: 'Samsung TV 55"',
    description: "Smart TV with 4K resolution, includes wall mount.",
    price: 350,
    image: "/placeholder.svg?height=200&width=300",
    category: "electronics",
    sellerId: "user3",
    sellerName: "Jane Smith",
    date: "2023-10-15",
  },
  {
    id: "3",
    title: "Refrigerator",
    description: "Double door refrigerator, frost-free, 300L capacity.",
    price: 500,
    image: "/placeholder.svg?height=200&width=300",
    category: "appliances",
    sellerId: "user4",
    sellerName: "Mike Johnson",
    date: "2023-10-18",
  },
  {
    id: "4",
    title: "Dining Table Set",
    description: "Wooden dining table with 6 chairs, good condition.",
    price: 280,
    image: "/placeholder.svg?height=200&width=300",
    category: "furniture",
    sellerId: "user5",
    sellerName: "Sarah Williams",
    date: "2023-10-12",
  },
]

export async function GET(request: NextRequest) {
  // In a real app, you would filter items based on search parameters
  return NextResponse.json(items)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, price, category, sellerId, sellerName } = body

    if (!title || !description || !price || !category || !sellerId || !sellerName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const newItem = {
      id: Date.now().toString(),
      title,
      description,
      price: Number.parseFloat(price),
      image: "/placeholder.svg?height=200&width=300", // In a real app, this would be an uploaded image
      category,
      sellerId,
      sellerName,
      date: new Date().toISOString().split("T")[0],
    }

    items = [newItem, ...items]

    return NextResponse.json(newItem)
  } catch (error) {
    console.error("Create marketplace item error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

