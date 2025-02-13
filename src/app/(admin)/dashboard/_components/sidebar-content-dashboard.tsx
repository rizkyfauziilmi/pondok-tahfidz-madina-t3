"use client";

import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "~/components/ui/sidebar"

import { Activity, BookUser, Clapperboard, Fingerprint, Newspaper, PenLine, UserCog, UsersRound } from "lucide-react"
import { usePathname } from "next/navigation";


const dashboardMenuItems = [
    {
        title: "Statistik Konten",
        url: undefined,
        icon: Clapperboard,
    },
    {
        title: "Statistik Pengunjung",
        url: "visitors",
        icon: UsersRound,
    },
    {
        title: "Ringakasan Aktivitas",
        url: "activity-overview",
        icon: Activity,
    },
]

const contentMenuItems = [
    {
        title: "Daftar Artikel",
        url: "articles",
        icon: Newspaper,
    },
    {
        title: "Tambah Artikel",
        url: "articles/new",
        icon: PenLine,
    },
]

const usersMenuItems = [
    {
        title: "Daftar Pengguna",
        url: "users",
        icon: BookUser,
    },
    {
        title: "Hak Akses Pengguna",
        url: "roles",
        icon: Fingerprint,
    },
    {
        title: "Aktivitas Pengguna",
        url: "user-activity",
        icon: UserCog,
    }
]

export const SidebarContentDashboard = () => {
    const pathname = usePathname();

    const path = pathname.split("/")[2]

    const urlToHref = (url?: string): string => {
        if (!url) {
            return '/dashboard';
        }

        const isNotDashboard = url.includes("/");
        if (isNotDashboard) {
            return `/${url}`;
        } else {
            return `/dashboard/${url}`;
        }
    }

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Dashboard Utama
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {dashboardMenuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={path === item.url}>
                                    <a href={urlToHref(item.url)}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Manajemen Konten
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {contentMenuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={path === item.url}>
                                    <a href={urlToHref(item.url)}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Manajemen Pengguna
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {usersMenuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={path === item.url}>
                                    <a href={urlToHref(item.url)}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}