"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "./ui/AuthButton";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false); // 👈 AQUI

    async function fetchUser() {
        try {
            const res = await fetch("/api/auth/me", {
                cache: "no-store",
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUser();
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const onAuthChanged = (e: Event) => {
            const ev = e as CustomEvent;
            const updatedUser = ev.detail ?? null;
            setUser(updatedUser);
            setLoading(false);
        };

        window.addEventListener("authChanged", onAuthChanged as EventListener);
        return () =>
            window.removeEventListener(
                "authChanged",
                onAuthChanged as EventListener
            );
    }, []);

    async function handleLogout() {
        try {
            setLogoutLoading(true); 
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });
            if (res.ok) {
                window.dispatchEvent(
                    new CustomEvent("authChanged", { detail: null })
                );
                setUser(null);
                setMenuOpen(false);
                router.push("/login");
            } else {
                alert("Erro ao desconectar");
            }
        } catch {
            alert("Erro ao desconectar");
        } finally {
            setLogoutLoading(false); 
        }
    }

    return (
        <nav className="fixed top-0 left-0 w-full bg-card/90 backdrop-blur-sm py-4 px-6 shadow-md z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center w-full">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                    <span className="font-semibold text-lg">LoginApp</span>
                </Link>
                {loading ? (
                    <div className="text-sm text-gray-400 animate-pulse">
                        ...
                    </div>
                ) : (
                    user && (
                        <>
                            <div className="hidden sm:flex items-center gap-4">
                                <div className="font-semibold">
                                    <span className="font-normal text-gray-300">
                                        Olá,{" "}
                                    </span>
                                    {user.email
                                        .split("@")[0]
                                        .split(".")
                                        .map(
                                            (part: string) =>
                                                part.charAt(0).toUpperCase() +
                                                part.slice(1)
                                        )
                                        .join(" ")}
                                    <span className="block text-xs font-light text-gray-400">
                                        {user.email}
                                    </span>
                                </div>

                                <Link href="/create">
                                    <AuthButton
                                        label="Nova Tarefa"
                                        variant="primary"
                                    />
                                </Link>

                                <AuthButton
                                    label="Sair"
                                    onClick={handleLogout}
                                    variant="danger"
                                    width="w-28"
                                    disabled={logoutLoading}
                                />
                            </div>

                            <div className="sm:hidden">
                                <button
                                    onClick={() => setMenuOpen((prev) => !prev)}
                                    className="p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
                                >
                                    {menuOpen ? (
                                        <X size={24} />
                                    ) : (
                                        <Menu size={24} />
                                    )}
                                </button>
                            </div>

                            {menuOpen && (
                                <div className="absolute top-16 right-4 bg-card border border-border rounded-lg shadow-lg p-4 flex flex-col gap-3 w-56 animate-in fade-in slide-in-from-top-2">
                                    <div className="font-semibold text-sm">
                                        <p className="text-gray-300">
                                            {user.email.split("@")[0]}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                    <Link
                                        href="/create"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <AuthButton
                                            label="Nova Tarefa"
                                            variant="primary"
                                            width="w-full"
                                        />
                                    </Link>
                                    <AuthButton
                                        label="Sair"
                                        onClick={handleLogout}
                                        variant="danger"
                                        width="w-full"
                                        disabled={logoutLoading}
                                    />
                                </div>
                            )}
                        </>
                    )
                )}
            </div>
        </nav>
    );
}
