import { format } from "date-fns"

import db from "@/lib/db"

import { ColorClient } from "./_components/client"
import { ColorColumn } from "./_components/columns"

const Colors = async () => {
  const colors = await db.color.findMany({
    orderBy: { createdAt: "desc" },
  })

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  )
}

export default Colors
