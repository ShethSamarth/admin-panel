import { notFound } from "next/navigation"

import db from "@/lib/db"

import { CategoryForm } from "./_components/category-form"

interface CategoryIdProps {
  params: { categoryId: string }
}

const CategoryId = async ({ params }: CategoryIdProps) => {
  const category = await db.category.findUnique({
    where: { id: params.categoryId },
  })

  if (params.categoryId !== "new" && !category) {
    notFound()
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  )
}

export default CategoryId
