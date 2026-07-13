"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { APP_MODULES, type ModuleKey, type PermissionAction, type PermissionRow } from "@/lib/auth/modules";

const ACTIONS: { key: PermissionAction; label: string; column: keyof Omit<PermissionRow, "module"> }[] = [
  { key: "view", label: "View", column: "can_view" },
  { key: "read", label: "Read", column: "can_read" },
  { key: "create", label: "Create", column: "can_create" },
  { key: "edit", label: "Edit", column: "can_edit" },
];

export function emptyPermissionRows(): PermissionRow[] {
  return APP_MODULES.map((m) => ({
    module: m.key,
    can_view: false,
    can_read: false,
    can_create: false,
    can_edit: false,
  }));
}

export function PermissionMatrix({
  value,
  onChange,
  disabled,
}: {
  readonly value: PermissionRow[];
  readonly onChange: (rows: PermissionRow[]) => void;
  readonly disabled?: boolean;
}) {
  function toggle(module: ModuleKey, column: keyof Omit<PermissionRow, "module">, checked: boolean) {
    onChange(
      value.map((row) => {
        if (row.module !== module) return row;
        const next = { ...row, [column]: checked };
        // Deeper rights require the module to be visible
        if (checked && column !== "can_view") next.can_view = true;
        // Removing view removes everything beneath it
        if (!checked && column === "can_view") {
          next.can_read = false;
          next.can_create = false;
          next.can_edit = false;
        }
        return next;
      }),
    );
  }

  function toggleRowAll(module: ModuleKey, checked: boolean) {
    onChange(
      value.map((row) =>
        row.module === module
          ? { module, can_view: checked, can_read: checked, can_create: checked, can_edit: checked }
          : row,
      ),
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[40%]">Module</TableHead>
            {ACTIONS.map((action) => (
              <TableHead key={action.key} className="text-center">
                {action.label}
              </TableHead>
            ))}
            <TableHead className="text-center">All</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {APP_MODULES.map((mod) => {
            const row = value.find((r) => r.module === mod.key);
            if (!row) return null;
            const allChecked = row.can_view && row.can_read && row.can_create && row.can_edit;
            return (
              <TableRow key={mod.key} className="hover:bg-muted/30">
                <TableCell>
                  <div className="font-medium text-sm">{mod.label}</div>
                  <div className="text-muted-foreground text-xs">{mod.description}</div>
                </TableCell>
                {ACTIONS.map((action) => (
                  <TableCell key={action.key} className="text-center">
                    <Checkbox
                      aria-label={`${mod.label}: ${action.label}`}
                      checked={row[action.column]}
                      disabled={disabled}
                      onCheckedChange={(checked) => toggle(mod.key, action.column, checked === true)}
                    />
                  </TableCell>
                ))}
                <TableCell className="text-center">
                  <Checkbox
                    aria-label={`${mod.label}: full access`}
                    checked={allChecked}
                    disabled={disabled}
                    onCheckedChange={(checked) => toggleRowAll(mod.key, checked === true)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
