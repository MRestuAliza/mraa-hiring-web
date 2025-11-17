"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";

export default function ResumeSent() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-[606px]">
        <Image
          src="/succes-apply.svg" // pastikan nama filenya sama
          alt="Application sent"
          width={320}
          height={260}
          className="mb-6 w-full max-w-[320px] h-auto"
        />

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          🎉 Your application was sent!
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mb-6">
          Congratulations! You&apos;ve taken the first step towards a rewarding career at Rakamin.
          We look forward to learning more about you during the application process.
        </p>

        <Button
          type="button"
          onClick={() =>router.push('/candidate/jobs')}
          className="w-full sm:w-[158px] h-10 bg-[#FBC037] py-1.5 px-4 text-[#404040] font-bold text-base rounded-lg hover:bg-[#f9aa2e]"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
