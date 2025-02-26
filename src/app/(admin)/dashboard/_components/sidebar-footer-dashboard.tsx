"use client";

import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "~/components/ui/dropdown-menu"
import { ChevronUp, DoorOpen, Monitor, Moon, Sun } from "lucide-react"
import { SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "~/components/ui/sidebar"
import { nameToFallback } from "~/lib/string"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes";
import { cn } from "~/lib/utils";

export const SidebarFooterDashboard = () => {
  const { data: session } = useSession();
  const {
    open,
  } = useSidebar();
  const { setTheme, theme: currentTheme } = useTheme();

  const themeIconMap = {
    'dark': <Moon />,
    'light': <Sun />,
    'system': <Monitor />,
  }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Avatar className={cn(open ? "size-8" : "size-4")}>
                  <AvatarImage src={session?.user.image ?? "https://avatar.iran.liara.run/public"} />
                  <AvatarFallback>
                    {nameToFallback(session?.user.name ?? "Anonymous")}
                  </AvatarFallback>
                </Avatar>
                <span>{session?.user.name}</span>
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => signOut()}>
                  <DoorOpen className="mr-2 size-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <DropdownMenuItem className="p-0">
                      {
                        themeIconMap[
                        currentTheme as "dark" | "light" | "system"
                        ]
                      }
                      Ganti Tema
                    </DropdownMenuItem>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onSelect={() => setTheme("light")}>
                        <Sun className="mr-2 size-4" />
                        Terang
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setTheme("dark")}>
                        <Moon className="mr-2 size-4" />
                        Gelap
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setTheme("system")}>
                        <Monitor className="mr-2 size-4" />
                        Sistem
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}