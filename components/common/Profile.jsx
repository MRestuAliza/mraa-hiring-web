"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Profile({ src, name }) {
  return (
    <Avatar className="h-9 w-9 border border-[#E5E7EB]">
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="bg-[#111827] text-white text-sm">
        {name}
      </AvatarFallback>
    </Avatar>
  );
}
