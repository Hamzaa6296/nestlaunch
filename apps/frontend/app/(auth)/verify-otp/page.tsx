"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/auth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      await authApi.verifyOtp(email, otpString);
      toast.success("Email verified! Please login.");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Check your email"
      subtitle={`We sent a 6-digit OTP to ${email || "your email"}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Boxes */}
        <div className="flex gap-3 justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isLoading}
              className="w-12 h-14 text-center text-xl font-semibold rounded-lg outline-none transition-all"
              style={{
                backgroundColor: "#ffffff",
                border: digit ? "2px solid #0f1117" : "1px solid #e2e1dd",
                color: "#0f1117",
              }}
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={isLoading || otp.join("").length !== 6}
          className="w-full h-11 text-sm font-medium"
          style={{
            backgroundColor: "#0f1117",
            color: "#f8f7f4",
            borderRadius: "8px",
            opacity: otp.join("").length !== 6 ? 0.5 : 1,
          }}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>

        <p className="text-center text-sm" style={{ color: "#6b6b6b" }}>
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            className="font-medium hover:underline"
            style={{ color: "#0f1117" }}
            onClick={() => toast.info("Please check your spam folder")}
          >
            Resend OTP
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
