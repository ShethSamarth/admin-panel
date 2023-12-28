"use client"

import { useRouter } from "next/navigation"

import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"

import { DataTable } from "./data-table"
import { CustomerColumn, columns } from "./columns"

interface CustomerClientProps {
  customers: CustomerColumn[]
}

export const CustomerClient: React.FC<CustomerClientProps> = ({
  customers,
}) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Customers (${customers.length})`}
          description="Manage customers for your store"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={customers} searchKey="fname" />
    </>
  )
}
