"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

import { routes } from "./routes"

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="mr-3">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Kekee Admin Panel</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-3 my-10">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-center p-3 border-b hover:text-[#3366CC] hover:scale-110 transition ease-in-out"
            >
              {route.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
