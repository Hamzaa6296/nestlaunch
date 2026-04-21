"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, logout } from "@/store/authSlice";
import { authApi } from "@/lib/auth";

export default function SettingsPage() {
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
    toast.success("Logged out");
    router.push("/login");
  };

  const settingsSections = [
    {
      title: "Security",
      items: [
        {
          label: "Change Password",
          description: "Update your account password",
          badge: "Free",
          badgeColor: "#16a34a",
          badgeBg: "#f0fdf4",
          badgeBorder: "#bbf7d0",
        },
        {
          label: "Two-Factor Authentication",
          description: "Add an extra layer of security",
          badge: "Pro",
          badgeColor: "#b45309",
          badgeBg: "#fffbeb",
          badgeBorder: "#fde68a",
        },
        {
          label: "Active Sessions",
          description: "Manage your logged in devices",
          badge: "Pro",
          badgeColor: "#b45309",
          badgeBg: "#fffbeb",
          badgeBorder: "#fde68a",
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          label: "Email Notifications",
          description: "Receive updates via email",
          badge: "Free",
          badgeColor: "#16a34a",
          badgeBg: "#f0fdf4",
          badgeBorder: "#bbf7d0",
        },
        {
          label: "Push Notifications",
          description: "Browser push notifications",
          badge: "Pro",
          badgeColor: "#b45309",
          badgeBg: "#fffbeb",
          badgeBorder: "#fde68a",
        },
      ],
    },
    {
      title: "Danger Zone",
      items: [
        {
          label: "Delete Account",
          description: "Permanently delete your account and all data",
          badge: "Pro",
          badgeColor: "#dc2626",
          badgeBg: "#fef2f2",
          badgeBorder: "#fecaca",
        },
      ],
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
      {/* Sidebar */}
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
        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {[
            {
              label: "Dashboard",
              path: "/dashboard",
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
            },
            {
              label: "Profile",
              path: "/dashboard/profile",
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ),
            },
            {
              label: "Settings",
              path: "/dashboard/settings",
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 2v3M12 19v3M2 12h3M19 12h3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ),
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 10px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: item.label === "Settings" ? 500 : 400,
                color: item.label === "Settings" ? "#f8f7f4" : "#6b7280",
                backgroundColor:
                  item.label === "Settings" ? "#1a1d27" : "transparent",
                border: "none",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              }}
            >
              <span
                style={{
                  color: item.label === "Settings" ? "#c8a96e" : "#4b5563",
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
        <div style={{ borderTop: "1px solid #1a1d27", paddingTop: "16px" }}>
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

      {/* Main */}
      <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
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
            Settings
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Manage your account preferences
          </p>
        </div>

        {settingsSections.map((section) => (
          <div key={section.title} style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "0 0 10px",
              }}
            >
              {section.title}
            </h2>
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e1dd",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    borderBottom:
                      i < section.items.length - 1
                        ? "1px solid #f1f0ec"
                        : "none",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#0f1117",
                        margin: "0 0 2px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 12px",
                      backgroundColor: item.badgeBg,
                      color: item.badgeColor,
                      border: `1px solid ${item.badgeBorder}`,
                      borderRadius: "100px",
                      fontSize: "12px",
                      fontWeight: 600,
                      flexShrink: 0,
                      marginLeft: "16px",
                    }}
                  >
                    {item.badge === "Pro" ? "💎 " : ""}
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
