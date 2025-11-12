import {prisma} from "@/lib/prisma";

export async function createTask(userId: number, title: string, description?: string) {
    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            userId,
        
        },
        select: {
            id: true,
            title: true,
            description: true,
            user: true,
            createdAt: true,
        },
    });

    return newTask;
}