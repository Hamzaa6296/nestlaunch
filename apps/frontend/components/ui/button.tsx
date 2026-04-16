import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", style, ...props },
    ref,
  ) => {
    const baseStyles: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      cursor: "pointer",
      border: "none",
      transition: "opacity 0.15s ease",
      textDecoration: "none",
      whiteSpace: "nowrap",
    };

    const variantStyles: React.CSSProperties =
      variant === "outline"
        ? {
            backgroundColor: "transparent",
            color: "#0f1117",
            border: "1px solid #e2e1dd",
          }
        : variant === "ghost"
          ? {
              backgroundColor: "transparent",
              color: "#6b6b6b",
            }
          : {
              backgroundColor: "#0f1117",
              color: "#f8f7f4",
            };

    const sizeStyles: React.CSSProperties =
      size === "sm"
        ? { height: "36px", padding: "0 14px", fontSize: "13px" }
        : size === "lg"
          ? { height: "48px", padding: "0 24px", fontSize: "15px" }
          : { height: "44px", padding: "0 20px" };

    return (
      <button
        ref={ref}
        className={cn(className)}
        style={{ ...baseStyles, ...variantStyles, ...sizeStyles, ...style }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
