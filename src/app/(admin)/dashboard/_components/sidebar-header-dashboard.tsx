"use client";

import Image from "next/image"
import Link from "next/link";
import { SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "~/components/ui/sidebar"
import { cn } from "~/lib/utils"

export const SidebarHeaderDashboard = () => {
    const {
        state,
    } = useSidebar()
    const isCollapsed = state === "collapsed"

    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/">
                        <div className="flex items-center gap-2 hover:bg-muted hover:text-foreground p-2 rounded">
                            <Image
                                src="/images/logo.png"
                                alt="logo"
                                width={50}
                                height={50}
                            />
                            <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", isCollapsed && "hidden")}>
                                Pondok Tahfidz Madina
                            </h4>
                        </div>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}