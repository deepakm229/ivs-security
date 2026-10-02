import { createClient } from "@/lib/supabase/server";
import { PERMISSIONS, type PermissionSlug } from "./permissions";
import type { AppUser } from "./types";

async function loadPermissions(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<Set<PermissionSlug>> {
  const slugs = new Set<PermissionSlug>();

  for (const slug of Object.values(PERMISSIONS)) {
    const { data, error } = await supabase.rpc("user_has_permission", {
      permission_slug: slug,
    });

    if (error) {
      console.error("user_has_permission failed:", error.message);
      continue;
    }

    if (data === true) slugs.add(slug);
  }

  return slugs;
}

export async function getSessionUser() {
  const supabase = await createClient({ readOnly: true });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getAppUser(): Promise<AppUser | null> {
  const supabase = await createClient({ readOnly: true });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const permissions = await loadPermissions(supabase);
  return {
    id: user.id,
    email: user.email,
    permissions,
  };
}
