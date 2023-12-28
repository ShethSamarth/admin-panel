import { format } from "date-fns"

import db from "@/lib/db"

import { CategoryClient } from "./_components/client"
import { CategoryColumn } from "./_components/columns"

const Categories = async () => {
  const categories = await db.category.findMany({
    orderBy: { createdAt: "desc" },
  })

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  )
}

export default Categories
