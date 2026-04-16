import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12"
        style={{ backgroundColor: "#0f1117" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#c8a96e" }}
          >
            <span className="text-sm font-bold" style={{ color: "#0f1117" }}>
              N
            </span>
          </div>
          <span className="text-lg font-semibold" style={{ color: "#f8f7f4" }}>
            NestLaunch
          </span>
        </Link>

        {/* Middle Content */}
        <div>
          <div
            className="text-5xl font-serif leading-tight mb-6"
            style={{ color: "#f8f7f4" }}
          >
            Build your SaaS
            <br />
            <span style={{ color: "#c8a96e" }}>10x faster.</span>
          </div>
          <p className="text-base leading-relaxed" style={{ color: "#8b8b8b" }}>
            Production-ready boilerplate with authentication, payments, and
            everything you need to launch.
          </p>

          {/* Feature List */}
          <div className="mt-10 space-y-4">
            {[
              "NestJS + Next.js Monorepo",
              "JWT Auth with Email OTP",
              "Stripe Payments Ready",
              "MongoDB + Swagger Docs",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "#c8a96e20",
                    border: "1px solid #c8a96e",
                  }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#c8a96e"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "#a0a0a0" }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div>
          <div
            className="flex items-center gap-3 p-4 rounded-xl"
            style={{ backgroundColor: "#1a1d27" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
              style={{ backgroundColor: "#c8a96e", color: "#0f1117" }}
            >
              H
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "#f8f7f4" }}>
                Hamza Ahmed
              </p>
              <p className="text-xs" style={{ color: "#6b6b6b" }}>
                Full-stack Developer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16"
        style={{ backgroundColor: "#f8f7f4" }}
      >
        {/* Mobile Logo */}
        <div className="lg:hidden mb-10">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#0f1117" }}
            >
              <span className="text-sm font-bold" style={{ color: "#c8a96e" }}>
                N
              </span>
            </div>
            <span
              className="text-lg font-semibold"
              style={{ color: "#0f1117" }}
            >
              NestLaunch
            </span>
          </Link>
        </div>

        <div className="w-full max-w-[420px] mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h1
              className="text-3xl font-serif mb-2"
              style={{ color: "#0f1117" }}
            >
              {title}
            </h1>
            <p className="text-sm" style={{ color: "#6b6b6b" }}>
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
