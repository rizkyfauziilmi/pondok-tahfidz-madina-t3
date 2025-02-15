import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-4 w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}