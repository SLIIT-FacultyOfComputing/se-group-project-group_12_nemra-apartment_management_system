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
      // In a real app, you would fetch this data from your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setItems([
        {
          id: "1",
          title: "Leather Sofa",
          description: "Brown leather sofa in excellent condition, 3 years old.",
          price: 30000,
          image: "https://assets.wfcdn.com/im/37206897/compr-r85/3066/306628598/clay-78-genuine-leather-sofa.jpg",
          seller: "R.M.Sudarshan",
          date: "2024-12-10",
          category: "furniture",
        },
        {
          id: "2",
          title: 'Samsung TV 55"',
          description: "Smart TV with 4K resolution, includes wall mount.",
          price: 52000,
          image: "https://www.greenware.lk/wp-content/uploads/2024/09/Samsung-55-inch-Q65D-QLED-Price-In-Sri-Lanka-scaled.webp",
          seller: "Nushu Perera",
          date: "2025-02-27",
          category: "electronics",
        },
        {
          id: "3",
          title: "Refrigerator",
          description: "Double door refrigerator, frost-free, 300L capacity.",
          price: 45000,
          image: "https://damro.lk/wp-content/uploads/2020/02/DRID240GRS-1-548x450.jpg",
          seller: "K.Raguwaran",
          date: "2025-03-18",
          category: "appliances",
        },
        {
          id: "4",
          title: "Dining Table Set",
          description: "Wooden dining table with 6 chairs, good condition.",
          price: 37000,
          image: "https://www.sierralivingconcepts.com/images/thumbs/0403037_dallas-ranch-rustic-solid-wood-double-pedestal-dining-table-set.jpeg",
          seller: "W.K.T.Herath",
          date: "2025-03-29",
          category: "furniture",
        },
        {
          id: "5",
          title: "Indoor Plant in Decorative Pot",
          description: "A potted plant like a snake plant, succulent, or fern, placed in a stylish, decorative pots",
          price: 800,
          image: "https://smartgardenguide.com/wp-content/uploads/2019/05/best-houseplants-for-beginners-2-1.jpg",
          seller: "Saraswathi Nandini",
          date: "2025-04.01",
          category: "Home Decor",
        },
        {
          id: "6",
          title: "Geometric Table Lamp",
          description: "A modern geometric table lamp with a unique design, ideal for placing on side tables or desks",
          price: 3800,
          image: "https://m.media-amazon.com/images/I/81PIpVF+osL._AC_UF894,1000_QL80_.jpg",
          seller: "Gayathri Disanayaka",
          date: "2025-04.01",
          category: "Home Decor",
        },
      ])

      setIsLoading(false)
    }

    fetchItems()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newItem.title || !newItem.description || !newItem.price) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this to your API
    const item: Item = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description,
      price: Number.parseFloat(newItem.price),
      image: "/placeholder.svg?height=200&width=300",
      seller: "You",
      date: new Date().toISOString().split("T")[0],
      category: newItem.category,
    }

    setItems([item, ...items])
    setNewItem({ title: "", description: "", price: "", category: "furniture" })
    setIsModalOpen(false)

    toast({
      title: "Item Listed",
      description: "Your item has been listed successfully",
      variant: "success",
    })
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

