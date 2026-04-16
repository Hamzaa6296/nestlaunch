import * as React from "react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(className)}
        ref={ref}
        style={{
          width: "100%",
          height: "44px",
          padding: "0 14px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e1dd",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#0f1117",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          outline: "none",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          boxSizing: "border-box",
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#0f1117";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(15, 17, 23, 0.08)";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e2e1dd";
          e.currentTarget.style.boxShadow = "none";
          props.onBlur?.(e);
        }}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
