// app/api/jobs/[id]/candidates/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(_req, context) {
  try {
    const { id: jobId } = await context.params;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job id is required" },
        { status: 400 }
      );
    }

    const candRef = collection(db, "job_candidates");
    const q = query(candRef, where("jobId", "==", jobId));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((docSnap) => {
      const cand = docSnap.data();
      return {
        id: docSnap.id,
        attributes: cand.attributes || [],
      };
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/jobs/[id]/candidates] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}
