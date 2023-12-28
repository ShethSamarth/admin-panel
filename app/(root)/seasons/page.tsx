import { format } from "date-fns"

import db from "@/lib/db"

import { SeasonClient } from "./_components/client"
import { SeasonColumn } from "./_components/columns"

const Seasons = async () => {
  const seasons = await db.season.findMany({
    orderBy: { createdAt: "desc" },
  })

  const formattedSeasons: SeasonColumn[] = seasons.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SeasonClient data={formattedSeasons} />
      </div>
    </div>
  )
}

export default Seasons
