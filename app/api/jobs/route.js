import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export async function GET() {
  try {
    const jobsRef = collection(db, "jobs");
    const snapshot = await getDocs(jobsRef);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/jobs] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}


function generateJobId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `jobs-${date}-${nanoid(8)}`;
}
function getBadgeText(status) {
  switch (status) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "draft":
      return "Draft";
    default:
      return "Unknown";
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      jobName,
      jobType,
      jobDescription,
      candidateNeeded,
      minSalary,
      maxSalary,
      startDate,
      status,
      location, // ⬅️ lokasi dari body
    } = body;

    if (!jobName) {
      return NextResponse.json(
        { error: "Job name is required" },
        { status: 400 }
      );
    }

    if (!jobType) {
      return NextResponse.json(
        { error: "Job type is required" },
        { status: 400 }
      );
    }

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    if (!location) {
      return NextResponse.json(
        { error: "Location is required" },
        { status: 400 }
      );
    }

    if (!candidateNeeded || isNaN(candidateNeeded) || candidateNeeded <= 0) {
      return NextResponse.json(
        { error: "Valid number of candidates needed is required" },
        { status: 400 }
      );
    }

    const id = generateJobId();
    const slug = jobName.toLowerCase().replace(/\s+/g, "-");
    const salaryMin = Number(minSalary) || 0;
    const salaryMax = Number(maxSalary) || 0;

    const salaryRange = {
      min: salaryMin,
      max: salaryMax,
      currency: "IDR",
      display_text: `Rp${salaryMin.toLocaleString(
        "id-ID"
      )} - Rp${salaryMax.toLocaleString("id-ID")}`,
    };

    const baseDate = startDate ? new Date(startDate) : new Date();
    const startedOnText = `started on ${baseDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;

    const jobData = {
      slug,
      title: jobName,
      status: getBadgeText(status).toLowerCase(),
      salary_range: salaryRange,
      location,
      list_card: {
        badge: getBadgeText(status),
        started_on_text: startedOnText,
        cta: "Manage Job",
      },
      description: jobDescription || "",
      candidate_needed: candidateNeeded ? Number(candidateNeeded) : null,
      job_type: jobType || null,
      created_at: serverTimestamp(),
    };

    const jobDocRef = doc(db, "jobs", id);
    await setDoc(jobDocRef, jobData);

    return NextResponse.json(
      {
        data: {
          id,
          ...jobData,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/jobs] error:", error);
    return NextResponse.json(
      { error: "Failed to create job posting" },
      { status: 500 }
    );
  }
}

