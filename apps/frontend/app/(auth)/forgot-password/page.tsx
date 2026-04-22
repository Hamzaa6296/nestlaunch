"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { FormInput } from "@/components/form-input";
import { authApi } from "@/lib/auth";

type Step = "email" | "otp" | "password";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    new: "",
    confirm: "",
  });
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // ─── Step 1: Email ────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email");
      return;
    }
    setEmailError("");
    setIsLoading(true);
    try {
      await authApi.forgotPassword(email);
      toast.success("OTP sent to your email!");
      setStep("otp");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── OTP Input Handlers ───────────────────────────────
  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const n = [...otp];
    n[i] = v.slice(-1);
    setOtp(n);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const p = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(p)) return;
    const n = [...otp];
    p.split("").forEach((c, i) => {
      if (i < 6) n[i] = c;
    });
    setOtp(n);
    refs.current[Math.min(p.length, 5)]?.focus();
  };

  // ─── Step 2: Verify OTP ───────────────────────────────
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter the complete 6-digit OTP");
      return;
    }
    setIsLoading(true);
    try {
      await authApi.verifyResetOtp(email, code);
      toast.success("OTP verified!");
      setStep("password");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Step 3: New Password ─────────────────────────────
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = { new: "", confirm: "" };
    let ok = true;
    if (!newPassword || newPassword.length < 6) {
      errors.new = "Minimum 6 characters";
      ok = false;
    }
    if (newPassword !== confirmPassword) {
      errors.confirm = "Passwords do not match";
      ok = false;
    }
    setPasswordErrors(errors);
    if (!ok) return;

    setIsLoading(true);
    try {
      await authApi.resetPassword(email, otp.join(""), newPassword);
      toast.success("Password reset successfully!");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Step Indicator ───────────────────────────────────
  const steps = ["Email", "Verify OTP", "New Password"];
  const currentStepIndex = step === "email" ? 0 : step === "otp" ? 1 : 2;

  const StepIndicator = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "28px",
      }}
    >
      {steps.map((s, i) => (
        <div
          key={s}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: i <= currentStepIndex ? "#0f1117" : "#e2e1dd",
                color: i <= currentStepIndex ? "#f8f7f4" : "#9ca3af",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {i < currentStepIndex ? "✓" : i + 1}
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: i === currentStepIndex ? 600 : 400,
                color: i === currentStepIndex ? "#0f1117" : "#9ca3af",
              }}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                width: "20px",
                height: "1px",
                backgroundColor: i < currentStepIndex ? "#0f1117" : "#e2e1dd",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );

  // ─── Render Step 1: Email ─────────────────────────────
  if (step === "email") {
    return (
      <AuthLayout
        title="Forgot password?"
        subtitle="Enter your email to receive a reset OTP"
      >
        <StepIndicator />
        <form
          onSubmit={handleEmailSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Sending OTP...
              </>
            ) : (
              "Send OTP →"
            )}
          </button>
          <Link
            href="/login"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#6b7280",
              textDecoration: "none",
            }}
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

  // ─── Render Step 2: OTP ───────────────────────────────
  if (step === "otp") {
    const filled = otp.join("").length;
    return (
      <AuthLayout
        title="Enter reset OTP"
        subtitle={`We sent a 6-digit OTP to ${email}`}
      >
        <StepIndicator />
        <form
          onSubmit={handleOtpSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                onPaste={handleOtpPaste}
                disabled={isLoading}
                autoFocus={i === 0}
                style={{
                  width: "52px",
                  height: "58px",
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: 700,
                  backgroundColor: "#ffffff",
                  border: digit ? "2px solid #0f1117" : "1.5px solid #e2e1dd",
                  borderRadius: "10px",
                  outline: "none",
                  color: "#0f1117",
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  transition: "all 0.15s",
                  boxShadow: digit ? "0 0 0 3px rgba(15,17,23,0.06)" : "none",
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || filled !== 6}
            style={{
              width: "100%",
              height: "46px",
              backgroundColor: "#0f1117",
              color: "#f8f7f4",
              border: "none",
              borderRadius: "9px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: isLoading || filled !== 6 ? "not-allowed" : "pointer",
              opacity: filled !== 6 ? 0.45 : 1,
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            }}
          >
            {isLoading ? "Verifying..." : "Verify OTP →"}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              type="button"
              onClick={() => setStep("email")}
              style={{
                fontSize: "13px",
                color: "#6b7280",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              }}
            >
              ← Change email
            </button>
            <button
              type="button"
              onClick={async () => {
                setIsLoading(true);
                try {
                  await authApi.forgotPassword(email);
                  toast.success("New OTP sent!");
                  setOtp(["", "", "", "", "", ""]);
                } catch {
                  toast.error("Failed to resend");
                } finally {
                  setIsLoading(false);
                }
              }}
              style={{
                fontSize: "13px",
                color: "#0f1117",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              }}
            >
              Resend OTP
            </button>
          </div>
        </form>
      </AuthLayout>
    );
  }

  // ─── Render Step 3: New Password ──────────────────────
  return (
    <AuthLayout
      title="Set new password"
      subtitle="Enter and confirm your new password"
    >
      <StepIndicator />
      <form
        onSubmit={handlePasswordSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <FormInput
          id="newPassword"
          label="New Password"
          type="password"
          placeholder="Minimum 6 characters"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={passwordErrors.new}
          disabled={isLoading}
          autoComplete="new-password"
        />
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Repeat your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={passwordErrors.confirm}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {isLoading ? (
            <>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Updating...
            </>
          ) : (
            "Reset Password ✓"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
