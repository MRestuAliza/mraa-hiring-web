"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useJobForm } from "@/hooks/useJobForm";

const RequirementStatus = ["Mandatory", "Optional", "Off"];

function RequirementToggleRow({ label, value, onChange, isLocked }) {
  const baseBtn =
    "rounded-full px-4 py-1 text-xs font-medium transition-colors";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 px-4 border-b last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">
        {RequirementStatus.map((status) => {
          const disabled = isLocked && status !== "Mandatory";
          const isActive = value === status;

          return (
            <Button
              key={status}
              type="button"
              variant="outline"
              disabled={disabled}
              className={`${baseBtn} ${
                isActive
                  ? "border-[#01959F] text-[#01959F]"
                  : disabled
                  ? "text-[#9E9E9E] border-[#E0E0E0] bg-[#EDEDED] cursor-not-allowed opacity-60"
                  : "text-black"
              }`}
              onClick={() => {
                if (!disabled) onChange(status);
              }}
            >
              {status}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default function JobsModal({ open, onOpenChange, onCreated }) {
  const {
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
  } = useJobForm({
    onCreated,
    onClose: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[900px] max-h-[90vh] p-0 gap-0 [&>button]:hidden">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b">
            <DialogHeader className="p-0">
              <DialogTitle className="text-base sm:text-lg font-semibold">
                Job Opening
              </DialogTitle>
            </DialogHeader>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-6 max-h-[calc(90vh-140px)]">
            <div className="space-y-2">
              <Label htmlFor="jobName">
                Job Name<span className="text-destructive">*</span>
              </Label>
              <Input
                id="jobName"
                placeholder="Ex. Front End Engineer"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">
                Job Type<span className="text-destructive">*</span>
              </Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger id="jobType" className="w-full">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">
                Job Description<span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="jobDescription"
                className="min-h-40"
                placeholder="Describe responsibilities, requirements, and expectations for this role."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="candidate">
                Number of Candidate Needed
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="candidate"
                placeholder="Ex. 2"
                value={candidateNeeded}
                onChange={(e) => setCandidateNeeded(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">
                Start Date<span className="text-destructive">*</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="location">
                Location<span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                placeholder="Choose location"
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                onFocus={handleLocationFocus}
                onBlur={handleLocationBlur}
              />
              {showLocationList && (
                <div className="absolute z-50 mt-1 w-full max-h-72 overflow-y-auto rounded-md border bg-white shadow-lg">
                  {filteredRegencies.length > 0 ? (
                    filteredRegencies.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="w-full px-3 py-2 text-left text-xs font-bold hover:bg-slate-100"
                        onMouseDown={() => handleSelectLocation(item.label)}
                      >
                        {item.label}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-slate-400">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobStatus">
                Job Status<span className="text-destructive">*</span>
              </Label>
              <Select value={jobStatus} onValueChange={setJobStatus}>
                <SelectTrigger id="jobStatus" className="w-full">
                  <SelectValue placeholder="Select job status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="border-dashed" />

            <div className="space-y-3">
              <p className="text-sm font-medium">Job Salary</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minSalary">Minimum Estimated Salary</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rp</span>
                    <Input
                      id="minSalary"
                      placeholder="7000000"
                      className="flex-1"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSalary">Maximum Estimated Salary</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rp</span>
                    <Input
                      id="maxSalary"
                      placeholder="8000000"
                      className="flex-1"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">
                Minimum Profile Information Required
              </p>
              <div className="border rounded-lg">
                {ProfileFields.map((field) => (
                  <RequirementToggleRow
                    key={field.key}
                    label={field.label}
                    value={requirements[field.key]}
                    isLocked={isRequirementLocked(field.key)}
                    onChange={(state) => updateRequirement(field.key, state)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t bg-muted/40">
            <Button
              type="submit"
              className="bg-[#3a969f] hover:bg-[#2d777f]"
              disabled={submitting}
            >
              {submitting ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
