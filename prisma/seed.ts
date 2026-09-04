import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@ivssecurity.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "IVS Admin" },
    create: {
      email,
      passwordHash,
      name: "IVS Admin",
    },
  });

  console.log(`Admin user ready: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
