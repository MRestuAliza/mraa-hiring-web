"use client";

import PageHeader from "../../common/PageHeader";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CreateJobsCard from "./CreateJobsCard";
import JobEmpty from "../../common/JobEmpty";
import JobListCard from "./JobsCardList";
import JobsModal from "./JobsModal";
import { useJobsPage } from "@/hooks/useJobsPage";

export default function JobsPageClient() {
  const {
    open,
    loading,
    search,
    filteredJobs,
    hasJobs,
    setSearch,
    handleOpenCreate,
    handleCloseModal,
    handleJobCreated,
    handleManageJob,
  } = useJobsPage();

  return (
    <div className="w-full">
      <PageHeader title="Job List" />
      <div className="flex w-full flex-col lg:flex-row px-4 lg:px-8 py-4 lg:py-6 gap-4 lg:gap-6">
        <div className="flex-1">
          <div className="relative w-full mb-4 lg:mb-6">
            <Input
              type="text"
              placeholder="Search by job details"
              className="py-2 px-4 border-2 w-full h-10 rounded-xl focus:border-[#016b71]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search
              size={24}
              className="text-[#3a969f] absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading jobs...</p>
          ) : !hasJobs ? (
            <JobEmpty onCreateJob={handleOpenCreate} isAdmin={true} />
          ) : (
            <div className="flex flex-col gap-4">
              {filteredJobs.map((job) => (
                <JobListCard
                  key={job.id}
                  job={job}
                  onManage={() => handleManageJob(job.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-full max-w-sm lg:w-[300px] shrink-0">
          <CreateJobsCard onCreateJob={handleOpenCreate} />
        </div>
      </div>

      <JobsModal
        open={open}
        onOpenChange={(val) =>
          val ? handleOpenCreate() : handleCloseModal()
        }
        onCreated={handleJobCreated}
      />
    </div>
  );
}
