import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const configRef = doc(db, "job_configs", id);
    const configSnap = await getDoc(configRef);

    if (!configSnap.exists()) {
      return NextResponse.json(
        { application_form: { sections: [] } },
        { status: 200 }
      );
    }

    const data = configSnap.data();

    return NextResponse.json(
      { application_form: data.application_form },
      { status: 200 }
    );

  } catch (error) {
    console.error("[GET /candidate/jobs/[jobId]/apply-form] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch apply form" },
      { status: 500 }
    );
  }
}
