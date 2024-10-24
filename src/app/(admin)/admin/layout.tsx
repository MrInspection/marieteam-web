import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AdminSidebar} from "@/components/admin-sidebar";
import type {Metadata} from "next";
import {auth} from "@/auth/auth";
import NotFound from "@/app/not-found";
import {prisma} from "@/lib/db";

export const metadata: Metadata = {
    title: "Administration • MarieTeam",
    description: "Spectron Labs",
};

export default async function Layout({ children }: { children: React.ReactNode }) {

    const session = await auth();
    const user = session?.user;

    if (!user) {
        return NotFound();
    }

    const isAdmin = await prisma.user.findUnique({
        where: {
            id: user.id,
            role: "ADMIN"
        },
    });

    if (!isAdmin) {
        return NotFound();
    }

    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset className="border">
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        {/*<Separator orientation="vertical" className="mr-2 h-4" />
                        MarieTeam Administrator*/}
                    </div>
                </header>
                <main className="container mb-16">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
