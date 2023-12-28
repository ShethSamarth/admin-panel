import { format } from "date-fns"
import { notFound } from "next/navigation"

import db from "@/lib/db"

import { SubSubCategoryClient } from "./_components/client"
import { SubSubCategoryColumn } from "./_components/columns"

interface SubSubCategoryProps {
  params: { categoryId: string; subCategoryId: string }
}

const SubCategories = async ({ params }: SubSubCategoryProps) => {
  const category = await db.category.findUnique({
    where: { id: params.categoryId },
  })

  if (!category) {
    notFound()
  }

  const subCategory = await db.subCategory.findFirst({
    where: { id: params.subCategoryId },
  })

  if (!subCategory) {
    notFound()
  }

  const subSubCategories = await db.subSubCategory.findMany({
    where: { subcategoryId: subCategory?.id },
    orderBy: { createdAt: "asc" },
  })

  const formattedSubSubCategories: SubSubCategoryColumn[] =
    subSubCategories.map((item) => ({
      id: item.id,
      name: item.name,
      category,
      subCategory,
      createdAt: format(item.createdAt, "dd/MM/yyyy"),
    }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubSubCategoryClient
          data={formattedSubSubCategories}
          category={category}
          subCategory={subCategory}
        />
      </div>
    </div>
  )
}

export default SubCategories
