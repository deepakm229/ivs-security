export const PERMISSIONS = {
  LEADS_READ: "leads:read",
  LEADS_WRITE: "leads:write",
} as const;

export type PermissionSlug =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
