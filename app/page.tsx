"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <header className="flex w-full h-14 items-center gap-2 border-b px-4 lg:px-6 bg-white">
        <h1 className="text-lg font-semibold">Hiring System</h1>

        <div className="ml-auto flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="text-sm font-medium text-gray-700"
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            asChild
            className="bg-[#3a969f] text-white hover:bg-[#2e7d83] text-sm font-medium"
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Welcome to the Hiring Management Platform
        </h2>

        <p className="text-gray-600 max-w-xl mb-8 text-sm md:text-base">
          A smart and efficient way to manage job openings and candidate applications.
        </p>

        <div className="flex gap-3 mt-4">
          <Button
            asChild
            className="w-[120px] bg-[#3a969f] text-white hover:bg-[#2e7d83]"
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-[120px] border-[#3a969f] text-[#3a969f] hover:bg-[#e6f9fa]"
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </main>

    </div>
  );
}
