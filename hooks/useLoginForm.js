"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useLoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = { email: "", password: "" };
    let ok = true;

    if (!form.email.trim()) {
      nextErrors.email = "Email cannot be empty";
      ok = false;
    } else if (!emailRegex.test(form.email)) {
      nextErrors.email = "Email is invalid";
      ok = false;
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password cannot be empty";
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
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (!res || res.error) {
        setErrorMessage(res?.error || "Login failed");
        return;
      }

      const session = await getSession();
      if (session?.user?.role === "admin") {
        router.push("/admin/jobs");
      } else if (session?.user?.role === "user") {
        router.push("/candidate/jobs");
      } else {
        router.push("/login");
      }

    } catch (err) {
      setErrorMessage("Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, errorMessage, loading, handleChange, handleSubmit };
}