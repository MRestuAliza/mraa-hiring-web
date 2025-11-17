import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function GET() {
  try {
    const jobsRef = collection(db, "jobs");
    const q = query(jobsRef, where("status", "==", "active"));
    const snapshot = await getDocs(q);
    const rawJobs = snapshot.docs.map((docSnap) => {
      const job = docSnap.data();
      return {
        id: docSnap.id,
        ...job,
      };
    });

    rawJobs.sort((a, b) => {
      const aTime = a.created_at?.toMillis?.() ?? 0;
      const bTime = b.created_at?.toMillis?.() ?? 0;
      return bTime - aTime;
    });

    const data = rawJobs.map((job) => ({
      id: job.id,
      slug: job.slug ?? "",
      title: job.title ?? "",
      company: job.company ?? "",
      job_type: job.job_type ?? null,
      location: job.location ?? null,
      salary_range: job.salary_range ?? {
        min: 0,
        max: 0,
        currency: "IDR",
        display_text: "",
      },
      description: job.description ?? "",
    }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/candidate/jobs] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidate job list" },
      { status: 500 }
    );
  }
}
