import { createClient } from "@/lib/supabase/server";
import { PERMISSIONS, type PermissionSlug } from "./permissions";
import type { AppUser } from "./types";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserPermissions(): Promise<Set<PermissionSlug>> {
  const supabase = await createClient();
  const slugs = new Set<PermissionSlug>();

  await Promise.all(
    Object.values(PERMISSIONS).map(async (slug) => {
      const { data, error } = await supabase.rpc("user_has_permission", {
        permission_slug: slug,
      });

      if (error) {
        console.error("user_has_permission failed:", error.message);
        return;
      }

      if (data === true) slugs.add(slug);
    }),
  );

  return slugs;
}

export async function getAppUser(): Promise<AppUser | null> {
  const user = await getSessionUser();
  if (!user?.email) return null;

  const permissions = await getUserPermissions();
  return {
    id: user.id,
    email: user.email,
    permissions,
  };
}
