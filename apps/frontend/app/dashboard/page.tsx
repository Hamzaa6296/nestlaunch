"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, logout } from "@/store/authSlice";
import { authApi } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authApi.getMe();
        dispatch(setUser(userData));
      } catch {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "token=; path=/; max-age=0";
    toast.success("Logged out successfully");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f8f7f4" }}
      >
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#0f1117"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="#0f1117"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-sm" style={{ color: "#6b6b6b" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f8f7f4" }}>
      {/* Sidebar */}
      <div
        className="w-64 flex flex-col py-8 px-5"
        style={{
          backgroundColor: "#0f1117",
          borderRight: "1px solid #1a1d27",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#c8a96e" }}
          >
            <span className="text-sm font-bold" style={{ color: "#0f1117" }}>
              N
            </span>
          </div>
          <span
            className="text-base font-semibold"
            style={{ color: "#f8f7f4" }}
          >
            NestLaunch
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1">
          {[
            {
              icon: "⊡",
              label: "Dashboard",
              active: true,
            },
            { icon: "◎", label: "Profile", active: false },
            { icon: "◈", label: "Settings", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left"
              style={{
                backgroundColor: item.active ? "#1a1d27" : "transparent",
                color: item.active ? "#f8f7f4" : "#6b6b6b",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div
          className="mt-auto pt-4"
          style={{ borderTop: "1px solid #1a1d27" }}
        >
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
              style={{ backgroundColor: "#c8a96e", color: "#0f1117" }}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{ color: "#f8f7f4" }}
              >
                {user?.name}
              </p>
              <p className="text-xs truncate" style={{ color: "#6b6b6b" }}>
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
            style={{ color: "#6b6b6b" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-serif mb-1" style={{ color: "#0f1117" }}>
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm" style={{ color: "#6b6b6b" }}>
            Here&apos;s what&apos;s happening with your account
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {[
            {
              label: "Account Status",
              value: "Active",
              color: "#22c55e",
              bg: "#f0fdf4",
            },
            {
              label: "Email Verified",
              value: user?.isEmailVerified ? "Yes" : "No",
              color: user?.isEmailVerified ? "#22c55e" : "#ef4444",
              bg: user?.isEmailVerified ? "#f0fdf4" : "#fef2f2",
            },
            {
              label: "Role",
              value: user?.role || "user",
              color: "#c8a96e",
              bg: "#fffbeb",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e1dd",
              }}
            >
              <p
                className="text-xs font-medium mb-2"
                style={{ color: "#6b6b6b" }}
              >
                {stat.label}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                  style={{
                    backgroundColor: stat.bg,
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Account Info Card */}
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e1dd",
          }}
        >
          <h2
            className="text-base font-semibold mb-5"
            style={{ color: "#0f1117" }}
          >
            Account Information
          </h2>
          <div className="space-y-4">
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email Address", value: user?.email },
              { label: "Account Role", value: user?.role },
              {
                label: "User ID",
                value: user?.id,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: "1px solid #f1f0ec" }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "#6b6b6b" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#0f1117" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Version CTA */}
        <div
          className="mt-5 rounded-xl p-6 flex items-center justify-between"
          style={{ backgroundColor: "#0f1117" }}
        >
          <div>
            <h3
              className="text-base font-semibold mb-1"
              style={{ color: "#f8f7f4" }}
            >
              Upgrade to Pro
            </h3>
            <p className="text-sm" style={{ color: "#6b6b6b" }}>
              Get Stripe payments, admin panel, and more.
            </p>
          </div>
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-medium flex-shrink-0"
            style={{ backgroundColor: "#c8a96e", color: "#0f1117" }}
          >
            View Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
