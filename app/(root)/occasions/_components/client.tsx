"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Separator } from "@/components/ui/separator"

import { OccasionColumn, columns } from "./columns"

interface OccasionClientProps {
  data: OccasionColumn[]
}

export const OccasionClient: React.FC<OccasionClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Occasions (${data.length})`}
          description="Manage occasions for your store"
        />
        <Button onClick={() => router.push("/occasions/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  )
}
