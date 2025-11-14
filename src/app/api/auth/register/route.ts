import { NextResponse } from "next/server";
import { authInputSchema } from "@/lib/validations";
import { loginUser, registerUser } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = authInputSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues.map((e) => e.message).join(", ") },
                { status: 400 }
            );
        }

        const { email, password } = parsed.data;

        await registerUser(email, password);

        const { token } = await loginUser(email, password);

        const response = NextResponse.redirect(new URL("/", request.url));

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (e: any) {
        if (e.message?.includes("já existe")) {
            return NextResponse.json({ error: e.message }, { status: 409 });
        }

        return NextResponse.json(
            { error: "Erro ao processar a solicitação" },
            { status: 500 }
        );
    }
}
