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

    const work = await db.work.create({
      data: { name },
    })

    return NextResponse.json(work)
  } catch (error) {
    console.log("[WORKS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const works = await db.work.findMany()

    return NextResponse.json(works)
  } catch (error) {
    console.log("[WORKS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
