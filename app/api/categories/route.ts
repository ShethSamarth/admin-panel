import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const user = getAuthSession()

    const body = await req.json()

    const { name } = body

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const category = await db.category.create({
      data: { name },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORIES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const categories = await db.category.findMany()

    return NextResponse.json(categories)
  } catch (error) {
    console.log("[CATEGORIES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
