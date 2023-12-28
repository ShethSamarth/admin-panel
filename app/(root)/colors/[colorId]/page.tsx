import { notFound } from "next/navigation"

import db from "@/lib/db"

import { ColorForm } from "./_components/color-form"

interface ColorIdProps {
  params: { colorId: string }
}

const ColorId = async ({ params }: ColorIdProps) => {
  const color = await db.color.findUnique({
    where: { id: params.colorId },
  })

  if (params.colorId !== "new" && !color) {
    notFound()
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default ColorId
