import { format } from "date-fns"
import { notFound } from "next/navigation"

import db from "@/lib/db"

import { SubCategoryClient } from "./_components/client"
import { SubCategoryColumn } from "./_components/columns"

interface SubCategoryProps {
  params: { categoryId: string }
}

const SubCategories = async ({ params }: SubCategoryProps) => {
  const category = await db.category.findFirst({
    where: { id: params.categoryId },
  })

  if (!category) {
    notFound()
  }

  const subCategories = await db.subCategory.findMany({
    where: { categoryId: params.categoryId },
    orderBy: { createdAt: "asc" },
  })

  const formattedSubCategories: SubCategoryColumn[] = subCategories.map(
    (item) => ({
      id: item.id,
      name: item.name,
      category,
      createdAt: format(item.createdAt, "dd/MM/yyyy"),
    })
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoryClient data={formattedSubCategories} category={category} />
      </div>
    </div>
  )
}

export default SubCategories
