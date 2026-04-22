"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { authApi } from "@/lib/auth";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const handleChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const n = [...otp];
    n[i] = v.slice(-1);
    setOtp(n);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter the complete 6-digit OTP");
      return;
    }
    setIsLoading(true);
    try {
      await authApi.verifyOtp(email, code);
      toast.success("Email verified! Please login.");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const filled = otp.join("").length;

  return (
    <AuthLayout
      title="Check your email"
      subtitle={`We sent a 6-digit OTP to ${email || "your email"}`}
    >
      <form
        onSubmit={handleSubmit}
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
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={isLoading}
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
                transition: "border-color 0.15s",
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
            transition: "opacity 0.15s",
          }}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#9ca3af",
            margin: 0,
          }}
        >
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={() => toast.info("Check your spam folder")}
            style={{
              color: "#0f1117",
              fontWeight: 500,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            }}
          >
            Resend OTP
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}

export default function VerifyOtpPage() {
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
      <VerifyOtpForm />
    </Suspense>
  );
}
