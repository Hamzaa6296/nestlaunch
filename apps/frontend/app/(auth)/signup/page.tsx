"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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

  const validate = () => {
    const newErrors = { name: "", email: "", password: "" };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await authApi.signup(form);
      toast.success("Account created! Check your email for OTP.");
      router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start building your SaaS today. Free forever."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="name"
          label="Full Name"
          placeholder="Hamza Ahmed"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          disabled={isLoading}
          autoComplete="name"
        />

        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="hamza@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          disabled={isLoading}
          autoComplete="email"
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Minimum 6 characters"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
          disabled={isLoading}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 text-sm font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "#0f1117",
            color: "#f8f7f4",
            borderRadius: "8px",
          }}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: "#e2e1dd" }} />
          <span className="text-xs" style={{ color: "#9b9b9b" }}>
            Already have an account?
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#e2e1dd" }} />
        </div>

        <Link
          href="/login"
          className="flex items-center justify-center w-full h-11 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
          style={{
            border: "1px solid #e2e1dd",
            color: "#0f1117",
            borderRadius: "8px",
          }}
        >
          Sign in instead
        </Link>
      </form>
    </AuthLayout>
  );
}
