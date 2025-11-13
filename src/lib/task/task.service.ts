import { prisma } from "@/lib/prisma";

export async function createTask(
  userId: number,
  title: string,
  description?: string,
) {
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

export async function getTasks() {
  return await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
