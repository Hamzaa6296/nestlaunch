"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, logout } from "@/store/authSlice";
import { authApi } from "@/lib/auth";

const navItems = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
    label: "Dashboard",
    active: true,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Profile",
    active: false,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2v3M12 19v3M2 12h3M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Settings",
    active: false,
  },
];

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
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8f7f4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "3px solid #e2e1dd",
              borderTopColor: "#0f1117",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Account Status",
      value: "Active",
      valueColor: "#16a34a",
      valueBg: "#f0fdf4",
      valueBorder: "#bbf7d0",
    },
    {
      label: "Email Verified",
      value: user?.isEmailVerified ? "Verified" : "Pending",
      valueColor: user?.isEmailVerified ? "#16a34a" : "#d97706",
      valueBg: user?.isEmailVerified ? "#f0fdf4" : "#fffbeb",
      valueBorder: user?.isEmailVerified ? "#bbf7d0" : "#fde68a",
    },
    {
      label: "Account Role",
      value: user?.role
        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
        : "User",
      valueColor: "#b45309",
      valueBg: "#fffbeb",
      valueBorder: "#fde68a",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f8f7f4",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      }}
    >
      {/* ── Sidebar ── */}
      <div
        style={{
          width: "240px",
          flexShrink: 0,
          backgroundColor: "#0f1117",
          display: "flex",
          flexDirection: "column",
          padding: "28px 16px",
          borderRight: "1px solid #1a1d27",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 8px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "7px",
              backgroundColor: "#c8a96e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "13px",
              color: "#0f1117",
              flexShrink: 0,
            }}
          >
            N
          </div>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#f8f7f4",
              letterSpacing: "-0.01em",
            }}
          >
            NestLaunch
          </span>
        </div>

        {/* Nav section label */}
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#374151",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "0 8px",
            marginBottom: "8px",
          }}
        >
          Menu
        </p>

        {/* Nav Items */}
        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 10px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: item.active ? 500 : 400,
                color: item.active ? "#f8f7f4" : "#6b7280",
                backgroundColor: item.active ? "#1a1d27" : "transparent",
                border: "none",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                transition: "background-color 0.15s ease, color 0.15s ease",
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              }}
            >
              <span
                style={{
                  color: item.active ? "#c8a96e" : "#4b5563",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom — User */}
        <div
          style={{
            borderTop: "1px solid #1a1d27",
            paddingTop: "16px",
          }}
        >
          {/* User info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#c8a96e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "13px",
                color: "#0f1117",
                flexShrink: 0,
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#f8f7f4",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.name}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#4b5563",
                  margin: "2px 0 0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.email}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 10px",
              borderRadius: "8px",
              fontSize: "13px",
              color: "#6b7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              transition: "color 0.15s ease",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sign out
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "var(--font-dm-serif), Georgia, serif",
              fontSize: "1.9rem",
              fontWeight: 400,
              color: "#0f1117",
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Here&apos;s an overview of your account
          </p>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e1dd",
                borderRadius: "12px",
                padding: "20px 22px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#9ca3af",
                  margin: "0 0 10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  backgroundColor: stat.valueBg,
                  color: stat.valueColor,
                  border: `1px solid ${stat.valueBorder}`,
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Account Info */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e1dd",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#0f1117",
              margin: "0 0 20px",
            }}
          >
            Account Information
          </h2>
          <div>
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email Address", value: user?.email },
              { label: "Role", value: user?.role },
              { label: "User ID", value: user?.id },
            ].map((item, index, arr) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom:
                    index < arr.length - 1 ? "1px solid #f1f0ec" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#0f1117",
                    fontWeight: 500,
                    maxWidth: "260px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.value || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro CTA */}
        <div
          style={{
            backgroundColor: "#0f1117",
            borderRadius: "12px",
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            backgroundImage:
              "radial-gradient(circle at 80% 50%, rgba(200,169,110,0.08) 0%, transparent 60%)",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#f8f7f4",
                margin: "0 0 6px",
              }}
            >
              Unlock Pro Features
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Stripe payments, admin panel, file uploads, and more.
            </p>
          </div>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 20px",
              backgroundColor: "#c8a96e",
              color: "#0f1117",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            }}
          >
            View Pro →
          </button>
        </div>
      </div>
    </div>
  );
}
