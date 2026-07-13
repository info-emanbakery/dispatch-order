"use client";
"use no memo";

import * as React from "react";

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setUserActiveAction } from "@/server/users-actions";

import type { UserRow } from "./types";
import { CreateUserDialog, EditUserDialog } from "./user-dialog";
import { buildUsersColumns } from "./users-columns";
import { UsersTable } from "./users-table";

const STATUS_FILTERS = ["All", "Active", "Deactivated"];

export function Users({
  users,
  canCreate,
  canEdit,
  currentUserId,
}: {
  readonly users: UserRow[];
  readonly canCreate: boolean;
  readonly canEdit: boolean;
  readonly currentUserId: string;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility] = React.useState<VisibilityState>({ search: false });
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const [createOpen, setCreateOpen] = React.useState(false);
  const [editUser, setEditUser] = React.useState<UserRow | null>(null);
  const [toggleUser, setToggleUser] = React.useState<UserRow | null>(null);
  const [toggling, setToggling] = React.useState(false);

  const columns = React.useMemo(
    () =>
      buildUsersColumns({
        canEdit,
        currentUserId,
        onEdit: (user) => setEditUser(user),
        onToggleActive: (user) => setToggleUser(user),
      }),
    [canEdit, currentUserId],
  );

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting, columnFilters, columnVisibility, pagination },
    getRowId: (row) => row.id,
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const searchQuery = (table.getColumn("search")?.getFilterValue() as string | undefined) ?? "";
  const statusFilter = (table.getColumn("active")?.getFilterValue() as string | undefined) ?? "All";

  let toggleActionLabel = toggleUser?.active ? "Deactivate" : "Reactivate";
  if (toggling) toggleActionLabel = "Working…";

  async function confirmToggle() {
    if (!toggleUser) return;
    setToggling(true);
    const result = await setUserActiveAction({ userId: toggleUser.id, active: !toggleUser.active });
    setToggling(false);

    if (result.success) {
      toast.success(toggleUser.active ? "User deactivated" : "User reactivated", {
        description: toggleUser.active
          ? `${toggleUser.name} can no longer sign in. Their history is preserved.`
          : `${toggleUser.name} can sign in again.`,
      });
      setToggleUser(null);
    } else {
      toast.error("Action failed", { description: result.error });
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="border-b has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
          <CardTitle className="text-xl leading-none">User Management</CardTitle>
          <CardDescription className="max-w-sm leading-snug">
            Create staff accounts and control exactly which modules each person can see and use.
          </CardDescription>
          <CardAction className="col-start-1 row-start-auto flex w-full flex-wrap justify-start gap-2 justify-self-stretch md:col-start-2 md:row-span-2 md:row-start-1 md:w-auto md:flex-nowrap md:justify-end md:justify-self-end">
            <InputGroup className="h-8 w-full md:w-64">
              <InputGroupAddon align="inline-start">
                <Search className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                className="h-8"
                placeholder="Search by name or email…"
                value={searchQuery}
                onChange={(event) => {
                  table.getColumn("search")?.setFilterValue(event.target.value || undefined);
                  table.setPageIndex(0);
                }}
              />
            </InputGroup>
            {canCreate && (
              <Button size="sm" onClick={() => setCreateOpen(true)}>
                <Plus /> Add User
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                table.getColumn("active")?.setFilterValue(value === "All" ? undefined : value);
                table.setPageIndex(0);
              }}
            >
              <SelectTrigger size="sm">
                <span className="text-muted-foreground">Status:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" align="start">
                <SelectGroup>
                  {STATUS_FILTERS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="text-muted-foreground text-sm tabular-nums">
              {table.getFilteredRowModel().rows.length} of {users.length} users
            </div>
          </div>

          <UsersTable table={table} />
        </CardContent>
      </Card>

      <CreateUserDialog open={createOpen} onOpenChange={setCreateOpen} />
      <EditUserDialog
        user={editUser}
        currentUserId={currentUserId}
        open={editUser !== null}
        onOpenChange={(open) => !open && setEditUser(null)}
      />

      <AlertDialog open={toggleUser !== null} onOpenChange={(open) => !open && !toggling && setToggleUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {toggleUser?.active ? `Deactivate ${toggleUser?.name}?` : `Reactivate ${toggleUser?.name}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {toggleUser?.active
                ? "They will be signed out and unable to log in. All of their historical records, dispatches and ledger entries remain untouched — nothing is ever deleted."
                : "They will be able to sign in again with their existing password and permissions."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={toggling}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={toggleUser?.active ? "bg-destructive text-white hover:bg-destructive/90" : undefined}
              disabled={toggling}
              onClick={(event) => {
                event.preventDefault();
                void confirmToggle();
              }}
            >
              {toggleActionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
