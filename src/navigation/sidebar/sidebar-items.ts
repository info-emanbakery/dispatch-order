import {
  Banknote,
  ClipboardList,
  type LucideIcon,
  Package,
  Settings2,
  ShieldCheck,
  Tag,
  Users,
  Wallet,
} from "lucide-react";

import type { ModuleKey, PermissionMap } from "@/lib/auth/modules";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
  /** When set, the item is only visible to users with view permission on this module. */
  module?: ModuleKey;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
  /** When set, the item is only visible to users with view permission on this module. */
  module?: ModuleKey;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 0,
    label: "Administration",
    items: [
      {
        id: "user-management",
        title: "User Management",
        url: "/dashboard/users",
        icon: ShieldCheck,
        module: "users",
      },
    ],
  },
  {
    id: 10,
    label: "Bakery Operations",
    items: [
      {
        id: "salesmen",
        title: "Salesmen",
        url: "/dashboard/salesmen",
        icon: Users,
        module: "salesmen",
      },
      {
        id: "products",
        title: "Products",
        url: "/dashboard/products",
        icon: Package,
        module: "products",
      },
      {
        id: "pricing",
        title: "Pricing",
        url: "/dashboard/pricing",
        icon: Tag,
        module: "pricing",
      },
      {
        id: "dispatch",
        title: "Dispatch Orders",
        url: "/dashboard/dispatch",
        icon: ClipboardList,
        module: "dispatch",
      },
      {
        id: "payments",
        title: "Payments & Ledger",
        url: "/dashboard/payments",
        icon: Wallet,
        module: "payments",
      },
      {
        id: "reports",
        title: "Reports",
        url: "/dashboard/reports",
        icon: Banknote,
        module: "reports",
      },
      {
        id: "admin",
        title: "Admin Tools",
        url: "/dashboard/admin",
        icon: Settings2,
        module: "users",
      },
    ],
  },
];

/**
 * Filters sidebar groups by the user's permission map.
 * Items tagged with a `module` are hidden unless the user has view permission on it.
 * Untagged items are always shown.
 */
export function filterSidebarItems(groups: NavGroup[], permissions: PermissionMap): NavGroup[] {
  return groups
    .map((group) => ({
      ...group,
      items: group.items
        .filter((item) => !item.module || permissions[item.module]?.view)
        .map((item) =>
          item.subItems
            ? { ...item, subItems: item.subItems.filter((sub) => !sub.module || permissions[sub.module]?.view) }
            : item,
        )
        .filter((item) => !item.subItems || item.subItems.length > 0),
    }))
    .filter((group) => group.items.length > 0);
}
