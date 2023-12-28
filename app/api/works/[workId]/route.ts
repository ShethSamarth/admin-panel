import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { workId: string } }
) {
  try {
    if (!params.workId) {
      return new NextResponse("Work id is required", { status: 400 })
    }

    const work = await db.work.findUnique({
      where: { id: params.workId },
    })

    return NextResponse.json(work)
  } catch (error) {
    console.log("[WORK_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { workId: string } }
) {
  try {
    const user = getAuthSession()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.workId) {
      return new NextResponse("Work id is required", { status: 400 })
    }

    const work = await db.work.deleteMany({
      where: { id: params.workId },
    })

    return NextResponse.json(work)
  } catch (error) {
    console.log("[WORK_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { workId: string } }
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

    if (!params.workId) {
      return new NextResponse("Work id is required", { status: 400 })
    }

    const work = await db.work.updateMany({
      where: { id: params.workId },
      data: { name },
    })

    return NextResponse.json(work)
  } catch (error) {
    console.log("[WORK_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
