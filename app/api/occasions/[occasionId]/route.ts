import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { occasionId: string } }
) {
  try {
    if (!params.occasionId) {
      return new NextResponse("Occasion id is required", { status: 400 })
    }

    const occasion = await db.occasion.findUnique({
      where: { id: params.occasionId },
    })

    return NextResponse.json(occasion)
  } catch (error) {
    console.log("[OCCASION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { occasionId: string } }
) {
  try {
    const user = getAuthSession()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.occasionId) {
      return new NextResponse("Occasion id is required", { status: 400 })
    }

    const occasion = await db.occasion.deleteMany({
      where: { id: params.occasionId },
    })

    return NextResponse.json(occasion)
  } catch (error) {
    console.log("[OCCASION_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { occasionId: string } }
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

    if (!params.occasionId) {
      return new NextResponse("Occasion id is required", { status: 400 })
    }

    const occasion = await db.occasion.updateMany({
      where: { id: params.occasionId },
      data: { name },
    })

    return NextResponse.json(occasion)
  } catch (error) {
    console.log("[OCCASION_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
