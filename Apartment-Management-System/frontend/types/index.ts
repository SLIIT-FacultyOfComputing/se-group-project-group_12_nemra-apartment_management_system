export type User = {
  id?: string
  username: string
  email: string
  houseNo?: string
  role: "admin" | "user"
}

export type Complaint = {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved"
  date: string
  userId: string
}

export type Bill = {
  id: string
  type: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
  paidDate?: string
  userId: string
}

export type MarketplaceItem = {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  sellerId: string
  sellerName: string
  date: string
}

