"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CreateJobsCard({ onCreateJob }) {
  return (
    <Card className="relative w-full max-w-sm h-[180px] sm:h-[190px] overflow-hidden rounded-2xl border-none shadow-md">
      <Image
        src="/recruit-bg.jpg"
        alt="Recruit the best candidates"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <CardContent className="relative flex h-full flex-col justify-between p-4 sm:p-6 text-white">
        <div>
          <h3 className="text-lg font-bold">Recruit the best candidates</h3>
          <p className="text-sm">Create jobs, invite, and hire with ease</p>
        </div>
        <Button
          type="button"
          onClick={onCreateJob}
          className="w-full bg-[#3a969f] hover:bg-[#2d777f] text-white"
        >
          Create a new job
        </Button>
      </CardContent>
    </Card>
  );
}