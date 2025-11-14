import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    (await cookies()).set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return NextResponse.json(
      { message: "Logout bem-sucedido" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Erro ao fazer logout" },
      { status: 500 },
    );
  }
}
