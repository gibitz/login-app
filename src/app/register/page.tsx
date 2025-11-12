"use client";

import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/AuthCard";
import type { Input } from "@/lib/validations";

export default function RegisterPage() {
    const router = useRouter();

    async function onSubmit(values: Input) {
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
            console.log("Usuario:", data.user);
        } catch (e) {
            alert("Erro ao registrar");
            console.error(e);
        }
    }
    
    return <AuthCard type="register" onSubmitAction={onSubmit} />;
}
