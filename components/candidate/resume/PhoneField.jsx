"use client";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useState } from "react";

export default function PhoneField() {
  const [phone, setPhone] = useState("");

  return (
    <div className="space-y-1">
      <label className="text-xs text-slate-700">
        Phone number<span className="text-red-500">*</span>
      </label>
      <PhoneInput
        defaultCountry="id"
        value={phone}
        onChange={(value) => setPhone(value)}
        className="w-full"
      />
    </div>
  );
}
