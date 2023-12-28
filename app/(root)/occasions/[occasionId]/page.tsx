import { notFound } from "next/navigation"

import db from "@/lib/db"

import { OccasionForm } from "./_components/occasion-form"

interface OccasionIdProps {
  params: { occasionId: string }
}

const OccasionId = async ({ params }: OccasionIdProps) => {
  const occasion = await db.occasion.findUnique({
    where: { id: params.occasionId },
  })

  if (params.occasionId !== "new" && !occasion) {
    notFound()
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OccasionForm initialData={occasion} />
      </div>
    </div>
  )
}

export default OccasionId
