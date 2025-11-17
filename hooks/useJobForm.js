"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/hooks/use-toast";
import regencies from "@/data/regencies.json";

const ProfileFields = [
  { label: "Full name", key: "full_name" },
  { label: "Photo Profile", key: "photo_profile" },
  { label: "Gender", key: "gender" },
  { label: "Domicile", key: "domicile" },
  { label: "Email", key: "email" },
  { label: "Phone number", key: "phone_number" },
  { label: "Linkedin link", key: "linkedin_link" },
  { label: "Date of birth", key: "date_of_birth" },
];

const DisableButtonField = ["full_name", "photo_profile", "email"];

function buildInitialRequirements() {
  const initialReq = {};
  ProfileFields.forEach((field) => {
    initialReq[field.key] = "Mandatory";
  });
  return initialReq;
}

function toTitleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
}

export function useJobForm({ onCreated, onClose }) {
  const { toast } = useToast();
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [candidateNeeded, setCandidateNeeded] = useState("");
  const [startDate, setStartDate] = useState("");
  const [jobStatus, setJobStatus] = useState("active");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [requirements, setRequirements] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [location, setLocation] = useState("");
  const [showLocationList, setShowLocationList] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setStartDate(today);
    setRequirements(buildInitialRequirements());
  }, []);

  const filteredRegencies = useMemo(
    () =>
      regencies
        .filter((item) => {
          const label = `${item.name} - ${item.provinceName}`.toLowerCase();
          return label.includes(location.toLowerCase());
        })
        .slice(0, 50)
        .map((item) => ({
          id: item.id,
          label: `${toTitleCase(item.name)} - ${toTitleCase(
            item.provinceName
          )}`,
        })),
    [location]
  );

  const resetForm = () => {
    const today = new Date().toISOString().slice(0, 10);
    setJobName("");
    setJobType("");
    setJobDescription("");
    setCandidateNeeded("");
    setStartDate(today);
    setJobStatus("active");
    setMinSalary("");
    setMaxSalary("");
    setRequirements(buildInitialRequirements());
    setLocation("");
    setShowLocationList(false);
  };

  const updateRequirement = (key, state) => {
    if (DisableButtonField.includes(key) && state !== "Mandatory") {
      return;
    }
    setRequirements((prev) => ({
      ...prev,
      [key]: state,
    }));
  };

  const isRequirementLocked = (key) => DisableButtonField.includes(key);

  const handleLocationChange = (value) => {
    setLocation(value);
    setShowLocationList(true);
  };

  const handleLocationFocus = () => {
    setShowLocationList(true);
  };

  const handleLocationBlur = () => {
    setTimeout(() => setShowLocationList(false), 150);
  };

  const handleSelectLocation = (label) => {
    setLocation(label);
    setShowLocationList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (
      !jobName ||
      !jobType ||
      !jobDescription ||
      !candidateNeeded ||
      !startDate ||
      !jobStatus ||
      !location
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const resJob = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobName,
          jobType,
          jobDescription,
          candidateNeeded,
          minSalary,
          maxSalary,
          startDate,
          status: jobStatus,
          location,
        }),
      });

      if (!resJob.ok) {
        console.error("Create job failed", await resJob.text());
        alert("Failed to create job");
        return;
      }

      const { data: job } = await resJob.json();
      const fields = ProfileFields.map((field) => {
        const state = requirements[field.key];
        if (!state || state === "Off") return null;

        return {
          key: field.key,
          validation: {
            required: state === "Mandatory",
          },
        };
      }).filter(Boolean);

      const configPayload = {
        application_form: {
          sections: [
            {
              title: "Minimum Profile Information Required",
              fields,
            },
          ],
        },
      };

      const resConfig = await fetch(`/api/jobs/${job.id}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configPayload),
      });

      if (!resConfig.ok) {
        console.error("Save config failed", await resConfig.text());
        alert("Job created but failed to save configuration");
        return;
      }

      if (typeof onCreated === "function") {
        await onCreated();
      }

      toast({
        description: "Job vacancy successfully created",
      });

      resetForm();
      if (typeof onClose === "function") {
        onClose();
      }
    } catch (err) {
      console.error("Error submitting job:", err);
      alert("Unexpected error while creating job");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    ProfileFields,
    jobName,
    jobType,
    jobDescription,
    candidateNeeded,
    startDate,
    jobStatus,
    minSalary,
    maxSalary,
    requirements,
    submitting,
    location,
    showLocationList,
    filteredRegencies,
    setJobName,
    setJobType,
    setJobDescription,
    setCandidateNeeded,
    setStartDate,
    setJobStatus,
    setMinSalary,
    setMaxSalary,
    updateRequirement,
    isRequirementLocked,
    handleLocationChange,
    handleLocationFocus,
    handleLocationBlur,
    handleSelectLocation,
    handleSubmit,
  };
}