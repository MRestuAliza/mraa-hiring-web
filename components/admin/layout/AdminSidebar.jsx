"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  useSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, BriefcaseBusiness } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Joblist List", href: "/admin/jobs", icon: BriefcaseBusiness },
  { label: "Dashboard", href: "/admin/dashboard", icon: Home },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="relative border-r bg-white">
      <SidebarTrigger
        className="
          absolute -right-4 top-6 z-50 flex h-6 w-6 items-center justify-center
          rounded-full border bg-white shadow
        "
      />

      <SidebarHeader>
        <div
          className={`flex items-center gap-3 pt-6 pb-4 transition-all ${
            isCollapsed ? "px-0 justify-center" : "px-4"
          }`}
        >
          {isCollapsed ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl ">
              <Image
                src="/logo-rakamin.svg"
                alt="Rakamin Icon"
                width={30}
                height={30}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <Image
                src="/rakamin-logo.svg"
                alt="Rakamin Logo"
                width={120}
                height={40}
              />
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
                    ${
                      active
                        ? "text-[#04959f] hover:bg-[#f3fafa]"
                        : "text-slate-600 hover:bg-[#f3fafa]"
                    }
                  `}
                >
                  <div
                    className={`
                      flex h-8 w-8 items-center justify-center
                      ${
                        active
                          ? "text-[#04959f"
                          : "border-slate-200 bg-white text-slate-600"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="font-medium group-data-[collapsible=icon]:hidden">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
