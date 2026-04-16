"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/auth";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

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
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await authApi.login(form);
      dispatch(setCredentials({ user: response.user, token: response.token }));

      // Also set cookie for middleware
      document.cookie = `token=${response.token}; path=/; max-age=${7 * 24 * 60 * 60}`;

      toast.success("Welcome back!");
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your NestLaunch account"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium"
              style={{ color: "#0f1117" }}
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs hover:underline"
              style={{ color: "#6b6b6b" }}
            >
              Forgot password?
            </Link>
          </div>
          <FormInput
            id="password"
            label=""
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            disabled={isLoading}
            autoComplete="current-password"
          />
        </div>

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
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: "#e2e1dd" }} />
          <span className="text-xs" style={{ color: "#9b9b9b" }}>
            New to NestLaunch?
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#e2e1dd" }} />
        </div>

        <Link
          href="/signup"
          className="flex items-center justify-center w-full h-11 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
          style={{
            border: "1px solid #e2e1dd",
            color: "#0f1117",
            borderRadius: "8px",
          }}
        >
          Create an account
        </Link>
      </form>
    </AuthLayout>
  );
}
