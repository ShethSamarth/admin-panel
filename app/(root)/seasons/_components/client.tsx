"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Separator } from "@/components/ui/separator"

import { SeasonColumn, columns } from "./columns"

interface SeasonClientProps {
  data: SeasonColumn[]
}

export const SeasonClient: React.FC<SeasonClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Seasons (${data.length})`}
          description="Manage seasons for your store"
        />
        <Button onClick={() => router.push("/seasons/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  )
}
