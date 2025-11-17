"use client";

import Image from "next/image";
import { ArrowLeft, Camera, X } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useResumeCandidate } from "../../../hooks/useResumeCandidate";

export default function ResumeCandidateClient({ jobId }) {
  const {
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
  } = useResumeCandidate(jobId);

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
        <Card className="w-full max-w-[700px] border border-slate-200 shadow-sm">
          <CardContent className="p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <button
                onClick={handleBack}
                className="flex items-center gap-3 text-base text-slate-900"
              >
                <div className="p-2 rounded-sm border border-slate-200 bg-white flex items-center justify-center shadow-sm">
                  <ArrowLeft className="h-4 w-4 text-slate-700" />
                </div>
                <span className="font-semibold text-sm sm:text-[15px] text-left">
                  Apply {jobTitle || "..."} at {jobCompany || "Company"}
                </span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-[16px]">ℹ️</span>
                <span>This field required to fill</span>
              </div>
            </div>

            <p className="text-xs font-bold text-red-500 mb-4">* Required</p>

            {isVisible("photo_profile") && (
              <section className="mb-4">
                <p className="text-xs font-medium text-slate-700 mb-2">
                  Photo Profile
                  {isRequired("photo_profile") && (
                    <span className="text-red-500 ml-0.5">*</span>
                  )}
                </p>

                <div className="items-center space-y-2">
                  <Image
                    src={photoProfile}
                    alt="Profile Picture"
                    width={128}
                    height={128}
                    className="rounded-md object-cover"
                    unoptimized
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-slate-300 text-slate-700 text-sm flex items-center rounded-md gap-2"
                    onClick={handleOpenCamera}
                  >
                    <Camera className="h-4 w-4" />
                    <span>Take a Picture</span>
                  </Button>
                  {fieldErrors.photo_profile && (
                    <p className="text-xs text-red-500">
                      {fieldErrors.photo_profile}
                    </p>
                  )}
                </div>
              </section>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isVisible("full_name") && (
                <div className="space-y-1">
                  <Label className="text-xs text-slate-700">
                    Full name
                    {isRequired("full_name") && (
                      <span className="text-red-500">*</span>
                    )}
                  </Label>
                  <Input
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`h-10 text-sm ${
                      fieldErrors.full_name
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  {fieldErrors.full_name && (
                    <p className="text-xs text-red-500">
                      {fieldErrors.full_name}
                    </p>
                  )}
                </div>
              )}

              {isVisible("date_of_birth") && (
                <div className="space-y-1">
                  <Label className="text-xs text-slate-700">
                    Date of birth
                    {isRequired("date_of_birth") && (
                      <span className="text-red-500">*</span>
                    )}
                  </Label>
                  <Input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className={`h-10 text-sm ${
                      fieldErrors.date_of_birth
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />

                  {fieldErrors.date_of_birth && (
                    <p className="text-xs text-red-500">
                      {fieldErrors.date_of_birth}
                    </p>
                  )}
                </div>
              )}

              {isVisible("gender") && (
                <div className="space-y-2">
                  <Label className="text-xs text-slate-700">
                    Pronoun (gender)
                    {isRequired("gender") && (
                      <span className="text-red-500">*</span>
                    )}
                  </Label>
                  <RadioGroup
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm"
                    value={gender}
                    onValueChange={setGender}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="text-xs">
                        She/her (Female)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="text-xs">
                        He/him (Male)
                      </Label>
                    </div>
                  </RadioGroup>
                  {fieldErrors.gender && (
                    <p className="text-xs text-red-500">{fieldErrors.gender}</p>
                  )}
                </div>
              )}

              {isVisible("domicile") && (
                <div className="space-y-1 relative">
                  <Label className="text-xs text-slate-700">
                    Domicile
                    {isRequired("domicile") && (
                      <span className="text-red-500">*</span>
                    )}
                  </Label>

                  <Input
                    value={domicile}
                    onChange={(e) => handleDomicileChange(e.target.value)}
                    onFocus={handleDomicileFocus}
                    onBlur={handleDomicileBlur}
                    placeholder="Choose your domicile"
                    className={`h-10 text-xs ${
                      fieldErrors.domicile
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />

                  {showDomicileList && (
                    <div className="absolute z-50 mt-1 w-full max-h-72 overflow-y-auto rounded-md border bg-white shadow-lg">
                      {filteredRegencies.length > 0 ? (
                        filteredRegencies.map((item) => {
                          const label = `${item.label}`;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              className="w-full px-3 py-2 text-left text-xs font-bold hover:bg-slate-100"
                              onMouseDown={() => handleSelectDomicile(label)}
                            >
                              {label}
                            </button>
                          );
                        })
                      ) : (
                        <div className="px-3 py-2 text-xs text-slate-400">
                          No results found
                        </div>
                      )}
                    </div>
                  )}

                  {fieldErrors.domicile && (
                    <p className="text-xs text-red-500">
                      {fieldErrors.domicile}
                    </p>
                  )}
                </div>
              )}

              {isVisible("phone_number") && (
                <div className="space-y-1">
                  <Label className="text-xs text-slate-700">
                    Phone number
                    {isRequired("phone_number") && (
                      <span className="text-red-500">*</span>
                    )}
                  </Label>
                  <PhoneInput
                    defaultCountry="id"
                    value={phone}
                    onChange={setPhone}
                    className="w-full"
                    inputClassName={`h-10 text-sm w-full ${
                      fieldErrors.phone_number
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />

                  {fieldErrors.phone_number && (
                    <p className="text-xs text-red-500">
                      {fieldErrors.phone_number}
                    </p>
                  )}
                </div>
              )}

              {isVisible("email") && (
                <div className="space-y-1">
                  <Label className="text-xs text-slate-700">
                    Email
                    {isRequired("email") && (
                      <span className="text-red-500">*</span>
                    )}
                  </Label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-10 text-sm ${
                      fieldErrors.email
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />

                  {fieldErrors.email && (
                    <p className="text-xs text-red-500">{fieldErrors.email}</p>
                  )}
                </div>
              )}

              {isVisible("linkedin_link") && (
                <div className="space-y-1">
                  <Label className="text-xs text-slate-700">
                    Link LinkedIn
                    {isRequired("linkedin_link") && (
                      <span className="text-red-500">*</span>
                    )}
                  </Label>
                  <Input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className={`h-10 text-sm ${
                      fieldErrors.linkedin_link
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />

                  {fieldErrors.linkedin_link && (
                    <p className="text-xs text-red-500">
                      {fieldErrors.linkedin_link}
                    </p>
                  )}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-11 bg-[#008D94] hover:bg-[#007980] text-white font-semibold text-sm rounded-md"
                  disabled={submitting || loadingConfig}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={cameraOpen} onOpenChange={setCameraOpen}>
        <DialogContent className="max-w-[960px] w-full p-0">
          <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b">
              <DialogHeader className="p-0">
                <DialogTitle className="text-base sm:text-lg font-semibold">
                  Raise Your Hand to Capture
                </DialogTitle>
                <p className="text-xs text-slate-500">
                  We&apos;ll take the photo once the countdown finishes.
                </p>
              </DialogHeader>
              <button
                type="button"
                className="p-1 rounded-md hover:bg-slate-100"
                onClick={handleCloseCamera}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative w-full bg-black">
              {previewPhoto ? (
                <img
                  src={previewPhoto}
                  alt="Captured"
                  className="w-full max-h-[320px] sm:max-h-[480px] object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  className="w-full max-h-[320px] sm:max-h-[480px] object-cover"
                  autoPlay
                  playsInline
                  muted
                />
              )}

              {isCountingDown && !previewPhoto && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="text-white text-4xl sm:text-6xl font-bold">
                    {countdown}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-t">
              {previewPhoto ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRetakePhoto}
                  >
                    Retake photo
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#008D94] hover:bg-[#007980]"
                    onClick={handleUsePhoto}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  className="bg-[#008D94] hover:bg-[#007980]"
                  onClick={handleStartCountdown}
                  disabled={isCountingDown}
                >
                  {isCountingDown ? "Capturing..." : "Capture"}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
