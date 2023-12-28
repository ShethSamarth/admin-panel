"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Separator } from "@/components/ui/separator"
import { Category, SubCategory } from "@prisma/client"

import { SubSubCategoryColumn, columns } from "./columns"

interface CategoryClientProps {
  data: SubSubCategoryColumn[]
  category: Category
  subCategory: SubCategory
}

export const SubSubCategoryClient: React.FC<CategoryClientProps> = ({
  data,
  category,
  subCategory,
}) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Subcategories (${data.length})`}
          description={`Manage subcategories for ${subCategory.name}`}
        />
        <Button
          onClick={() =>
            router.push(
              `/categories/${category.id}/subcategories/${subCategory.id}/subsubcategories/new`
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  )
}
