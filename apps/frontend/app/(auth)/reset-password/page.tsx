"use client";

import { Suspense } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { FormInput } from "@/components/form-input";
import { authApi } from "@/lib/auth";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({ password: "", confirm: "" });

  const validate = () => {
    const e = { password: "", confirm: "" };
    let ok = true;
    if (!form.password || form.password.length < 6) {
      e.password = "Minimum 6 characters";
      ok = false;
    }
    if (form.password !== form.confirm) {
      e.confirm = "Passwords do not match";
      ok = false;
    }
    setErrors(e);
    return ok;
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
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthLayout
        title="Invalid link"
        subtitle="This reset link is invalid or has expired"
      >
        <Link
          href="/forgot-password"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "46px",
            backgroundColor: "#0f1117",
            color: "#f8f7f4",
            textDecoration: "none",
            borderRadius: "9px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Request New Link
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset password" subtitle="Enter your new password below">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
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
          id="confirm"
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          error={errors.confirm}
          disabled={isLoading}
          autoComplete="new-password"
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            height: "46px",
            backgroundColor: "#0f1117",
            color: "#f8f7f4",
            border: "none",
            borderRadius: "9px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            transition: "opacity 0.15s",
          }}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8f7f4",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid #e2e1dd",
              borderTopColor: "#0f1117",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
