import { z } from "zod";

export const taskInputSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
});

export type TaskInput = z.infer<typeof taskInputSchema>;
