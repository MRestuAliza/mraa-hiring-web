"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterForm } from "../../../hooks/useRegisterFrom";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, errors, loading, errorMessage, handleChange, handleSubmit } =
    useRegisterForm();

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4 pt-0">
        {errorMessage && (
          <div className="w-full max-w-[420px] text-center text-xs text-red-700 bg-red-50 border border-red-300 px-4 py-2 rounded">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nama sesuai KTP</Label>
          <Input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            className={`w-full max-w-[420px] border-2 h-10 px-4 ${
              errors.name
                ? "border-red-500 focus-visible:border-red-500"
                : "focus-visible:border-[#016b71] focus-visible:ring-0"
            }`}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Alamat Email</Label>
          <Input
            id="email"
            type="text"
            value={form.email}
            onChange={handleChange("email")}
            className={`w-full max-w-[420px] border-2 h-10 px-4 ${
              errors.email
                ? "border-red-500 focus-visible:border-red-500"
                : "focus-visible:border-[#016b71] focus-visible:ring-0"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Kata Sandi</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              className={`w-full max-w-[420px] border-2 h-10 px-4 pr-10 ${
                errors.password
                  ? "border-red-500 focus-visible:border-red-500"
                  : "focus-visible:border-[#016b71] focus-visible:ring-0"
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-4 flex flex-col gap-4 pt-0">
        <Button
          type="submit"
          disabled={loading}
          className="w-full max-w-[420px] h-10 bg-[#FBC037] text-[#404040] font-bold hover:bg-[#f9aa2e]"
        >
          {loading ? "Memproses..." : "Daftar Sekarang"}
        </Button>
      </CardFooter>
    </form>
  );
}
