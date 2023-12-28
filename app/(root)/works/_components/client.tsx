"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Separator } from "@/components/ui/separator"

import { WorkColumn, columns } from "./columns"

interface WorkClientProps {
  data: WorkColumn[]
}

export const WorkClient: React.FC<WorkClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Works (${data.length})`}
          description="Manage works for your store"
        />
        <Button onClick={() => router.push("/works/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  )
}
