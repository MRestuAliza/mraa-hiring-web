"use client";

import { useEffect, useState } from "react";

export function useManageCandidates(jobId) {
  const [candidates, setCandidates] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    async function loadJobDetail() {
      try {
        const res = await fetch(`/api/candidate/jobs/${jobId}/job`);
        if (!res.ok) return;
        const job = await res.json();
        setJobTitle(job.title);
      } catch (err) {
        console.error("Failed to load job name:", err);
      }
    }

    async function loadCandidates() {
      try {
        const res = await fetch(`/api/jobs/${jobId}/candidates`);
        const json = await res.json();

        const mapped = (json.data || []).map((c) => {
          const attrs = c.attributes || [];
          const get = (key) =>
            attrs.find((a) => a.key === key)?.value || "-";

          return {
            id: c.id,
            name: get("full_name"),
            email: get("email"),
            phone: get("phone_number"),
            domicile: get("domicile"),
            gender: get("gender"),
            linkedin: get("linkedin_link"),
            dob: get("date_of_birth"),
          };
        });

        setCandidates(mapped);
      } catch (err) {
        console.error("Failed to load candidates:", err);
      } finally {
        setLoading(false);
      }
    }

    loadJobDetail();
    loadCandidates();
  }, [jobId]);

  return {
    candidates,
    jobTitle,
    loading,
  };
}
