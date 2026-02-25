"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5 flex-1">
        {label && (
          <label className="text-sm font-medium text-foreground/80 ml-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`form-input ${error ? "border-error/50 focus:border-error" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-error ml-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
