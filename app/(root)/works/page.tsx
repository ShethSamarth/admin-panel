import { format } from "date-fns"

import db from "@/lib/db"

import { WorkClient } from "./_components/client"
import { WorkColumn } from "./_components/columns"

const Works = async () => {
  const works = await db.work.findMany({
    orderBy: { createdAt: "desc" },
  })

  const formattedWorks: WorkColumn[] = works.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WorkClient data={formattedWorks} />
      </div>
    </div>
  )
}

export default Works
