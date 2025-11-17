"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import regencies from "../data/regencies.json";

function toTitleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
}

export function useResumeCandidate(jobId) {
  const router = useRouter();

  const [fieldConfig, setFieldConfig] = useState({});
  const [loadingConfig, setLoadingConfig] = useState(true);

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [domicile, setDomicile] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [photoProfile, setPhotoProfile] = useState("/art.png");

  const [showDomicileList, setShowDomicileList] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");

  const [cameraOpen, setCameraOpen] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const isVisible = (key) => fieldConfig[key] !== undefined;
  const isRequired = (key) => !!fieldConfig[key]?.required;

  useEffect(() => {
    if (!jobId) return;

    async function loadConfig() {
      try {
        setLoadingConfig(true);
        const res = await fetch(`/api/jobs/${jobId}/config`);
        if (!res.ok) {
          console.error("Failed to fetch job config:", await res.text());
          setFieldConfig({});
          return;
        }

        const json = await res.json();
        const sections = json.application_form?.sections || [];

        const map = {};
        sections.forEach((section) => {
          (section.fields || []).forEach((field) => {
            map[field.key] = {
              required: !!field.validation?.required,
            };
          });
        });

        setFieldConfig(map);
      } catch (err) {
        console.error("Error loading config:", err);
        setFieldConfig({});
      } finally {
        setLoadingConfig(false);
      }
    }

    async function loadJobDetail() {
      try {
        const res = await fetch(`/api/candidate/jobs/${jobId}/job`);
        if (!res.ok) return;
        const job = await res.json();
        setJobTitle(job.title);
        setJobCompany(job.company);
      } catch (err) {
        console.error("Failed to load job name:", err);
      }
    }

    loadConfig();
    loadJobDetail();
  }, [jobId]);

  const filteredRegencies = useMemo(
    () =>
      regencies
        .filter((item) => {
          const label = `${item.name} - ${item.provinceName}`.toLowerCase();
          return label.includes(domicile.toLowerCase());
        })
        .slice(0, 50)
        .map((item) => ({
          id: item.id,
          label: `${toTitleCase(item.name)} - ${toTitleCase(
            item.provinceName
          )}`,
        })),
    [domicile]
  );

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        alert("Camera is not supported in this browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Failed to start camera:", err);
      alert("Cannot access camera. Please check your permissions.");
    }
  };

  useEffect(() => {
    if (cameraOpen) {
      setPreviewPhoto(null);
      startCamera();
    } else {
      stopCamera();
      setIsCountingDown(false);
      setCountdown(3);
    }

    return () => {
      stopCamera();
    };
  }, [cameraOpen]);

  const handleBack = () => {
    router.back();
  };

  const handleOpenCamera = () => {
    setCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
  };

  const captureFrame = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");
    setPreviewPhoto(dataUrl);
  };

  const handleStartCountdown = () => {
    if (isCountingDown || previewPhoto) return;
    setIsCountingDown(true);
    setCountdown(3);

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current <= 0) {
        clearInterval(interval);
        setIsCountingDown(false);
        setCountdown(3);
        captureFrame();
      } else {
        setCountdown(current);
      }
    }, 1000);
  };

  const handleRetakePhoto = () => {
    setPreviewPhoto(null);
    setIsCountingDown(false);
    setCountdown(3);
    startCamera();
  };

  const handleUsePhoto = () => {
    if (previewPhoto) {
      setPhotoProfile(previewPhoto);
    }
    setCameraOpen(false);
  };

  const handleDomicileChange = (value) => {
    setDomicile(value);
    setShowDomicileList(true);
  };

  const handleDomicileFocus = () => {
    setShowDomicileList(true);
  };

  const handleDomicileBlur = () => {
    setTimeout(() => setShowDomicileList(false), 150);
  };

  const handleSelectDomicile = (label) => {
    setDomicile(label);
    setShowDomicileList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobId || submitting) return;

    setFieldErrors({});

    const localErrors = {};

    if (isVisible("full_name") && isRequired("full_name") && !fullName.trim()) {
      localErrors.full_name = "Full name is required";
    }
    if (
      isVisible("date_of_birth") &&
      isRequired("date_of_birth") &&
      !dateOfBirth
    ) {
      localErrors.date_of_birth = "Date of birth is required";
    }
    if (isVisible("gender") && isRequired("gender") && !gender) {
      localErrors.gender = "Gender is required";
    }
    if (isVisible("domicile") && isRequired("domicile") && !domicile.trim()) {
      localErrors.domicile = "Domicile is required";
    }
    if (isVisible("phone_number") && isRequired("phone_number") && !phone) {
      localErrors.phone_number = "Phone number is required";
    }
    if (isVisible("email") && isRequired("email") && !email.trim()) {
      localErrors.email =
        "Please enter your email in the format: name@example.com";
    }
    if (
      isVisible("linkedin_link") &&
      isRequired("linkedin_link") &&
      !linkedin.trim()
    ) {
      localErrors.linkedin_link =
        "Please copy paste your Linkedin URL, example: https://www.linkedin.com/in/username";
    }
    if (
      isVisible("photo_profile") &&
      isRequired("photo_profile") &&
      !photoProfile
    ) {
      localErrors.photo_profile = "Photo profile is required";
    }

    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      return;
    }

    const attributes = {
      full_name: fullName,
      date_of_birth: dateOfBirth,
      gender,
      domicile,
      phone_number: phone,
      email,
      linkedin_link: linkedin,
      photo_profile: photoProfile,
    };

    try {
      setSubmitting(true);

      const res = await fetch(`/api/candidate/jobs/${jobId}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attributes }),
      });

      if (res.status === 400) {
        const json = await res.json();
        setFieldErrors(json.field_errors || {});
        return;
      }

      if (!res.ok) {
        console.error("Apply failed:", await res.text());
        alert("Failed to submit your application.");
        return;
      }

      router.push("/candidate/jobs/success");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error while submitting your application.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    fieldConfig,
    loadingConfig,
    fullName,
    dateOfBirth,
    gender,
    phone,
    domicile,
    email,
    linkedin,
    photoProfile,
    showDomicileList,
    submitting,
    fieldErrors,
    jobTitle,
    jobCompany,
    cameraOpen,
    isCountingDown,
    countdown,
    previewPhoto,
    videoRef,
    filteredRegencies,
    isVisible,
    isRequired,
    setCameraOpen,
    setFullName,
    setDateOfBirth,
    setGender,
    setPhone,
    setEmail,
    setLinkedin,
    handleBack,
    handleOpenCamera,
    handleCloseCamera,
    handleStartCountdown,
    handleRetakePhoto,
    handleUsePhoto,
    handleDomicileChange,
    handleDomicileFocus,
    handleDomicileBlur,
    handleSelectDomicile,
    handleSubmit,
  };
}
