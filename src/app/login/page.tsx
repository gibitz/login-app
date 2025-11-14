"use client";

import { AuthCard } from "@/components/ui/AuthCard";
import type { AuthInput } from "@/lib/validations";

export default function LoginPage() {
    

    async function onSubmit(values: AuthInput) {
        try {
            const res = await fetch("/api/auth/login", {
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
            if (!res.ok) alert(data.error || "Erro ao fazer login");
        } catch {
            alert("Erro ao fazer login");
        }
    }

    return <AuthCard type="login" onSubmitAction={onSubmit} />;
}
