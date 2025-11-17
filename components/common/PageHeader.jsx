"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import ProfileAvatar from "./Profile";

export default function PageHeader({ title }) {
  return (
    <header className="flex w-full justify-between items-center gap-2 border-b px-4 py-3 lg:px-6 bg-white">
      <h1 className="text-lg font-semibold text-[#111827]">{title}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <ProfileAvatar src="https://github.com/shadcn.png" name="RA" />
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
