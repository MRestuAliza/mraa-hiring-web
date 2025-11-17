"use client";

import PageHeaderCandidate from "@/components/admin/layout/PageHeaderCandidate";
import CandidateTable from "@/components/admin/candidate/CandidateTable";
import CandidateEmpty from "@/components/admin/candidate/CandidateEmpty";
import { useManageCandidates } from "@/hooks/useManageCandidates";

export default function ManageCandidatesClient({ jobId }) {
  const { candidates, jobTitle, loading } = useManageCandidates(jobId);

  const hasCandidates = candidates.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeaderCandidate />

      <main className="flex flex-col flex-1 p-6 lg:p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {jobTitle || "Job Position"}
        </h1>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : hasCandidates ? (
          <CandidateTable candidates={candidates} />
        ) : (
          <CandidateEmpty />
        )}
      </main>
    </div>
  );
}
