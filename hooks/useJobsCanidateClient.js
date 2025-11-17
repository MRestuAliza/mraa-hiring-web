"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function getInitials(title) {
  if (!title) return "";
  const words = title.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function formatJobType(jobType) {
  if (!jobType) return "";
  return jobType
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("-");
}

export function descriptionToList(desc) {
  if (!desc) return [];
  return desc
    .split("\n")
    .map((d) => d.trim())
    .filter(Boolean);
}

export function useJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        const res = await fetch("/api/candidate/jobs", { cache: "no-store" });

        if (!res.ok) {
          console.error("Failed to fetch jobs:", await res.text());
          setJobs([]);
          return;
        }

        const { data } = await res.json();
        setJobs(data || []);
        if (data && data.length > 0) {
          setSelectedJobId(data[0].id);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  const hasJobs = !loading && jobs.length > 0;

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedJobId) || null,
    [jobs, selectedJobId]
  );

  const selectedDescriptionList = useMemo(
    () => descriptionToList(selectedJob?.description),
    [selectedJob]
  );

  const handleSelectJob = (jobId) => setSelectedJobId(jobId);

  const handleApply = () => {
    if (!selectedJob) return;
    router.push(`/candidate/jobs/${selectedJob.id}/resume`);
  };

  return {
    jobs,
    loading,
    hasJobs,
    selectedJob,
    selectedJobId,
    selectedDescriptionList,
    handleSelectJob,
    handleApply,
  };
}
