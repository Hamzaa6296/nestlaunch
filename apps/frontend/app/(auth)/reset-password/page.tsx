"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const validate = () => {
    const newErrors = { password: "", confirmPassword: "" };
    let isValid = true;

    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    setIsLoading(true);
    try {
      await authApi.resetPassword(token, form.password);
      toast.success("Password reset successfully!");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthLayout
        title="Invalid link"
        subtitle="This password reset link is invalid or has expired"
      >
        <Link
          href="/forgot-password"
          className="flex items-center justify-center w-full h-11 text-sm font-medium rounded-lg"
          style={{
            backgroundColor: "#0f1117",
            color: "#f8f7f4",
            borderRadius: "8px",
          }}
        >
          Request New Link
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset password" subtitle="Enter your new password below">
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="password"
          label="New Password"
          type="password"
          placeholder="Minimum 6 characters"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
          disabled={isLoading}
          autoComplete="new-password"
        />

        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Repeat your new password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
          disabled={isLoading}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 text-sm font-medium"
          style={{
            backgroundColor: "#0f1117",
            color: "#f8f7f4",
            borderRadius: "8px",
          }}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </AuthLayout>
  );
}
