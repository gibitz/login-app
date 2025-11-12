import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        (await cookies()).set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        });

        return NextResponse.json(
            { message: "Logout bem-sucedido" },
            { status: 200 }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Erro ao fazer logout" },
            { status: 500 }
        );
    }
}
