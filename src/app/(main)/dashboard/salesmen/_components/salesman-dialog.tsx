"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { createSalesmanAction, updateSalesmanAction } from "@/server/catalog-actions";

import type { SalesmanRow } from "./types";

const formSchema = z.object({
  code: z.string().trim().max(20).optional().or(z.literal("")),
  name: z.string().trim().min(2, "Name is required.").max(100),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  area: z.string().trim().max(100).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

function SalesmanForm({
  defaultValues,
  onSuccess,
  onCancel,
  submitLabel,
  action,
}: {
  defaultValues: FormValues;
  onSuccess: () => void;
  onCancel: () => void;
  submitLabel: string;
  action: (values: FormValues) => Promise<{ success: boolean; error?: string }>;
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const form = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    const result = await action(values);
    setSubmitting(false);
    if (result.success) {
      onSuccess();
    } else {
      toast.error("Action failed", { description: result.error });
    }
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field className="col-span-2 gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-name">Full Name *</FieldLabel>
                <Input {...field} id="sm-name" placeholder="Ahmed Hassan" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="code"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-code">Salesman Code</FieldLabel>
                <Input {...field} id="sm-code" placeholder="SM-001" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-phone">Phone</FieldLabel>
                <Input {...field} id="sm-phone" placeholder="+20 100 000 0000" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="area"
            render={({ field, fieldState }) => (
              <Field className="col-span-2 gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-area">Area / Route</FieldLabel>
                <Input {...field} id="sm-area" placeholder="Cairo North" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting && <Spinner className="size-4" />}
          {submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function CreateSalesmanDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Salesman</DialogTitle>
          <DialogDescription>Register a new salesman in the system.</DialogDescription>
        </DialogHeader>
        <SalesmanForm
          defaultValues={{ code: "", name: "", phone: "", area: "" }}
          submitLabel="Create Salesman"
          action={async (values) => {
            const result = await createSalesmanAction(values);
            return result;
          }}
          onSuccess={() => {
            toast.success("Salesman created");
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditSalesmanDialog({
  salesman,
  open,
  onOpenChange,
}: {
  salesman: SalesmanRow | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  if (!salesman) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {salesman.name}</DialogTitle>
          <DialogDescription>Update salesman details.</DialogDescription>
        </DialogHeader>
        <SalesmanForm
          key={salesman.id}
          defaultValues={{
            code: salesman.code ?? "",
            name: salesman.name,
            phone: salesman.phone ?? "",
            area: salesman.area ?? "",
          }}
          submitLabel="Save Changes"
          action={async (values) => {
            const result = await updateSalesmanAction({ salesmanId: salesman.id, ...values });
            return result;
          }}
          onSuccess={() => {
            toast.success("Salesman updated");
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
