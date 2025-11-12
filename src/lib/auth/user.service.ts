import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken } from "./token.service";

export async function registerUser(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) throw new Error("Usuário com esse email já existe");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true,
            admin: true,
            createdAt: true,
        },
    });

    return newUser;
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) throw new Error("Usuário ou senha inválidos");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Usuário ou senha inválidos");

    const token = signToken({
        id: user.id,
        email: user.email,
        admin: user.admin,
    });

    return {
        user: { id: user.id, email: user.email, admin: user.admin },
        token,
    };
}
