import path from "path"
import { writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const file = formData.get("image") as File

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = Date.now() + file.name.slice(-5)

  try {
    await writeFile(
      path.join(process.cwd(), "public/products/" + filename),
      buffer
    )
    return NextResponse.json({ message: "Success", status: 200, filename })
  } catch (error) {
    console.log("Error occured ", error)
    return NextResponse.json("Internal error", { status: 500 })
  }
}
