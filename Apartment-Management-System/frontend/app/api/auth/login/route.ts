import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // In a real app, you would validate credentials against your database
    // For demo purposes, we'll accept any login
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Create a session token (in a real app, this would be a JWT)
    const token = "demo-token-" + Math.random().toString(36).substring(2, 9)

    // Set the token as a cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
    })

    return NextResponse.json({
      success: true,
      user: {
        username,
        email: `${username}@example.com`,
        role: "user",
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

