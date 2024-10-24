import {
    Anchor,
    DollarSign, HeartHandshake,
    Home, RockingChair, Route,
    Ship,
    Users
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import UserDropdown from "@/features/auth/user-dropdown";

const navigation = {
    general: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: Home,
        },
        {
            title: "Manage Users",
            url: "/admin/users",
            icon: Users,
        },
        {
            title: "Help & Support",
            url: "/admin/support",
            icon: HeartHandshake,
        }
    ],
    products: [
        {
            title: "Routes",
            url: "#",
            icon: Route,
        },
        {
            title: "Seats",
            url: "#",
            icon: RockingChair,
        },
        {
            title: "Pricing",
            url: "#",
            icon: DollarSign,
        },
        {
            title: "Fleet",
            url: "#",
            icon: Ship,
        },
        {
            title: "Crossings",
            url: "#",
            icon: Anchor,
        },
    ],
}

export function AdminSidebar() {
    return (
        <Sidebar variant={"inset"}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center justify-between">
                        <SidebarMenuButton size="lg" asChild className="w-fit">
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Anchor className="size-4 rotate-45" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">MarieTeam</span>
                                    <span className="truncate text-xs text-muted-foreground">Administration</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                        <UserDropdown />
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>General</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.general.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
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
                    <SidebarGroupLabel>Products</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.products.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
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
        </Sidebar>
    )
}
