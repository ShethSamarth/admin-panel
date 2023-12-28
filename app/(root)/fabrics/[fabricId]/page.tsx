import { notFound } from "next/navigation"

import db from "@/lib/db"

import { FabricForm } from "./_components/fabric-form"

interface FabricIdProps {
  params: { fabricId: string }
}

const FabricId = async ({ params }: FabricIdProps) => {
  const fabric = await db.fabric.findUnique({
    where: { id: params.fabricId },
  })

  if (params.fabricId !== "new" && !fabric) {
    notFound()
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FabricForm initialData={fabric} />
      </div>
    </div>
  )
}

export default FabricId
