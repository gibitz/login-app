import { NextResponse } from "next/server";
import { getTasks } from "@/lib/task";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 },
      );
    }

    const tasks = await getTasks();
    return NextResponse.json({ tasks }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar a solicitação" },
      { status: 500 },
    );
  }
}
