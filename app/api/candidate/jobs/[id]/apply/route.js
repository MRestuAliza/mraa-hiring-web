import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { FIELD_LABELS } from "@/lib/applicationFields";

function generateCandidateId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `cand-${date}-${nanoid(8)}`;
}

export async function POST(req, context) {
  try {
    const { id: jobId } = await context.params;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job id is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { attributes } = body || {};

    // attributes di-ekspektasi object:
    // {
    //   full_name: "...",
    //   email: "...",
    //   phone_number: "...",
    //   ...
    // }
    if (!attributes || typeof attributes !== "object") {
      return NextResponse.json(
        { error: "Invalid payload. `attributes` object is required." },
        { status: 400 }
      );
    }

    // 1. Pastikan job exists & active
    const jobRef = doc(db, "jobs", jobId);
    const jobSnap = await getDoc(jobRef);

    if (!jobSnap.exists()) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    const jobData = jobSnap.data();
    if (jobData.status !== "active") {
      return NextResponse.json(
        { error: "Job is not open for application" },
        { status: 403 }
      );
    }

    // 2. Ambil config job
    const configRef = doc(db, "job_configs", jobId);
    const configSnap = await getDoc(configRef);

    if (!configSnap.exists()) {
      // Tidak ada config = tidak ada field yang wajib
      // (FE tetap boleh kirim data, tapi backend tidak memaksa apapun)
    }

    const configData = configSnap.data() || {};
    const sections = configData.application_form?.sections || [];

    // Flatten fields dari semua sections
    const configFields = [];
    let orderCounter = 1;

    sections.forEach((section) => {
      (section.fields || []).forEach((field) => {
        const key = field.key;
        const required = !!field.validation?.required;

        configFields.push({
          key,
          required,
          order: orderCounter++,
        });
      });
    });

    // 3. Validasi field mandatory
    const missingRequired = [];
    const fieldErrors = {};

    configFields.forEach((field) => {
      if (!field.required) return;

      const rawValue = attributes[field.key];

      const isEmpty =
        rawValue === undefined ||
        rawValue === null ||
        (typeof rawValue === "string" && rawValue.trim() === "");

      if (isEmpty) {
        missingRequired.push(field.key);
        const label =
          FIELD_LABELS[field.key] ||
          field.key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        fieldErrors[field.key] = `${label} is required`;
      }
    });

    if (missingRequired.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          missing_required: missingRequired,
          field_errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    // 4. Bentuk attributes array (sesuai Candidate List mock)
    const attributesArray = configFields.map((field) => {
      const rawValue = attributes[field.key];
      const label =
        FIELD_LABELS[field.key] ||
        field.key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

      return {
        key: field.key,
        label,
        value: rawValue ?? "",
        order: field.order,
      };
    });

    // 5. Simpan candidate ke Firestore
    const candId = generateCandidateId();
    const candRef = doc(db, "job_candidates", candId);

    await setDoc(candRef, {
      jobId,
      attributes: attributesArray,
      raw_attributes: attributes, // optional, buat debugging / future use
      applied_at: serverTimestamp(),
    });

    return NextResponse.json(
      {
        data: {
          id: candId,
          attributes: attributesArray,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/candidate/jobs/[id]/apply] error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
