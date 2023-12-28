import { format } from "date-fns"

import db from "@/lib/db"

import { FabricClient } from "./_components/client"
import { FabricColumn } from "./_components/columns"

const Fabrics = async () => {
  const fabrics = await db.fabric.findMany({
    orderBy: { createdAt: "desc" },
  })

  const formattedFabrics: FabricColumn[] = fabrics.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FabricClient data={formattedFabrics} />
      </div>
    </div>
  )
}

export default Fabrics
