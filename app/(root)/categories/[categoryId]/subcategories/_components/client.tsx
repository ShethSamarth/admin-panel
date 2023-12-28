"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Category } from "@prisma/client"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Separator } from "@/components/ui/separator"

import { SubCategoryColumn, columns } from "./columns"

interface CategoryClientProps {
  data: SubCategoryColumn[]
  category: Category
}

export const SubCategoryClient: React.FC<CategoryClientProps> = ({
  data,
  category,
}) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Subcategories (${data.length})`}
          description={`Manage subcategories for ${category.name}`}
        />
        <Button
          onClick={() =>
            router.push(`/categories/${category.id}/subcategories/new`)
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
