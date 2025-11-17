"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import ProfileAvatar from "../../common/Profile";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function PageHeaderCandidate() {
  return (
    <header className="flex w-full items-center justify-between gap-2 border-b px-4 py-3 lg:px-6 bg-white">
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/admin/jobs"
                  className="inline-flex items-center rounded-lg border border-[#C2C2C2] bg-white px-3 py-1.5 text-xs md:text-sm font-bold text-[#1D1F20]"
                >
                  Job list
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="mx-1" />

            <BreadcrumbItem>
              <BreadcrumbPage className="inline-flex items-center rounded-lg border border-[#C2C2C2] bg-[#EDEDED] px-3 py-1.5 text-xs md:text-sm font-bold text-[#1D1F20]">
                Manage Candidate
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <ProfileAvatar
            src="https://github.com/shadcn.png"
            name="RA"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="cursor-pointer text-red-600"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
