import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 })
    }

    const product = await db.product.findUnique({
      where: { id: params.productId },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = getAuthSession()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 })
    }

    const product = await db.product.deleteMany({
      where: { id: params.productId },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = getAuthSession()

    const body = await req.json()

    const {
      name,
      code,
      image,
      description,
      colorGroup,
      marketPrice,
      discount,
      offerPrice,
      vendorPrice,
      weight,
      shippingType,
      productRatings,
      categoryId,
      subCategoryId,
      subSubCategoryId,
      workId,
      fabricId,
      occasionId,
      seasonId,
      colorId,
    } = body

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (
      !name ||
      !code ||
      !marketPrice ||
      !discount ||
      !offerPrice ||
      !shippingType ||
      !productRatings
    ) {
      return new NextResponse("Parameters missing", { status: 400 })
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 })
    }

    const product = await db.product.updateMany({
      where: { id: params.productId },
      data: {
        name,
        code,
        image,
        description,
        colorGroup,
        marketPrice,
        discount,
        offerPrice,
        vendorPrice,
        weight,
        shippingType,
        productRatings,
        categoryId,
        subCategoryId,
        subSubCategoryId,
        workId,
        fabricId,
        occasionId,
        seasonId,
        colorId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
