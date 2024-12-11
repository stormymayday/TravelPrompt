"use client";

import { type LucideIcon } from "lucide-react";
// import Link from "next/link";
import { useRouter } from "next/navigation";

// import // Collapsible,
// // CollapsibleContent,
// // CollapsibleTrigger,
// "@/components/ui/collapsible";
import {
    SidebarGroup,
    // SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
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
    const router = useRouter();
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {/* <Link href={item.url}> */}
                        <SidebarMenuButton
                            onClick={() => {
                                router.push(item.url);
                            }}
                            tooltip={item.title}
                        >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </SidebarMenuButton>
                        {/* </Link> */}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
