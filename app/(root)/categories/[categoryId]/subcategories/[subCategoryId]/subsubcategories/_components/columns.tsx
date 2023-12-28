"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Category, SubCategory } from "@prisma/client"

import { CellAction } from "./cell-action"

export type SubSubCategoryColumn = {
  id: string
  name: string
  category: Category
  subCategory: SubCategory
  createdAt: string
}

export const columns: ColumnDef<SubSubCategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Subcategory",
  },
  {
    accessorKey: "subCategory.name",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
