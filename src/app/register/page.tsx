"use client";

import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/ui/AuthCard";
import type { AuthInput } from "@/lib/validations";

export default function RegisterPage() {
  const router = useRouter();

  async function onSubmit(values: AuthInput) {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Erro ao registrar");
        return;
      }
      alert("Registrado com sucesso!");
      router.refresh();
    } catch {
      alert("Erro ao registrar");
    }
  }

  return <AuthCard type="register" onSubmitAction={onSubmit} />;
}
