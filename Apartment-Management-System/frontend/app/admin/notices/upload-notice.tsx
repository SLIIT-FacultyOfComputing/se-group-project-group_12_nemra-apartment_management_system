"use client"

import type React from "react"
import { useState, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Check, Upload, X } from "lucide-react"

interface UploadNoticeProps {
  onCancel?: () => void
}

export function UploadNotice({ onCancel }: UploadNoticeProps) {
  const router = useRouter()
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form
    setSubject("")
    setContent("")
    setImage(null)
    setImagePreview(null)
    setIsSubmitting(false)

    // Show success message and redirect
    alert("Notice uploaded successfully!")
    router.push("/admin/notices")
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      router.push("/admin/notices")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Upload Notice</CardTitle>
        <CardDescription className="text-gray-200">
          Create a new notice to be sent to apartment residents.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter notice subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter notice content"
                className="min-h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Notice Image (Optional)</Label>
              {!imagePreview ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    isDragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="text-lg font-medium">Drag and drop image here</p>
                    <p className="text-sm text-gray-500">or</p>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      Browse Images
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, GIF, WebP</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Notice preview"
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <CardFooter className="flex justify-end gap-4 px-0 pt-6">
            {/* <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button> */}
            <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Upload Notice
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
