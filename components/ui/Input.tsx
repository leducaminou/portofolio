import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="text-sm font-medium text-muted">{label}</label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-light/20 focus:border-accent-light transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? "border-error focus:border-error focus:ring-error/20" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error font-medium">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
