import Image from "next/image";

export default function CandidateEmpty() {
  return (
    <div className="flex-1 flex flex-col items-center border rounded-md shadow-sm justify-center text-center">
      <Image
        src="/no-candidate.svg"
        alt="Recruit the best candidates"
        width={306}
        height={300}
        className="mb-4"
      />
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        No candidates found
      </h2>
      <p className="text-gray-500 mb-4">
        Share your job vacancies so that more candidates will apply.
      </p>
    </div>
  );
}
