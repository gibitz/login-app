"use client";

import { useRouter } from "next/navigation";
import type { TaskInput } from "@/lib/validations";
import Link from "next/link";

export default function CreatePage() {
    const router = useRouter();

    async function onSubmit(values: TaskInput) {
        try {
            const res = await fetch("/api/task/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Erro ao criar tarefa");
                return;
            }
            alert("Tarefa criada com sucesso!");
            router.refresh();
            console.log("Tarefa:", data.task);
        } catch (e) {
            alert("Erro ao criar tarefa");
            console.error(e);
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-3xl w-full px-6 py-8 bg-card rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="font-semibold text-xl">Nova Tarefa</h1>
                    <Link href="/">
                        <button className="bg-blue-400 text-black/80 font-semibold px-4 py-2 rounded-full hover:bg-blue-500/90 transition-colors duration-200">
                            Voltar
                        </button>
                    </Link>
                </div>
                <span className="block bg-primary/30 p-4 border border-primary rounded-lg">
                    Atenção: Antes de criar a tarefa, combine comigo no Discord!
                </span>
                <div>
                    <form className=" flex flex-col">
                        <label htmlFor="title" className="block font-medium text-lg mb-2 mt-4">
                            Título:
                        </label>
                        
                        <input
                            type="text"
                            id="title"
                            placeholder="Título da tarefa"
                            className="pl-4 py-2 w-full rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <label htmlFor="description" className="block font-medium text-lg mb-2 mt-4">
                            Descrição:
                        </label>
                        <textarea
                            id="description"
                            placeholder="Descrição da tarefa"
                            className="pl-4 py-2 w-full rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
                        ></textarea>
                        <button
                        
                            type="submit"
                            className="mt-6 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg self-end hover:bg-primary/90 transition-colors duration-200"
                        >
                            Criar Tarefa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
