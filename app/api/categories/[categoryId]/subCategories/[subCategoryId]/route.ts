import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { subCategoryId: string } }
) {
  try {
    if (!params.subCategoryId) {
      return new NextResponse("SubCategory id is required", { status: 400 })
    }

    const subCategory = await db.subCategory.findUnique({
      where: { id: params.subCategoryId },
    })

    return NextResponse.json(subCategory)
  } catch (error) {
    console.log("[SUBCATEGORY_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { subCategoryId: string } }
) {
  try {
    const user = getAuthSession()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.subCategoryId) {
      return new NextResponse("SubCategory id is required", { status: 400 })
    }

    const subCategory = await db.subCategory.deleteMany({
      where: { id: params.subCategoryId },
    })

    return NextResponse.json(subCategory)
  } catch (error) {
    console.log("[SUBCATEGORY_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subCategoryId: string } }
) {
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

    if (!params.subCategoryId) {
      return new NextResponse("SubCategory id is required", { status: 400 })
    }

    const subCategory = await db.subCategory.updateMany({
      where: { id: params.subCategoryId },
      data: { name },
    })

    return NextResponse.json(subCategory)
  } catch (error) {
    console.log("[SUBCATEGORY_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
