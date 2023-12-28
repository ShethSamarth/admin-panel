import { notFound } from "next/navigation"

import db from "@/lib/db"

import { WorkForm } from "./_components/work-form"

interface WorkIdProps {
  params: { workId: string }
}

const WorkId = async ({ params }: WorkIdProps) => {
  const work = await db.work.findUnique({
    where: { id: params.workId },
  })

  if (params.workId !== "new" && !work) {
    notFound()
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WorkForm initialData={work} />
      </div>
    </div>
  )
}

export default WorkId
