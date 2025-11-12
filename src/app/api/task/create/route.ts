import { NextResponse } from "next/server";
import { taskInputSchema } from "@/lib/validations";
import { createTask } from "@/lib/task";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) {
            return NextResponse.json(
                { error: "Usuário não autenticado" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const parsed = taskInputSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues.map((e) => e.message).join(", ") },
                { status: 400 }
            );
        }

        const { title, description } = parsed.data;

        const newTask = await createTask(user.id, title, description);
        return NextResponse.json(
            {
                message: "Tarefa criada com sucesso",
                task: newTask,
            },
            { status: 201 }
        );
    } catch (e) {
        return NextResponse.json(
            { error: "Erro ao processar a solicitação" },
            { status: 500 }
        );
    }
}