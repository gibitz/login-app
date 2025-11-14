"use client";

import { AuthCard } from "@/components/ui/AuthCard";
import type { AuthInput } from "@/lib/validations";

export default function RegisterPage() {


    async function onSubmit(values: AuthInput) {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.redirected) {
                window.location.href = res.url;
                return;
            }
            const data = await res.json();
            if (!res.ok) alert(data.error || "Erro ao registrar");
        } catch {
            alert("Erro ao registrar");
        }
    }

    return <AuthCard type="register" onSubmitAction={onSubmit} />;
}
