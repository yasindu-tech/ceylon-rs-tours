import type { Metadata } from "next"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/app-sidebar"

export const metadata: Metadata = { robots: { index: false, follow: false } }

// Always request-specific (live session + live DB data) — never prerender or cache this section.
export const dynamic = "force-dynamic"

// Owner mostly uses this on a phone, so start collapsed and let them open it via the trigger.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Admin</span>
        </header>
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
