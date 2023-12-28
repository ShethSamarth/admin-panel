import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { subSubCategoryId: string } }
) {
  try {
    if (!params.subSubCategoryId) {
      return new NextResponse("Subsubcategory id is required", { status: 400 })
    }

    const subSubCategory = await db.subSubCategory.findUnique({
      where: { id: params.subSubCategoryId },
    })

    return NextResponse.json(subSubCategory)
  } catch (error) {
    console.log("[SUBSUBCATEGORY_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { subSubCategoryId: string } }
) {
  try {
    const user = getAuthSession()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.subSubCategoryId) {
      return new NextResponse("SubCategory id is required", { status: 400 })
    }

    const subSubCategory = await db.subSubCategory.deleteMany({
      where: { id: params.subSubCategoryId },
    })

    return NextResponse.json(subSubCategory)
  } catch (error) {
    console.log("[SUBCATEGORY_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subSubCategoryId: string } }
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

    if (!params.subSubCategoryId) {
      return new NextResponse("SubCategory id is required", { status: 400 })
    }

    const subSubCategory = await db.subSubCategory.updateMany({
      where: { id: params.subSubCategoryId },
      data: { name },
    })

    return NextResponse.json(subSubCategory)
  } catch (error) {
    console.log("[SUBSUBCATEGORY_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
