"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heart, Home, MessageCircle, Star, Video, Calendar } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

const routes = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Daycares",
    path: "/daycares",
    icon: Heart,
  },

  {
    name: "Activity Reports",
    path: "/activity-reports",
    icon: Star,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: MessageCircle,
  },
  {
    name: "CCTV Monitoring",
    path: "/cctv",
    icon: Video,
  },
  {
    name: "My Bookings",
    path: "/bookings",
    icon: Calendar,
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
      <div className="flex items-center gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">TinyCareHub</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
              <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.path ? "text-primary" : "text-muted-foreground",
                  )}
              >
                {route.name}
              </Link>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <span className="text-xl font-bold">TinyCareHub</span>
            </Link>
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                  <Link
                      key={route.path}
                      href={route.path}
                      className={cn(
                          "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                          pathname === route.path ? "text-primary" : "text-muted-foreground",
                      )}
                      onClick={() => setOpen(false)}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.name}
                  </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
  )
}
