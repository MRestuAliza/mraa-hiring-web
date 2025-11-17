"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../components/hooks/use-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useRegisterForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {
      name: "",
      email: "",
      password: "",
    };
    let ok = true;

    if (!form.name.trim()) {
      nextErrors.name = "Nama tidak boleh kosong";
      ok = false;
    }

    if (!form.email.trim()) {
      nextErrors.email =
        "Pastikan alamat email Anda benar (misal: nama@domain.com)";
      ok = false;
    } else if (!emailRegex.test(form.email)) {
      nextErrors.email = "Email tidak valid";
      ok = false;
    }

    if (!form.password.trim()) {
      nextErrors.password = "Kata sandi tidak boleh kosong";
      ok = false;
    } else if (form.password.length < 6) {
      nextErrors.password = "Kata sandi minimal 6 karakter";
      ok = false;
    }

    setErrors(nextErrors);
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data?.error || "Registration failed");
        return;
      }

      toast({
        description: "Account successfully created",
      });

      setTimeout(() => {
        router.push("/login");
      }, 1800);

    } catch (err) {
      console.error(err);
      setErrorMessage("Registration failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    errorMessage,
    loading,
    handleChange,
    handleSubmit,
  };
}
