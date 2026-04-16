import React from "react";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled,
  autoComplete,
}: FormInputProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#0f1117",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: "44px",
          padding: "0 14px",
          backgroundColor: disabled ? "#f5f4f1" : "#ffffff",
          border: error
            ? "1px solid #dc2626"
            : focused
              ? "1px solid #0f1117"
              : "1px solid #e2e1dd",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#0f1117",
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          outline: "none",
          boxShadow:
            focused && !error
              ? "0 0 0 3px rgba(15, 17, 23, 0.08)"
              : focused && error
                ? "0 0 0 3px rgba(220, 38, 38, 0.08)"
                : "none",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          boxSizing: "border-box",
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.7 : 1,
        }}
      />
      {error && (
        <p
          style={{
            fontSize: "12px",
            color: "#dc2626",
            margin: 0,
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
