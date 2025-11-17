"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation';

export function useJobsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const { data } = await res.json();
      setJobs(data || []);
    } catch (err) {
      console.error("Fetch jobs error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleOpenCreate = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleJobCreated = async () => {
    await fetchJobs();
    setOpen(false);
  };

  const filteredJobs = useMemo(() => {
    if (!search.trim()) return jobs;
    const q = search.toLowerCase();

    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const desc = job.description?.toLowerCase() || "";
      return title.includes(q) || desc.includes(q);
    });
  }, [jobs, search]);

  const hasJobs = filteredJobs.length > 0;

  const handleManageJob = (jobId) => {
    router.push(`/admin/jobs/${jobId}`);
  }

  return {
    open,
    jobs,
    loading,
    search,
    filteredJobs,
    hasJobs,
    setOpen,
    setSearch,
    handleOpenCreate,
    handleCloseModal,
    handleJobCreated,
    handleManageJob
  };
}
