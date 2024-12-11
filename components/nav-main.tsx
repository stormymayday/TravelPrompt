"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
    Collapsible,
    // CollapsibleContent,
    // CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    // SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    // SidebarMenuItem,
    // SidebarMenuSub,
    // SidebarMenuSubButton,
    // SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <Link key={item.title} href={item.url}>
                        <Collapsible>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </Collapsible>
                    </Link>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
