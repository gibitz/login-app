import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/token.service";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  const protectedRoutes = ["/", "/create"];

  const authRoutes = ["/login", "/register"];

  if (token) {
    try {
      verifyToken(token);

      if (authRoutes.includes(url.pathname)) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("token");
      return res;
    }
  }

  if (protectedRoutes.includes(url.pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/create", "/login", "/register"],
};
