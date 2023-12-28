import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    const color = await db.color.findUnique({
      where: { id: params.colorId },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const user = getAuthSession()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    const color = await db.color.deleteMany({
      where: { id: params.colorId },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string } }
) {
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

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 })
    }

    const color = await db.color.updateMany({
      where: { id: params.colorId },
      data: { name, code },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
