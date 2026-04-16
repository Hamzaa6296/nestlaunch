import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0f1117" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#c8a96e" }}
        >
          <span className="text-xl font-bold" style={{ color: "#0f1117" }}>
            N
          </span>
        </div>
        <span
          className="text-2xl font-semibold"
          style={{ color: "#f8f7f4", fontFamily: "var(--font-dm-serif)" }}
        >
          NestLaunch
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-center mb-4 leading-tight"
        style={{
          color: "#f8f7f4",
          fontFamily: "var(--font-dm-serif)",
          fontSize: "3.5rem",
        }}
      >
        Production-ready SaaS
        <br />
        <span style={{ color: "#c8a96e" }}>boilerplate.</span>
      </h1>

      <p
        className="text-center mb-10 max-w-md text-base"
        style={{ color: "#6b6b6b" }}
      >
        NestJS + Next.js + MongoDB + Stripe. Everything you need to launch your
        SaaS in days, not months.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <Link
          href="/signup"
          className="px-6 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#c8a96e", color: "#0f1117" }}
        >
          Get Started Free
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "transparent",
            color: "#f8f7f4",
            border: "1px solid #2a2d37",
          }}
        >
          Sign In
        </Link>
      </div>

      {/* Tech Stack */}
      <div className="mt-16 flex items-center gap-6">
        {["NestJS", "Next.js", "MongoDB", "Stripe", "TypeScript"].map(
          (tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: "#1a1d27",
                color: "#6b6b6b",
                border: "1px solid #2a2d37",
              }}
            >
              {tech}
            </span>
          ),
        )}
      </div>

      {/* GitHub Link */}
      <div className="mt-8">
        <a
          href="https://github.com/Hamzaa6296/nestlaunch"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-2 transition-colors hover:opacity-80"
          style={{ color: "#6b6b6b" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#6b6b6b">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          Star on GitHub
        </a>
      </div>
    </div>
  );
}
