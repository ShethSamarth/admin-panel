import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const user = getAuthSession()

    const body = await req.json()

    const { name, code } = body

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!code) {
      return new NextResponse("Code is required", { status: 400 })
    }

    const color = await db.color.create({
      data: { name, code },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLORS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const colors = await db.color.findMany()

    return NextResponse.json(colors)
  } catch (error) {
    console.log("[COLORS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
