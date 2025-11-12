import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || "itsasecretkey";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? "7d") as jwt.SignOptions["expiresIn"];

export async function registerUser(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("Usuário com esse email já existe");
    }

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
    if (!user) {
        throw new Error("Usuário ou senha inválidos");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Usuário ou senha inválidos");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            admin: user.admin,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { user: { id: user.id, email: user.email, admin: user.admin }, token };
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        throw new Error("Token inválido");
    }
}