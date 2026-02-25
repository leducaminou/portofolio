"use client";

import React, { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5 flex-1">
        {label && (
          <label className="text-sm font-medium text-foreground/80 ml-1">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            className={`form-input min-h-[100px] py-3 resize-none ${
              error ? "border-error/50 focus:border-error" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-error ml-1">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
