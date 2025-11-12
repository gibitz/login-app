"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authInputSchema, type AuthInput } from "@/lib/validations/authInput";
import AuthButton from "@/components/ui/AuthButton";

interface AuthCardProps {
    type: "login" | "register";
    onSubmitAction: (values: AuthInput) => Promise<void>;
}

export function AuthCard({ type, onSubmitAction }: AuthCardProps) {
    const form = useForm<AuthInput>({
        resolver: zodResolver(authInputSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const title =
        type === "login" ? "Faça login em sua conta:" : "Crie uma conta:";
    const buttonText = type === "login" ? "Entrar" : "Registrar";

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-lg w-full p-10 bg-card rounded-lg shadow-lg">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={200}
                    height={100}
                    className="mx-auto"
                />
                <span className="block text-xl font-medium text-center mt-5">
                    {title}
                </span>
                <form
                    onSubmit={form.handleSubmit(onSubmitAction)}
                    className="flex flex-col"
                >
                    <label htmlFor="email" className="mb-1">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Seu e-mail"
                        {...form.register("email")}
                        className="pl-6 py-3 mb-3 bg-input rounded-lg placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mb-1">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                    <label htmlFor="password" className="mb-1 mt-4">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Senha"
                        {...form.register("password")}
                        className="pl-6 py-3 mb-3 bg-input rounded-lg placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-sm mb-1">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                    <div className="self-end mt-4">
                        <AuthButton
                            label={buttonText}
                            type="submit"
                            variant="primary"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
