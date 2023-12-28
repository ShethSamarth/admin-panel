import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { seasonId: string } }
) {
  try {
    if (!params.seasonId) {
      return new NextResponse("Season id is required", { status: 400 })
    }

    const season = await db.season.findUnique({
      where: { id: params.seasonId },
    })

    return NextResponse.json(season)
  } catch (error) {
    console.log("[SEASON_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { seasonId: string } }
) {
  try {
    const user = getAuthSession()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.seasonId) {
      return new NextResponse("Season id is required", { status: 400 })
    }

    const season = await db.season.deleteMany({
      where: { id: params.seasonId },
    })

    return NextResponse.json(season)
  } catch (error) {
    console.log("[SEASON_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { seasonId: string } }
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

    if (!params.seasonId) {
      return new NextResponse("Season id is required", { status: 400 })
    }

    const season = await db.season.updateMany({
      where: { id: params.seasonId },
      data: { name },
    })

    return NextResponse.json(season)
  } catch (error) {
    console.log("[SEASON_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
