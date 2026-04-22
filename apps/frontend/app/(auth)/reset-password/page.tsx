"use client";

import { Suspense } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function RedirectToForgot() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/forgot-password");
  }, [router]);

  return (
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
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <RedirectToForgot />
    </Suspense>
  );
}
