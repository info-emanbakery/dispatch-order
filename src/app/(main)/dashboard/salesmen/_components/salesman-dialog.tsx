"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useRouter } from "next/navigation";

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

// Create schema (no code — auto-generated server-side)
const createSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(100),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  area: z.string().trim().max(100).optional().or(z.literal("")),
  iqamaNumber: z.string().trim().max(30).optional().or(z.literal("")),
  vehicleNumber: z.string().trim().max(30).optional().or(z.literal("")),
});

// Edit schema (code editable)
const editSchema = createSchema.extend({
  code: z.string().trim().max(20).optional().or(z.literal("")),
});

type CreateValues = z.infer<typeof createSchema>;
type EditValues = z.infer<typeof editSchema>;

function SalesmanCreateForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const form = useForm<CreateValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "", phone: "", area: "", iqamaNumber: "", vehicleNumber: "" },
  });

  async function onSubmit(values: CreateValues) {
    setSubmitting(true);
    const result = await createSalesmanAction(values);
    setSubmitting(false);
    if (result.success) {
      router.refresh();
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
            name="phone"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-phone">Mobile</FieldLabel>
                <Input {...field} id="sm-phone" placeholder="+966 5X XXX XXXX" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="area"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-area">Area / Route</FieldLabel>
                <Input {...field} id="sm-area" placeholder="Riyadh North" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="iqamaNumber"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-iqama">Iqama Number</FieldLabel>
                <Input {...field} id="sm-iqama" placeholder="2XXXXXXXXX" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="vehicleNumber"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-vehicle">Vehicle Number</FieldLabel>
                <Input {...field} id="sm-vehicle" placeholder="ABC 1234" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <div className="col-span-2 rounded-md bg-muted/50 px-3 py-2 text-muted-foreground text-xs">
            Code is auto-generated (SLM-XXX) when the salesman is created.
          </div>
        </div>
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting && <Spinner className="size-4" />}
          Create Salesman
        </Button>
      </DialogFooter>
    </form>
  );
}

function SalesmanEditForm({
  salesman,
  onSuccess,
  onCancel,
}: {
  salesman: SalesmanRow;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const form = useForm<EditValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      code: salesman.code ?? "",
      name: salesman.name,
      phone: salesman.phone ?? "",
      area: salesman.area ?? "",
      iqamaNumber: salesman.iqamaNumber ?? "",
      vehicleNumber: salesman.vehicleNumber ?? "",
    },
  });

  async function onSubmit(values: EditValues) {
    setSubmitting(true);
    const result = await updateSalesmanAction({ salesmanId: salesman.id, ...values });
    setSubmitting(false);
    if (result.success) {
      router.refresh();
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
                <FieldLabel htmlFor="sm-code">Code</FieldLabel>
                <Input {...field} id="sm-code" placeholder="SLM-001" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-phone">Mobile</FieldLabel>
                <Input {...field} id="sm-phone" placeholder="+966 5X XXX XXXX" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="area"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-area">Area / Route</FieldLabel>
                <Input {...field} id="sm-area" placeholder="Riyadh North" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="iqamaNumber"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-iqama">Iqama Number</FieldLabel>
                <Input {...field} id="sm-iqama" placeholder="2XXXXXXXXX" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="vehicleNumber"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sm-vehicle">Vehicle Number</FieldLabel>
                <Input {...field} id="sm-vehicle" placeholder="ABC 1234" disabled={submitting} />
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
          Save Changes
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
          <DialogDescription>Register a new field salesman. Code is auto-generated.</DialogDescription>
        </DialogHeader>
        <SalesmanCreateForm
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
        <SalesmanEditForm
          key={salesman.id}
          salesman={salesman}
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
