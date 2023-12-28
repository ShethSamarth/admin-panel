import { NextResponse } from "next/server"

import db from "@/lib/db"
import { getAuthSession } from "@/lib/auth"

export async function POST(req: Request) {
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

    const season = await db.season.create({
      data: { name },
    })

    return NextResponse.json(season)
  } catch (error) {
    console.log("[SEASONS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const seasons = await db.season.findMany()

    return NextResponse.json(seasons)
  } catch (error) {
    console.log("[SEASONS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
