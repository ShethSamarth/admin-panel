import { format } from "date-fns"

import db from "@/lib/db"

import { OccasionClient } from "./_components/client"
import { OccasionColumn } from "./_components/columns"

const Occasions = async () => {
  const occasions = await db.occasion.findMany({
    orderBy: { createdAt: "desc" },
  })

  const formattedOccasions: OccasionColumn[] = occasions.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OccasionClient data={formattedOccasions} />
      </div>
    </div>
  )
}

export default Occasions
