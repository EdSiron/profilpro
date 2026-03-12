"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
        {label && (
          <label
            className="text-sm font-medium"
            style={{ color: "#0F172A" }}
          >
            {label}
            {props.required && (
              <span className="ml-1" style={{ color: "#ef4444" }}>*</span>
            )}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-3 py-2.5 rounded-lg border text-sm transition-all outline-none",
            "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/10",
            className
          )}
          style={{ minWidth: 0, width: "100%", boxSizing: "border-box" }}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs" style={{ color: "#94a3b8" }}>{hint}</p>
        )}
        {error && (
          <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;