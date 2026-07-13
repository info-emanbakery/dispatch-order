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
import { createProductAction, updateProductAction } from "@/server/catalog-actions";

import type { ProductRow } from "./types";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(150),
  sku: z.string().trim().max(50).optional().or(z.literal("")),
  barcode: z.string().trim().max(50).optional().or(z.literal("")),
  unit: z.string().trim().min(1, "Unit is required.").max(20),
});

type FormValues = z.infer<typeof formSchema>;

function ProductForm({
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
                <FieldLabel htmlFor="pr-name">Product Name *</FieldLabel>
                <Input {...field} id="pr-name" placeholder="Multigrain Loaf 500g" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="sku"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pr-sku">SKU</FieldLabel>
                <Input {...field} id="pr-sku" placeholder="BK-0001" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="unit"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pr-unit">Unit *</FieldLabel>
                <Input {...field} id="pr-unit" placeholder="pcs / kg / box" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="barcode"
            render={({ field, fieldState }) => (
              <Field className="col-span-2 gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pr-barcode">Barcode (EAN / QR)</FieldLabel>
                <Input {...field} id="pr-barcode" placeholder="6281234567890" disabled={submitting} />
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

export function CreateProductDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Add a new bakery product to the catalog.</DialogDescription>
        </DialogHeader>
        <ProductForm
          defaultValues={{ name: "", sku: "", barcode: "", unit: "pcs" }}
          submitLabel="Create Product"
          action={async (values) => {
            const result = await createProductAction(values);
            return result;
          }}
          onSuccess={() => {
            toast.success("Product created");
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditProductDialog({
  product,
  open,
  onOpenChange,
}: {
  product: ProductRow | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {product.name}</DialogTitle>
          <DialogDescription>Update product details.</DialogDescription>
        </DialogHeader>
        <ProductForm
          key={product.id}
          defaultValues={{
            name: product.name,
            sku: product.sku ?? "",
            barcode: product.barcode ?? "",
            unit: product.unit,
          }}
          submitLabel="Save Changes"
          action={async (values) => {
            const result = await updateProductAction({ productId: product.id, ...values });
            return result;
          }}
          onSuccess={() => {
            toast.success("Product updated");
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
