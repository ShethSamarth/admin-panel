"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LockKeyhole, LogOut } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface UserAvatarProps {
  name: string
}

export const UserAvatar = ({ name }: UserAvatarProps) => {
  const router = useRouter()

  const fallback = name.split(" ")[0][0] + name.split(" ")[1][0]

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => router.push("/change-password")}
        >
          <LockKeyhole className="h-5 w-5 mr-2" /> Change Password
        </Button>
        <Separator />
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5 mr-2" /> Sign Out
        </Button>
      </PopoverContent>
    </Popover>
  )
}
