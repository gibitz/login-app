"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || "Erro ao fazer logout");
                return;
            }

            alert("Logout bem-sucedido!");
            router.refresh();
            
        } catch (e) {
            alert("Erro ao fazer logout");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg"
        >
            {loading ? "Saindo..." : "Sair"}
        </button>
    );
}

export default LogoutButton;
