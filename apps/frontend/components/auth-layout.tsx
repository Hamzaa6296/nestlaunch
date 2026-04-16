import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      }}
    >
      {/* ── Left Panel ── */}
      <div
        style={{
          width: "44%",
          backgroundColor: "#0f1117",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
        className="hidden lg:flex"
      >
        {/* Subtle background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #1e2130 1px, transparent 0)",
            backgroundSize: "32px 32px",
            opacity: 0.4,
          }}
        />

        {/* Content above grid */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                backgroundColor: "#c8a96e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "15px",
                color: "#0f1117",
                flexShrink: 0,
              }}
            >
              N
            </div>
            <span
              style={{
                fontSize: "17px",
                fontWeight: 600,
                color: "#f8f7f4",
                letterSpacing: "-0.01em",
              }}
            >
              NestLaunch
            </span>
          </Link>
        </div>

        {/* Middle */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "var(--font-dm-serif), Georgia, serif",
              fontSize: "2.6rem",
              lineHeight: 1.2,
              color: "#f8f7f4",
              marginBottom: "16px",
              fontWeight: 400,
            }}
          >
            Build your SaaS{" "}
            <span style={{ color: "#c8a96e" }}>10x faster.</span>
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#6b7280",
              lineHeight: 1.6,
              maxWidth: "340px",
            }}
          >
            Production-ready boilerplate with auth, payments, and everything you
            need to launch fast.
          </p>

          {/* Features */}
          <div
            style={{
              marginTop: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {[
              "NestJS + Next.js Monorepo",
              "JWT Auth with Email OTP",
              "Stripe Payments Ready",
              "MongoDB + Swagger Docs",
            ].map((feature) => (
              <div
                key={feature}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(200, 169, 110, 0.12)",
                    border: "1px solid rgba(200, 169, 110, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path
                      d="M1 3.5L3 5.5L8 1"
                      stroke="#c8a96e"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span style={{ fontSize: "14px", color: "#9ca3af" }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — User card */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              backgroundColor: "#1a1d27",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid #2a2d3a",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#c8a96e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "15px",
                color: "#0f1117",
                flexShrink: 0,
              }}
            >
              H
            </div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#f8f7f4",
                  margin: 0,
                }}
              >
                Hamza Ahmed
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: "2px 0 0",
                }}
              >
                Full-stack Developer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f8f7f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 64px",
        }}
      >
        {/* Mobile Logo */}
        <div style={{ marginBottom: "40px" }} className="lg:hidden">
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "#0f1117",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px",
                color: "#c8a96e",
              }}
            >
              N
            </div>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#0f1117",
              }}
            >
              NestLaunch
            </span>
          </Link>
        </div>

        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          {/* Title */}
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{
                fontFamily: "var(--font-dm-serif), Georgia, serif",
                fontSize: "2rem",
                fontWeight: 400,
                color: "#0f1117",
                margin: "0 0 8px",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
