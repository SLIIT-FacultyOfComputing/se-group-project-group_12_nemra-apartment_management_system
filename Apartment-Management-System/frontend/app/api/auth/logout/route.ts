import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Clear the auth token cookie
  cookies().set({
    name: "auth-token",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "strict",
  })

  return NextResponse.json({ success: true })
}

