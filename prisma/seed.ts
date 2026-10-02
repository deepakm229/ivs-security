import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PERMISSIONS = [
  { slug: "leads:read", name: "View leads" },
  { slug: "leads:write", name: "Update leads" },
] as const;

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { slug: "admin" },
    update: { name: "Administrator" },
    create: {
      slug: "admin",
      name: "Administrator",
      description: "Full access to lead management and admin portal",
    },
  });

  for (const permission of PERMISSIONS) {
    const row = await prisma.permission.upsert({
      where: { slug: permission.slug },
      update: { name: permission.name },
      create: permission,
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: row.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: row.id,
      },
    });
  }

  console.log("Roles and permissions seeded (admin → leads:read, leads:write).");
  console.log("Create an admin user with: npm run create-admin");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
