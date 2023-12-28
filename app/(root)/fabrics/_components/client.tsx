"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Separator } from "@/components/ui/separator"

import { FabricColumn, columns } from "./columns"

interface FabricClientProps {
  data: FabricColumn[]
}

export const FabricClient: React.FC<FabricClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Fabrics (${data.length})`}
          description="Manage fabrics for your store"
        />
        <Button onClick={() => router.push("/fabrics/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  )
}
