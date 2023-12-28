import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { fabricId: string } }
) {
  try {
    if (!params.fabricId) {
      return new NextResponse("Fabric id is required", { status: 400 })
    }

    const fabric = await db.fabric.findUnique({
      where: { id: params.fabricId },
    })

    return NextResponse.json(fabric)
  } catch (error) {
    console.log("[FABRIC_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { fabricId: string } }
) {
  try {
    const user = getAuthSession()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.fabricId) {
      return new NextResponse("Fabric id is required", { status: 400 })
    }

    const fabric = await db.fabric.deleteMany({
      where: { id: params.fabricId },
    })

    return NextResponse.json(fabric)
  } catch (error) {
    console.log("[FABRIC_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { fabricId: string } }
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

    if (!params.fabricId) {
      return new NextResponse("Fabric id is required", { status: 400 })
    }

    const fabric = await db.fabric.updateMany({
      where: { id: params.fabricId },
      data: { name },
    })

    return NextResponse.json(fabric)
  } catch (error) {
    console.log("[FABRIC_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
