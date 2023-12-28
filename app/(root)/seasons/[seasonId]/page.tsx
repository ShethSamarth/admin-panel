import { notFound } from "next/navigation"

import db from "@/lib/db"

import { SeasonForm } from "./_components/season-form"

interface SeasonIdProps {
  params: { seasonId: string }
}

const SeasonId = async ({ params }: SeasonIdProps) => {
  const season = await db.season.findUnique({
    where: { id: params.seasonId },
  })

  if (params.seasonId !== "new" && !season) {
    notFound()
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SeasonForm initialData={season} />
      </div>
    </div>
  )
}

export default SeasonId
