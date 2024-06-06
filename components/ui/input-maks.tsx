"use client";

import React from "react";

import InputMask from "react-input-mask";

import { Label } from "@/components/ui/label";

interface MaskedInputProps {
  mask: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  messageError?: string;
}

const MaskedInput = ({
  label,
  messageError,
  mask,
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
}: MaskedInputProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label !== null && <Label>{label}</Label>}

      <InputMask
        mask={mask}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`flex h-9 w-full text-black rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        disabled={disabled}
      />

      {messageError !== undefined && (
        <p className="text-sm text-red-500">{messageError}</p>
      )}
    </div>
  );
};

export { MaskedInput };
