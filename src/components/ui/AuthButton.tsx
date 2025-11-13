"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthButtonProps {
  label: string;
  onClick?: () => Promise<void> | void;
  redirectTo?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  width?: string;
}

function AuthButton({
  label,
  onClick,
  redirectTo,
  type = "button",
  disabled = false,
  variant = "primary",
  width = "w-36",
}: AuthButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (type === "submit") return;
    if (!onClick) return;

    try {
      setLoading(true);
      await onClick();
      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      alert("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  }

  const base = "font-semibold py-3 rounded-lg transition-colors duration-200";
  const variants: Record<string, string> = {
    primary: `bg-primary text-primary-foreground hover:bg-primary/90 ${width}`,
    secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/90 ${width}`,
    danger: `bg-red-600 text-white hover:bg-red-700 ${width}`,
  };

  const className = `${base} ${variants[variant]} ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? "Carregando..." : label}
    </button>
  );
}

export default AuthButton;
