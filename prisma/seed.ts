import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Dados fictícios
  const users = [
    {
      email: "admin@example.com",
      username: "admin",
    },
    {
      email: "john.doe@example.com",
      username: "johndoe",
    },
    {
      email: "jane.doe@example.com",
      username: "janedoe",
    },
  ];

  // upsert = cria se não existir, senão ignora
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
