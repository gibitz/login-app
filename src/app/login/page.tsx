"use client";

import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/ui/AuthCard";
import type { AuthInput } from "@/lib/validations";

export default function LoginPage() {
    const router = useRouter();

    async function onSubmit(values: AuthInput) {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Erro ao fazer login");
                return;
            }
            alert("Login bem-sucedido!");
            window.dispatchEvent(new CustomEvent("authChanged", { detail: data.user }));
            router.push("/");
            console.log("Usuário:", data.user);
        } catch (e) {
            alert("Erro ao fazer login");
            console.error(e);
        }
    }
    
    return <AuthCard type="login" onSubmitAction={onSubmit} />;
}
