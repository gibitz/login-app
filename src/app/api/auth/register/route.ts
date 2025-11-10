import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations/register";

export async function GET() {
    return NextResponse.json({ status: 200, message: "OK" });
}

export async function POST(request: Request) {
    try {
        const { email, password, username } = await request.json();
        const parsed = registerSchema.safeParse({ email, password, username });

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues.map((e) => e.message).join(", ") },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                message: "Usuário cadastrado com sucesso",
                user: { email, username },
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
