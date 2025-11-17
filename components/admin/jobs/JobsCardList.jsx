"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function getStatusStyle(status) {
  switch (status) {
    case "active":
      return {
        bg: "bg-[#E8FFF3]",
        border: "border-[#B6F3D0]",
        text: "text-[#0F9F6E]",
      };
    case "inactive":
      return {
        bg: "bg-[#FFF0F0]",
        border: "border-[#FCD1D1]",
        text: "text-[#E53935]",
      };
    case "draft":
      return {
        bg: "bg-[#FFF8E8]",
        border: "border-[#FFE1AA]",
        text: "text-[#D48A00]",
      };
    default:
      return {
        bg: "bg-gray-100",
        border: "border-gray-200",
        text: "text-gray-600",
      };
  }
}

export default function JobListCard({ job, onManage }) {
  const colors = getStatusStyle(job.status);

  return (
    <Card className="w-full rounded-[20px] shadow-lg hover:shadow-md transition-all border border-gray-100">
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
        <div className="space-y-2 w-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span
              className={`
                inline-flex items-center rounded-md px-3 py-0.5 text-xs font-medium
                border ${colors.border} ${colors.bg} ${colors.text}
              `}
            >
              {job.list_card.badge}
            </span>

            <span className="text-xs text-[#6B7280] border px-3 py-0.5 rounded-xs">
              {job.list_card.started_on_text}
            </span>
          </div>

          <h3 className="text-[18px] font-semibold text-[#111827]">
            {job.title}
          </h3>
          <p className="text-sm text-[#4B5563]">
            {job.salary_range.display_text}
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            className="w-full sm:w-auto rounded-md bg-[#008B8F] hover:bg-[#00747A] px-5 py-1.5 text-sm font-semibold text-white"
            onClick={onManage}
          >
            {job.list_card.cta}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}