import { NextResponse } from "next/server";
import { inputSchema } from "@/lib/validations/input";
import { registerUser } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = inputSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues.map((e) => e.message).join(", ") },
                { status: 400 }
            );
        }

        const { email, password } = parsed.data;

        const newUser = await registerUser(email, password);

        return NextResponse.json(
            {
                message: "Usuário registrado com sucesso",
                user: newUser,
            },
            { status: 201 }
        );
    } catch (e: any) {
        if (e.message?.includes("já existe")) {
            return NextResponse.json({ error: e.message }, { status: 409 });
        }

        console.error(e);
        return NextResponse.json(
            { error: "Erro ao processar a solicitação" },
            { status: 500 }
        );
    }
}
