"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Pencil, ShieldCheck, UserCheck, UserX } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_MODULES } from "@/lib/auth/modules";
import { cn, getInitials } from "@/lib/utils";

import type { UserRow } from "./types";

function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 border px-2 py-1 font-medium",
        active
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
          : "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-400",
      )}
    >
      <span className={cn("size-1.5 rounded-full", active ? "bg-emerald-500" : "bg-zinc-400")} />
      {active ? "Active" : "Deactivated"}
    </Badge>
  );
}

function AccessCell({ user }: { user: UserRow }) {
  if (user.isMasterAdmin) {
    return (
      <Badge
        className="gap-1.5 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300"
        variant="outline"
      >
        <ShieldCheck className="size-3.5" />
        Master Admin
      </Badge>
    );
  }

  const visibleModules = APP_MODULES.filter((m) => user.permissions[m.key]?.view);
  if (visibleModules.length === 0) {
    return <span className="text-muted-foreground text-sm">No access</span>;
  }

  return (
    <div className="flex max-w-64 flex-wrap gap-1">
      {visibleModules.slice(0, 3).map((m) => (
        <Badge key={m.key} variant="secondary" className="font-normal text-xs">
          {m.label}
        </Badge>
      ))}
      {visibleModules.length > 3 && (
        <Badge variant="outline" className="font-normal text-xs">
          +{visibleModules.length - 3} more
        </Badge>
      )}
    </div>
  );
}

export function buildUsersColumns({
  canEdit,
  currentUserId,
  onEdit,
  onToggleActive,
}: {
  canEdit: boolean;
  currentUserId: string;
  onEdit: (user: UserRow) => void;
  onToggleActive: (user: UserRow) => void;
}): ColumnDef<UserRow>[] {
  const columns: ColumnDef<UserRow>[] = [
    {
      id: "search",
      accessorFn: (row) => `${row.name} ${row.email}`,
      filterFn: "includesString",
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar size="lg" className="font-medium">
            <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-medium text-foreground text-sm">{row.original.name}</span>
              {row.original.id === currentUserId && (
                <Badge variant="outline" className="text-[10px]">
                  You
                </Badge>
              )}
            </div>
            <div className="truncate text-muted-foreground text-sm">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "access",
      header: "Access",
      cell: ({ row }) => <AccessCell user={row.original} />,
      enableSorting: false,
    },
    {
      accessorKey: "active",
      header: "Status",
      filterFn: (row, _id, value) => (value === "Active" ? row.original.active : !row.original.active),
      cell: ({ row }) => <StatusBadge active={row.original.active} />,
    },
    {
      id: "createdAt",
      accessorFn: (row) => new Date(row.createdAt).getTime(),
      header: "Created",
      cell: ({ row }) => (
        <div className="text-foreground text-sm">{format(new Date(row.original.createdAt), "dd MMM yyyy, h:mm a")}</div>
      ),
    },
  ];

  if (canEdit) {
    columns.push({
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const user = row.original;
        const isSelf = user.id === currentUserId;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label={`Open actions for ${user.name}`}
                  className="size-8 rounded-md text-muted-foreground hover:bg-muted/50"
                  size="icon-sm"
                  variant="ghost"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onEdit(user)}>
                  <Pencil />
                  Edit user
                </DropdownMenuItem>
                {!user.isMasterAdmin && !isSelf && (
                  <>
                    <DropdownMenuSeparator />
                    {user.active ? (
                      <DropdownMenuItem variant="destructive" onSelect={() => onToggleActive(user)}>
                        <UserX />
                        Deactivate user
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onSelect={() => onToggleActive(user)}>
                        <UserCheck />
                        Reactivate user
                      </DropdownMenuItem>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      enableHiding: false,
      enableSorting: false,
    });
  }

  return columns;
}
