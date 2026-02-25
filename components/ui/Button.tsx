"use client";

import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger" | "ghost";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary: "btn-primary",
      outline: "btn-outline",
      danger: "bg-error/10 text-error border border-error/20 hover:bg-error/20",
      ghost: "hover:bg-surface-light text-muted hover:text-foreground",
    };

    const baseClass =
      variant === "primary" || variant === "outline"
        ? variants[variant]
        : `px-4 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${variants[variant]}`;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClass} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
        {...props}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
