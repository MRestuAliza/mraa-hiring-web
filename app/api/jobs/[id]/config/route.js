// app/api/jobs/[id]/config/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Job id is required" },
        { status: 400 }
      );
    }

    const configRef = doc(db, "job_configs", id);
    const snapshot = await getDoc(configRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        {
          application_form: {
            sections: [],
          },
        },
        { status: 200 }
      );
    }

    const data = snapshot.data();

    return NextResponse.json(
      {
        application_form: data.application_form,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/jobs/[id]/config] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch job configuration" },
      { status: 500 }
    );
  }
}


export async function PUT(req, context) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Job id is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { application_form } = body;

    if (
      !application_form ||
      !Array.isArray(application_form.sections)
    ) {
      return NextResponse.json(
        { error: "Invalid application_form payload" },
        { status: 400 }
      );
    }

    const configRef = doc(db, "job_configs", id);
    await setDoc(configRef, {
      jobId: id,
      application_form,
      updated_at: serverTimestamp(),
    });

    return NextResponse.json(
      { application_form },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PUT /api/jobs/[id]/config] error:", error);
    return NextResponse.json(
      { error: "Failed to update job configuration" },
      { status: 500 }
    );
  }
}

