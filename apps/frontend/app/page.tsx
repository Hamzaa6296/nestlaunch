import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1e2130 1px, transparent 0)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "640px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "#c8a96e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "18px",
              color: "#0f1117",
            }}
          >
            N
          </div>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#f8f7f4",
              fontFamily: "var(--font-dm-serif), Georgia, serif",
              letterSpacing: "-0.02em",
            }}
          >
            NestLaunch
          </span>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(200,169,110,0.1)",
            border: "1px solid rgba(200,169,110,0.25)",
            borderRadius: "100px",
            padding: "5px 14px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#c8a96e",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              color: "#c8a96e",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            Open Source · Free Forever
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-dm-serif), Georgia, serif",
            fontSize: "3.8rem",
            lineHeight: 1.1,
            color: "#f8f7f4",
            margin: "0 0 20px",
            fontWeight: 400,
            letterSpacing: "-0.03em",
          }}
        >
          Production-ready
          <br />
          <span style={{ color: "#c8a96e" }}>SaaS boilerplate.</span>
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#6b7280",
            lineHeight: 1.7,
            margin: "0 0 40px",
            maxWidth: "480px",
          }}
        >
          NestJS + Next.js + MongoDB + Stripe. Skip the boring setup and focus
          on building your product.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "56px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/signup"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "46px",
              padding: "0 24px",
              backgroundColor: "#c8a96e",
              color: "#0f1117",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "opacity 0.15s ease",
            }}
          >
            Get Started Free →
          </Link>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "46px",
              padding: "0 24px",
              backgroundColor: "transparent",
              color: "#f8f7f4",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid #2a2d3a",
              transition: "border-color 0.15s ease",
            }}
          >
            Sign In
          </Link>
          <a
            href="https://github.com/Hamzaa6296/nestlaunch"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              height: "46px",
              padding: "0 20px",
              backgroundColor: "transparent",
              color: "#9ca3af",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid #2a2d3a",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#9ca3af">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Tech Stack Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          {[
            "NestJS",
            "Next.js 16",
            "MongoDB",
            "Stripe",
            "TypeScript",
            "Turborepo",
          ].map((tech) => (
            <span
              key={tech}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 12px",
                backgroundColor: "#1a1d27",
                color: "#6b7280",
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 500,
                border: "1px solid #2a2d3a",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
