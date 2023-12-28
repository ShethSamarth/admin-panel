"use client"

import { Category } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type SubCategoryColumn = {
  id: string
  name: string
  category: Category
  createdAt: string
}

export const columns: ColumnDef<SubCategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Subcategory",
  },
  {
    accessorKey: "category.name",
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
