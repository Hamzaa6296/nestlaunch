import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  id: string;
  label: string;
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
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: "#0f1117" }}
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        className="h-11 text-sm transition-all"
        style={{
          backgroundColor: "#ffffff",
          border: error ? "1px solid #dc2626" : "1px solid #e2e1dd",
          borderRadius: "8px",
          color: "#0f1117",
          outline: "none",
        }}
      />
      {error && (
        <p className="text-xs" style={{ color: "#dc2626" }}>
          {error}
        </p>
      )}
    </div>
  );
}
