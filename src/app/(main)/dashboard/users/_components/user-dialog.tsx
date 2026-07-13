"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { PermissionRow } from "@/lib/auth/modules";
import { createUserAction, resetUserPasswordAction, updateUserAction } from "@/server/users-actions";

import { emptyPermissionRows, PermissionMatrix } from "./permission-matrix";
import type { UserRow } from "./types";

const createSchema = z
  .object({
    fullName: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
    email: z.email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters.").max(72),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const editSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters.").max(72),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function permissionRowsFromUser(user: UserRow): PermissionRow[] {
  return emptyPermissionRows().map((row) => {
    const perms = user.permissions[row.module];
    return perms
      ? {
          module: row.module,
          can_view: perms.view,
          can_read: perms.read,
          can_create: perms.create,
          can_edit: perms.edit,
        }
      : row;
  });
}

export function CreateUserDialog({
  open,
  onOpenChange,
}: {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}) {
  const [permissions, setPermissions] = React.useState<PermissionRow[]>(emptyPermissionRows());
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  React.useEffect(() => {
    if (open) {
      form.reset();
      setPermissions(emptyPermissionRows());
    }
  }, [open, form]);

  async function onSubmit(values: z.infer<typeof createSchema>) {
    const hasAnyPermission = permissions.some((p) => p.can_view || p.can_read || p.can_create || p.can_edit);
    if (!hasAnyPermission) {
      toast.error("No permissions assigned", {
        description: "Select at least one module permission, otherwise this user cannot access anything.",
      });
      return;
    }

    setSubmitting(true);
    const result = await createUserAction({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      permissions,
    });
    setSubmitting(false);

    if (result.success) {
      toast.success("User created", { description: `${values.fullName} can now sign in.` });
      onOpenChange(false);
    } else {
      toast.error("Could not create user", { description: result.error });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !submitting && onOpenChange(next)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create an account and assign per-module permissions. The user can sign in immediately.
          </DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FieldGroup className="gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="create-name"
                      placeholder="e.g. Ahmed Ali"
                      disabled={submitting}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-email">Email Address</FieldLabel>
                    <Input
                      {...field}
                      id="create-email"
                      type="email"
                      placeholder="user@company.com"
                      disabled={submitting}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="create-password"
                      type="password"
                      placeholder="Min. 8 characters"
                      disabled={submitting}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-confirm">Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      id="create-confirm"
                      type="password"
                      placeholder="Repeat password"
                      disabled={submitting}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <div className="flex flex-col gap-2">
            <div className="font-medium text-sm">Module Permissions</div>
            <p className="text-muted-foreground text-xs">
              Grant access per module. Delete rights do not exist anywhere in this system — historical data cannot be
              removed by anyone.
            </p>
            <PermissionMatrix value={permissions} onChange={setPermissions} disabled={submitting} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner className="size-4" /> Creating…
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditUserDialog({
  user,
  currentUserId,
  open,
  onOpenChange,
}: {
  readonly user: UserRow | null;
  readonly currentUserId: string;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}) {
  const [permissions, setPermissions] = React.useState<PermissionRow[]>(emptyPermissionRows());
  const [submitting, setSubmitting] = React.useState(false);
  const [resetOpen, setResetOpen] = React.useState(false);
  const [resettingPassword, setResettingPassword] = React.useState(false);

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: { fullName: "" },
  });

  const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  React.useEffect(() => {
    if (open && user) {
      form.reset({ fullName: user.name });
      setPermissions(permissionRowsFromUser(user));
      setResetOpen(false);
      resetForm.reset();
    }
  }, [open, user, form, resetForm]);

  if (!user) return null;

  const isSelf = user.id === currentUserId;
  const permissionsLocked = user.isMasterAdmin || isSelf;

  let permissionHint = "Changes take effect the next time the user loads a page.";
  if (user.isMasterAdmin) {
    permissionHint = "The Master Admin has permanent full access to every module. Permissions cannot be changed.";
  } else if (isSelf) {
    permissionHint = "You cannot change your own permissions. Ask another administrator.";
  }

  async function onSubmit(values: z.infer<typeof editSchema>) {
    if (!user) return;
    setSubmitting(true);
    const result = await updateUserAction({
      userId: user.id,
      fullName: values.fullName,
      permissions,
    });
    setSubmitting(false);

    if (result.success) {
      toast.success("User updated", { description: `${values.fullName}'s details were saved.` });
      onOpenChange(false);
    } else {
      toast.error("Could not update user", { description: result.error });
    }
  }

  async function onResetPassword(values: z.infer<typeof resetPasswordSchema>) {
    if (!user) return;
    setResettingPassword(true);
    const result = await resetUserPasswordAction({ userId: user.id, password: values.password });
    setResettingPassword(false);

    if (result.success) {
      toast.success("Password reset", { description: `${user.name} must use the new password from now on.` });
      resetForm.reset();
      setResetOpen(false);
    } else {
      toast.error("Could not reset password", { description: result.error });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !submitting && !resettingPassword && onOpenChange(next)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update {user.name}&apos;s details{permissionsLocked ? "" : " and module permissions"}.
          </DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FieldGroup className="gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-name">Full Name</FieldLabel>
                    <Input {...field} id="edit-name" disabled={submitting} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field className="gap-1.5">
                <FieldLabel htmlFor="edit-email">Email Address</FieldLabel>
                <Input id="edit-email" value={user.email} disabled readOnly />
              </Field>
            </div>
          </FieldGroup>

          <div className="flex flex-col gap-2">
            <div className="font-medium text-sm">Module Permissions</div>
            <p className="text-muted-foreground text-xs">{permissionHint}</p>
            <PermissionMatrix
              value={permissions}
              onChange={setPermissions}
              disabled={submitting || permissionsLocked}
            />
          </div>

          <Collapsible open={resetOpen} onOpenChange={setResetOpen}>
            <CollapsibleTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="gap-2">
                <KeyRound className="size-4" />
                Reset Password
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Controller
                    control={resetForm.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="reset-password">New Password</FieldLabel>
                        <Input
                          {...field}
                          id="reset-password"
                          type="password"
                          placeholder="Min. 8 characters"
                          disabled={resettingPassword}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="reset-confirm">Confirm New Password</FieldLabel>
                        <Input
                          {...field}
                          id="reset-confirm"
                          type="password"
                          placeholder="Repeat password"
                          disabled={resettingPassword}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={resettingPassword}
                    onClick={resetForm.handleSubmit(onResetPassword)}
                  >
                    {resettingPassword ? (
                      <>
                        <Spinner className="size-4" /> Resetting…
                      </>
                    ) : (
                      "Confirm Password Reset"
                    )}
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner className="size-4" /> Saving…
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
