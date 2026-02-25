import React, { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="text-sm font-medium text-muted">{label}</label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-light/20 focus:border-accent-light transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[120px] resize-y ${
            error ? "border-error focus:border-error focus:ring-error/20" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error font-medium">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
