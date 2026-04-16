"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSubmitted(true);
      toast.success("Reset link sent! Check your inbox.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle="We've sent a password reset link to your email"
      >
        <div className="space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "#f0fdf4",
                border: "2px solid #22c55e",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm" style={{ color: "#6b6b6b" }}>
              We sent a reset link to{" "}
              <span className="font-medium" style={{ color: "#0f1117" }}>
                {email}
              </span>
            </p>
          </div>

          <Link
            href="/login"
            className="flex items-center justify-center w-full h-11 text-sm font-medium rounded-lg"
            style={{
              backgroundColor: "#0f1117",
              color: "#f8f7f4",
              borderRadius: "8px",
            }}
          >
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="hamza@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          disabled={isLoading}
          autoComplete="email"
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
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm hover:underline"
          style={{ color: "#6b6b6b" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to login
        </Link>
      </form>
    </AuthLayout>
  );
}
