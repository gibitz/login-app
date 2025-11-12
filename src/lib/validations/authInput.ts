
import {z} from "zod";

export const authInputSchema = z.object({
    email: z.email("Formato de email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type AuthInput = z.infer<typeof authInputSchema>;