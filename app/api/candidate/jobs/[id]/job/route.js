import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req,  context) {
  try {
    const params = await context.params;
    const { id } = params;

    const jobRef = doc(db, "jobs", id);
    const snap = await getDoc(jobRef);

    if (!snap.exists()) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const job = snap.data();

    return NextResponse.json(
      {
        id,
        title: job.title ?? "",
        company: job.company ?? "Rakamin",
        description: job.description ?? "",
        job_type: job.job_type ?? "",
        salary_range: job.salary_range ?? {},
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("GET /candidate/jobs/:id error:", e);
    return NextResponse.json(
      { error: "Failed to fetch job detail" },
      { status: 500 }
    );
  }
}
