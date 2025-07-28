"use client";

import { Input } from "./input";

type SettingsInputProps = {
  id: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
};

export default function SettingsInput({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  required
}: SettingsInputProps) {
  return (
    <Input
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        aria-label={placeholder || `Enter your ${id}`}
        className="border-none bg-zinc-900 h-11"
    />
  );
}
