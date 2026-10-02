import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { PermissionSlug } from "./permissions";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { getAppUser } from "./session";

export function hasPermission(
  user: { permissions: Set<PermissionSlug> },
  permission: PermissionSlug,
) {
  return user.permissions.has(permission);
}

export async function requireAuth() {
  const user = await getAppUser();
  if (!user) {
    throw new UnauthorizedError();
  }
  return user;
}

export async function requirePermission(permission: PermissionSlug) {
  const user = await requireAuth();
  if (!hasPermission(user, permission)) {
    throw new ForbiddenError();
  }
  return user;
}

/** Server Components / pages — redirect instead of throwing. */
export async function requirePermissionForPage(permission: PermissionSlug) {
  const user = await getAppUser();
  if (!user) redirect("/admin/login");
  if (!hasPermission(user, permission)) redirect("/admin/forbidden");
  return user;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbiddenResponse() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
