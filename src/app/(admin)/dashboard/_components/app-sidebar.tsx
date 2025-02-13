"use client";

import { Sidebar } from "~/components/ui/sidebar";
import { SidebarFooterDashboard } from "./sidebar-footer-dashboard";
import { SidebarHeaderDashboard } from "./sidebar-header-dashboard";
import { SidebarContentDashboard } from "./sidebar-content-dashboard";

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeaderDashboard />
            <SidebarContentDashboard />
            <SidebarFooterDashboard />
        </Sidebar>
    )
}
