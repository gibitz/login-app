import { verifyToken } from "./token.service";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

interface JwtPayload {
  id: number;
  email: string;
  admin: boolean;
}

export async function getAuthenticatedUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const decoded = verifyToken<JwtPayload>(token);
  if (!decoded) return null;

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, email: true, admin: true },
  });

  return user ? { id: user.id, email: user.email, admin: user.admin } : null;
}

export async function requireAdminUser() {
  const user = await getAuthenticatedUser();
  if (!user || !user.admin) {
    return null;
  }
  return user;
}
