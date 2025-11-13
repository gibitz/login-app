import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/token.service";

export async function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.clone();

    // 🔒 Rotas que só usuários autenticados podem acessar
    const protectedRoutes = ["/", "/create"];
    // 🚫 Rotas que usuários logados NÃO podem acessar
    const authRoutes = ["/login", "/register"];

    // Se tiver token válido
    if (token) {
        try {
            verifyToken(token); // valida JWT

            // se o usuário estiver logado e tentar ir pra /login ou /register → redireciona pro dashboard
            if (authRoutes.includes(url.pathname)) {
                url.pathname = "/";
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        } catch {
            // token inválido → remove cookie e redireciona pra login
            const res = NextResponse.redirect(new URL("/login", req.url));
            res.cookies.delete("token");
            return res;
        }
    }

    // se o usuário NÃO tiver token e tentar acessar rota protegida
    if (protectedRoutes.includes(url.pathname)) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Define onde o middleware deve rodar
export const config = {
    matcher: ["/", "/create", "/login", "/register"],
};
