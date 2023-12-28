import db from "@/lib/db"

import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { ModeToggle } from "./mode-toogle"
import { UserAvatar } from "./user-avatar"
import { getAuthSession } from "@/lib/auth"

export const Navbar = async () => {
  const session = await getAuthSession()

  if (!session) return null

  const user = await db.user.findFirst({
    where: { email: session.user?.email! },
    select: { fname: true, lname: true },
  })

  return (
    <div className="border-b">
      <div className="flex h-16 justify-between items-center px-4">
        <aside className="block lg:hidden">
          <MobileNav />
        </aside>
        <MainNav />
        <aside className="flex items-center space-x-3">
          <ModeToggle />
          <UserAvatar name={user?.fname! + " " + user?.lname!} />
        </aside>
      </div>
    </div>
  )
}
