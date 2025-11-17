"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Banknote } from "lucide-react";
import JobEmpty from "@/components/common/JobEmpty";

import {
  useJobsPage,
  getInitials,
  formatJobType,
} from "../../../hooks/useJobsCanidateClient";
import Image from "next/image";

export default function JobsClient() {
  const {
    jobs,
    loading,
    hasJobs,
    selectedJob,
    selectedJobId,
    selectedDescriptionList,
    handleSelectJob,
    handleApply,
  } = useJobsPage();

  if (!loading && !hasJobs) {
    return (
      <div className="flex w-full items-center justify-center px-4 py-10">
        <JobEmpty isAdmin={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center px-4 sm:px-6 py-6 sm:py-10">
      <div className="w-full max-w-[1220px] flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="w-full lg:w-[406px] lg:h-[768px]">
          <ScrollArea className="h-auto lg:h-full [&_[data-slot=scroll-area-viewport]]:pr-0 lg:[&_[data-slot=scroll-area-viewport]]:pr-5">
            {loading ? (
              <p className="text-sm text-slate-500">Loading jobs...</p>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => {
                  const active = job.id === selectedJobId;

                  return (
                    <Card
                      key={job.id}
                      onClick={() => handleSelectJob(job.id)}
                      className={`w-full cursor-pointer border-2 rounded-xl transition-all
                        ${
                          active
                            ? "border-[#01777F] bg-white shadow-sm"
                            : "border-slate-200 hover:border-[#00A7B3]/50"
                        }`}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex gap-3 border-b border-dotted pb-3">
                            <div className="h-10 w-10 bg-[#00A7B3]/10 rounded-lg flex items-center justify-center">
                              <Image
                                src="/logo-rakamin.svg"
                                width={24}
                                height={24}
                                alt="Rakamin Logo"
                              />
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-semibold">
                                {job.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {job.company || "Rakamin"}
                              </p>
                            </div>
                          </div>

                          <div className="text-xs text-slate-500 space-y-1">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5" /> {job.location}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Banknote className="h-3.5" />{" "}
                              {job.salary_range?.display_text || "-"}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        <Card className="w-full lg:w-[802px] border rounded-xl shadow-sm flex flex-col mt-2 lg:mt-0 lg:h-[768px]">
          {!selectedJob ? (
            <div className="flex-1 flex items-center justify-center text-sm text-slate-500 px-4 py-6">
              {loading ? "Loading job detail..." : "No job selected."}
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-4 sm:pb-6 border-b">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="h-12 w-12 rounded-xl bg-[#00A7B3]/10 flex items-center justify-center">
                    <Image
                      src="/logo-rakamin.svg"
                      width={24}
                      height={24}
                      alt="Rakamin Logo"
                    />
                  </div>

                  <div>
                    <Badge className="bg-[#43936C] text-white px-3 py-1 text-xs rounded-sm border-none">
                      {formatJobType(selectedJob.job_type)}
                    </Badge>

                    <h1 className="text-base sm:text-lg font-semibold mt-1">
                      {selectedJob.title}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500">
                      {selectedJob.company || "Rakamin"}
                    </p>
                  </div>
                </div>

                <div className="flex sm:items-center sm:justify-center">
                  <Button
                    onClick={handleApply}
                    className="w-full sm:w-auto px-4 sm:px-6 bg-[#FBC037] text-[#404040] font-semibold hover:bg-[#f9aa26] rounded-lg"
                  >
                    Apply
                  </Button>
                </div>
              </div>
              <ScrollArea className="px-4 sm:px-6 lg:px-8 py-4 lg:flex-1">
                <CardContent className="p-0">
                  <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-2 text-slate-700">
                    {selectedDescriptionList.length > 0 ? (
                      selectedDescriptionList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))
                    ) : (
                      <li>No description provided.</li>
                    )}
                  </ul>
                </CardContent>
              </ScrollArea>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
