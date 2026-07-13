import type { PermissionMap } from "@/lib/auth/modules";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  isMasterAdmin: boolean;
  active: boolean;
  createdAt: string;
  permissions: PermissionMap;
};
