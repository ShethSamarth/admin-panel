import { redirect } from "next/navigation"

import { getAuthSession } from "@/lib/auth"

import { Navbar } from "./_components/navbar"

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAuthSession()

  if (!user || !user.user?.email) redirect("/sign-in")

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
