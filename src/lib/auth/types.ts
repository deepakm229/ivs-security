import type { PermissionSlug } from "./permissions";

export type AppUser = {
  id: string;
  email: string;
  permissions: Set<PermissionSlug>;
};
