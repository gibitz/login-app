import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const defaultPassword = await bcrypt.hash("123456", 10);

  const users = [
    {
      email: "admin@example.com",
      password: defaultPassword,
      admin: true,
    },
    {
      email: "john.doe@example.com",
      password: defaultPassword,
      admin: false,
    },
    {
      email: "jane.doe@example.com",
      password: defaultPassword,
      admin: false,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
