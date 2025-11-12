import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("iniciando seed...");

  // Gera hash de senha padrão
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

  // Cria ou ignora caso já exista
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
