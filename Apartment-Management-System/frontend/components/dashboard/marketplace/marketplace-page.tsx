"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ShoppingBag, Plus, Search, X, Tag, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Item = {
  id: string
  title: string
  description: string
  price: number
  image: string
  seller: string
  date: string
  category: string
}

export default function MarketplacePage() {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: "",
    category: "furniture",
  })
  const { toast } = useToast()

  // Simulate fetching marketplace items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/marketplace")
        if (!response.ok) {
          throw new Error("Failed to fetch items")
        }
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error("Error fetching items:", error)
        toast({
          title: "Error",
          description: "Failed to fetch marketplace items. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newItem.title || !newItem.description || !newItem.price) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("http://localhost:8081/api/marketplace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newItem.title,
          description: newItem.description,
          price: Number.parseFloat(newItem.price),
          category: newItem.category,
          sellerId: "current-user-id", // TODO: Get from auth context
          sellerName: "Current User", // TODO: Get from auth context
          date: new Date().toISOString().split("T")[0],
          image: "/placeholder.svg?height=200&width=300"
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create item")
      }

      const createdItem = await response.json()
      setItems([createdItem, ...items])
      setNewItem({ title: "", description: "", price: "", category: "furniture" })
      setIsModalOpen(false)

      toast({
        title: "Item Listed",
        description: "Your item has been listed successfully",
        variant: "success",
      })
    } catch (error) {
      console.error("Error creating item:", error)
      toast({
        title: "Error",
        description: "Failed to list item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "furniture", label: "Furniture" },
    { value: "electronics", label: "Electronics" },
    { value: "appliances", label: "Appliances" },
    { value: "Home Decor", label: "Home Decor" },
    { value: "other", label: "Other" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Marketplace</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          List Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Items Found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "No items match your search criteria." : "There are no items listed in the marketplace yet."}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900 transition-colors"
          >
            List an Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                  <span className="flex items-center text-green-600 font-bold">
                  Rs. {item.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="flex items-center text-xs text-gray-500">
                    <Tag size={14} className="mr-1" />
                    {categories.find((c) => c.value === item.category)?.label || item.category}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Seller: {item.seller}</span>
                  <button className="text-sm text-purple-800 hover:text-purple-900 font-medium">Contact Seller</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium text-gray-800">List a New Item</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Item title"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  {categories
                    .filter((c) => c.value !== "all")
                    .map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (Rs)
                </label>
                <input
                  type="number"
                  id="price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Item price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  rows={4}
                  placeholder="Detailed description of the item"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-800 text-white rounded-md text-sm font-medium hover:bg-purple-900"
                >
                  List Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

