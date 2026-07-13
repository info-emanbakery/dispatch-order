export const APP_MODULES = [
  { key: "users", label: "User Management", description: "Create users and assign per-module permissions" },
  { key: "salesmen", label: "Salesmen", description: "Manage salesman records and status" },
  { key: "products", label: "Products", description: "Manage the bakery product catalog" },
  { key: "pricing", label: "Pricing", description: "Configure salesman-specific price lists" },
  { key: "dispatch", label: "Dispatch Orders", description: "Create and view dispatch orders" },
  { key: "payments", label: "Payments & Ledger", description: "Record payments and view balances" },
  { key: "reports", label: "Reports & Analytics", description: "Salesman profiles, reports and exports" },
] as const;

export type ModuleKey = (typeof APP_MODULES)[number]["key"];

export const PERMISSION_ACTIONS = ["view", "read", "create", "edit"] as const;
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number];

export type PermissionRow = {
  module: ModuleKey;
  can_view: boolean;
  can_read: boolean;
  can_create: boolean;
  can_edit: boolean;
};

export type PermissionMap = Record<ModuleKey, Record<PermissionAction, boolean>>;

export function emptyPermissionMap(): PermissionMap {
  return Object.fromEntries(
    APP_MODULES.map((m) => [m.key, { view: false, read: false, create: false, edit: false }]),
  ) as PermissionMap;
}

export function buildPermissionMap(rows: PermissionRow[] | null | undefined, isMasterAdmin: boolean): PermissionMap {
  const map = emptyPermissionMap();
  if (isMasterAdmin) {
    for (const m of APP_MODULES) {
      map[m.key] = { view: true, read: true, create: true, edit: true };
    }
    return map;
  }
  for (const row of rows ?? []) {
    if (row.module in map) {
      map[row.module] = {
        view: row.can_view,
        read: row.can_read,
        create: row.can_create,
        edit: row.can_edit,
      };
    }
  }
  return map;
}
