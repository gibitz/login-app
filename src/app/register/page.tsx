"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inputSchema, type Input } from "@/lib/validations/input";

export default function RegisterPage() {
    const form = useForm<Input>({
        resolver: zodResolver(inputSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

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
            console.log("Usuario:", data.user);

            form.reset();
        } catch (e) {
            alert("Erro ao registrar");
            console.error(e);
        }
    }
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
                    Crie uma conta:
                </span>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col"
                >
                    <label htmlFor="email" className="mb-1">
                        Seu e-mail:
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
                    <label htmlFor="senha" className="mb-1">
                        Senha:
                    </label>
                    <input
                        type="password"
                        id="senha"
                        placeholder="Senha"
                        {...form.register("password")}
                        className="pl-6 py-3 mb-3 bg-input rounded-lg placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-sm mb-1">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="self-end bg-primary text-primary-foreground font-semibold px-10 py-3 rounded-lg w-36"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}
