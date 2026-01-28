import React from "react";
import { Label } from "@/components/ui/label";

export function FormFieldBlock({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {children}

      {error && (
        <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
