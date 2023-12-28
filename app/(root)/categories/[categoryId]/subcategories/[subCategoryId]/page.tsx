import { notFound } from "next/navigation"

import db from "@/lib/db"

import { SubCategoryForm } from "./_components/subcategory-form"

interface SubCategoryIdProps {
  params: { categoryId: string; subCategoryId: string }
}

const SubCategory = async ({ params }: SubCategoryIdProps) => {
  const category = await db.category.findUnique({
    where: { id: params.categoryId },
  })

  const subCategory = await db.subCategory.findUnique({
    where: { id: params.subCategoryId },
  })

  if (params.subCategoryId !== "new" && !subCategory) {
    notFound()
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoryForm initialData={subCategory} category={category} />
      </div>
    </div>
  )
}

export default SubCategory
