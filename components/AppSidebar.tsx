'use client';

import Link from 'next/link';
import { LayoutDashboard, LineChart } from 'lucide-react';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      isActive: pathname === '/',
    },
    {
      title: 'Markets',
      href: '/markets',
      icon: LineChart,
      isActive: pathname === '/markets',
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        {/* <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader> */}

        <SidebarGroup>
          <SidebarGroupLabel>MARKETS</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="text-xs text-sidebar-foreground/70 px-2 py-4">
          Crypto markets demo dashboard
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
