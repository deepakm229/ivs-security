import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import type { PermissionSlug } from "./permissions";
import type { AppUser } from "./types";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserPermissions(userId: string): Promise<Set<PermissionSlug>> {
  const rows = await db.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: { permission: true },
          },
        },
      },
    },
  });

  const slugs = new Set<PermissionSlug>();
  for (const userRole of rows) {
    for (const rp of userRole.role.rolePermissions) {
      slugs.add(rp.permission.slug as PermissionSlug);
    }
  }
  return slugs;
}

export async function getAppUser(): Promise<AppUser | null> {
  const user = await getSessionUser();
  if (!user?.email) return null;

  const permissions = await getUserPermissions(user.id);
  return {
    id: user.id,
    email: user.email,
    permissions,
  };
}
