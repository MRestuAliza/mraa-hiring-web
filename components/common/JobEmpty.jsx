import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function JobEmpty({ onCreateJob, isAdmin }) {
  const adminContent = (
    <>
      <p className="text-gray-500 mb-4">
        Create a job opening now and start the candidate process.
      </p>
      <Button
        type="button"
        onClick={onCreateJob}
        className="w-full sm:w-[158px] h-10 bg-[#FBC037] py-1.5 px-4 text-[#404040] font-bold text-base rounded-lg hover:bg-[#f9aa2e]"
      >
        Create a new job
      </Button>
    </>
  );

  const candidateContent = (
    <p className="text-gray-500 mb-4">
      Please wait for the next batch of openings.
    </p>
  );

  return (
    <div className="flex min-h-80 sm:min-h-[380px] lg:min-h-[420px] flex-col items-center justify-center text-center px-4">
      <Image
        src="/artwork.svg"
        alt="Recruit the best candidates"
        width={306}
        height={300}
        className="mb-4 w-[220px] h-auto sm:w-[260px] md:w-[306px]"
      />

      <h3 className="text-xl font-bold text-gray-900 mb-1">
        No job openings available
      </h3>

      {isAdmin ? adminContent : candidateContent}
    </div>
  );
}