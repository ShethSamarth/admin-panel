import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const user = getAuthSession()

    const body = await req.json()

    const { name, subCategoryId } = body

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!subCategoryId) {
      return new NextResponse("Category Id is required", { status: 400 })
    }

    const subSubCategory = await db.subSubCategory.create({
      data: { name, subcategoryId: subCategoryId },
    })

    return NextResponse.json(subSubCategory)
  } catch (error) {
    console.log("[SUBSUBCATEGORIES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const subSubCategories = await db.subSubCategory.findMany()

    return NextResponse.json(subSubCategories)
  } catch (error) {
    console.log("[SUBSUBCATEGORIES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
