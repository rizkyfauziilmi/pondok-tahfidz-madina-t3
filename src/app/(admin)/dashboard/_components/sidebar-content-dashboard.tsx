"use client";

import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "~/components/ui/sidebar"

import {
    Activity,
    BookCopy,
    BookUser,
    Clapperboard,
    Fingerprint,
    Newspaper,
    PenLine,
    UserCog,
    UsersRound
} from "lucide-react"
import { usePathname } from "next/navigation";
import Link from "next/link";


const dashboardMenuItems = [
    {
        title: "Statistik Konten",
        url: "/dashboard",
        icon: Clapperboard,
    },
    {
        title: "Statistik Pengunjung",
        url: "/dashboard/visitors",
        icon: UsersRound,
    },
    {
        title: "Ringakasan Aktivitas",
        url: "/dashboard/activity-overview",
        icon: Activity,
    },
]

const contentMenuItems = [
    {
        title: "Daftar Artikel",
        url: "/dashboard/articles",
        icon: Newspaper,
    },
    {
        title: "Lihat Kumpulan Artikel",
        url: "/articles",
        icon: BookCopy,
    },
    {
        title: "Tambah Artikel",
        url: "/articles/new",
        icon: PenLine,
    },
]

const usersMenuItems = [
    {
        title: "Daftar Pengguna",
        url: "/dashboard/users",
        icon: BookUser,
    },
    {
        title: "Hak Akses Pengguna",
        url: "/dashboard/roles",
        icon: Fingerprint,
    },
    {
        title: "Aktivitas Pengguna",
        url: "/dashboard/user-activity",
        icon: UserCog,
    }
]

export const SidebarContentDashboard = () => {
    const pathname = usePathname();

    const path = pathname.split("/")[2];

    const isActiveUrl = (url: string) => {
        // if url not start with dashboard, return false
        if (!url.startsWith("/dashboard")) {
            return false;
        }

        const urlPath = url.split("/")[2];

        return path === urlPath;
    }

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Dashboard Utama
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {dashboardMenuItems.map((item) => {
                            const isActive = isActiveUrl(item.url);

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Manajemen Konten
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {contentMenuItems.map((item) => {
                            const isActive = isActiveUrl(item.url);

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Manajemen Pengguna
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {usersMenuItems.map((item) => {
                            const isActive = isActiveUrl(item.url);

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}