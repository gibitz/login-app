import { NextResponse } from "next/server";
import { inputSchema } from "@/lib/validations/input";
import { loginUser } from "@/lib/auth";

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

        const {user, token} = await loginUser(email, password);

        const response = NextResponse.json(
            {
                message: "Login bem-sucedido", user },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return response;
    } catch (e: any) {
        if (e.message?.includes("inválidos")) {
            return NextResponse.json({ error: e.message }, { status: 401 });
        }

        console.error(e);
        return NextResponse.json(
            { error: "Erro ao processar a solicitação" },
            { status: 500 }
        );
    }
}
