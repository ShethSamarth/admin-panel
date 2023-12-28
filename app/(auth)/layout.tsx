import { redirect } from "next/navigation"

import { getAuthSession } from "@/lib/auth"

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getAuthSession()

  if (user) redirect("/")

  return (
    <main className="flex items-center justify-center h-full">{children}</main>
  )
}

export default AuthLayout
