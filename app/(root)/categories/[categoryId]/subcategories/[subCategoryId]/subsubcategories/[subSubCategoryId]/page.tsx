import { notFound } from "next/navigation"

import db from "@/lib/db"

import { SubSubCategoryForm } from "./_components/subsubcategory-form"

interface SubSubCategoryIdProps {
  params: {
    categoryId: string
    subCategoryId: string
    subSubCategoryId: string
  }
}

const SubSubCategory = async ({ params }: SubSubCategoryIdProps) => {
  const category = await db.category.findUnique({
    where: { id: params.categoryId },
  })

  const subCategory = await db.subCategory.findUnique({
    where: { id: params.subCategoryId },
  })

  const subSubCategory = await db.subSubCategory.findUnique({
    where: { id: params.subSubCategoryId },
  })

  if (params.subSubCategoryId !== "new" && !subSubCategory) {
    notFound()
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubSubCategoryForm
          initialData={subSubCategory}
          category={category}
          subCategory={subCategory}
        />
      </div>
    </div>
  )
}

export default SubSubCategory
