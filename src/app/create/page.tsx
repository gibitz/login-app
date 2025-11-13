"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";

import type { TaskInput } from "@/lib/validations";

export default function CreatePage() {
    const form = useForm<TaskInput>({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    async function onSubmit(values: TaskInput) {
        try {
            const res = await fetch("/api/task/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Erro ao criar tarefa");
                return;
            }

            alert("Tarefa criada com sucesso!");
            form.reset();
        } catch (e) {
            alert("Erro ao criar tarefa");
            console.error(e);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-2xl w-full h-full sm:h-auto flex flex-col justify-center bg-card sm:p-10 sm:rounded-lg sm:shadow-lg">
                <div className="flex justify-between items-start sm:items-center mb-6 gap-4 px-6 sm:px-0">
                    <h1 className="font-semibold text-xl">Nova Tarefa</h1>
                    <Link href="/">
                        <button className="bg-blue-400 text-black/80 font-semibold px-4 py-2 rounded-full hover:bg-blue-500/90 transition-colors duration-200">
                            Voltar
                        </button>
                    </Link>
                </div>

                <span className="block bg-primary/20 border border-primary text-primary-foreground/80 text-sm p-4 rounded-lg mx-6 sm:mx-0">
                    <strong>Atenção:</strong> Antes de criar a tarefa, combine
                    comigo no Discord!
                </span>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col mt-6 px-6 sm:px-0"
                >
                    <label
                        htmlFor="title"
                        className="block font-medium text-lg mb-2 mt-2"
                    >
                        Título:
                    </label>

                    <input
                        type="text"
                        id="title"
                        placeholder="Título da tarefa"
                        {...form.register("title")}
                        className="pl-4 py-3 w-full rounded-lg border border-input bg-input text-black focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {form.formState.errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.title.message}
                        </p>
                    )}

                    <label
                        htmlFor="description"
                        className="block font-medium text-lg mb-2 mt-4"
                    >
                        Descrição:
                    </label>

                    <textarea
                        id="description"
                        placeholder="Descrição da tarefa"
                        {...form.register("description")}
                        className="pl-4 py-3 w-full rounded-lg border border-input bg-input text-black focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
                    ></textarea>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                        >
                            Criar Tarefa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
