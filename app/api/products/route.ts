import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function POST(req: Request) {
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

    const product = await db.product.create({
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
    console.log("[PRODUCTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const products = await db.product.findMany()

    return NextResponse.json(products)
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
