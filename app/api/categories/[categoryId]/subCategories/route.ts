import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const user = getAuthSession()

    const body = await req.json()

    const { name, categoryId } = body

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 })
    }

    const subCategory = await db.subCategory.create({
      data: { name, categoryId },
    })

    return NextResponse.json(subCategory)
  } catch (error) {
    console.log("[SUBCATEGORIES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const subCategories = await db.subCategory.findMany()

    return NextResponse.json(subCategories)
  } catch (error) {
    console.log("[SUBCATEGORIES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
