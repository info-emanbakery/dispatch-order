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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { createPriceAction, updatePriceAction } from "@/server/catalog-actions";

import type { PriceRow, ProductOption, SalesmanOption } from "./types";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const formSchema = z
  .object({
    salesmanId: z.uuid({ error: "Select a salesman." }),
    productId: z.uuid({ error: "Select a product." }),
    price: z
      .string()
      .trim()
      .min(1, "Price is required.")
      .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, "Price must be a positive number."),
    validFrom: z.string().regex(dateRegex, "Enter a valid date (YYYY-MM-DD)."),
    validTo: z
      .string()
      .optional()
      .refine((v) => !v || dateRegex.test(v), "Enter a valid date (YYYY-MM-DD).")
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (!data.validTo) return true;
      return data.validTo >= data.validFrom;
    },
    { message: "Valid To must be on or after Valid From.", path: ["validTo"] },
  );

type FormValues = z.infer<typeof formSchema>;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function PriceForm({
  defaultValues,
  salesmen,
  products,
  lockSalesmanProduct,
  onSuccess,
  onCancel,
  submitLabel,
  action,
}: {
  defaultValues: FormValues;
  salesmen: SalesmanOption[];
  products: ProductOption[];
  lockSalesmanProduct: boolean;
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
          {/* Salesman */}
          <Controller
            control={form.control}
            name="salesmanId"
            render={({ field, fieldState }) => (
              <Field className="col-span-2 gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel>Salesman *</FieldLabel>
                {lockSalesmanProduct ? (
                  <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                    {salesmen.find((s) => s.id === field.value)?.name ?? field.value}
                  </div>
                ) : (
                  <Select onValueChange={field.onChange} value={field.value} disabled={submitting}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a salesman…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {salesmen.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                            {s.code ? ` (${s.code})` : ""}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Product */}
          <Controller
            control={form.control}
            name="productId"
            render={({ field, fieldState }) => (
              <Field className="col-span-2 gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel>Product *</FieldLabel>
                {lockSalesmanProduct ? (
                  <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                    {products.find((p) => p.id === field.value)?.name ?? field.value}
                  </div>
                ) : (
                  <Select onValueChange={field.onChange} value={field.value} disabled={submitting}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} ({p.unit})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Price */}
          <Controller
            control={form.control}
            name="price"
            render={({ field, fieldState }) => (
              <Field className="col-span-2 gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pr-price">Price (EGP) *</FieldLabel>
                <Input
                  {...field}
                  id="pr-price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  disabled={submitting}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Valid From */}
          <Controller
            control={form.control}
            name="validFrom"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pr-from">Valid From *</FieldLabel>
                <Input {...field} id="pr-from" type="date" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Valid To */}
          <Controller
            control={form.control}
            name="validTo"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pr-to">Valid To (optional)</FieldLabel>
                <Input {...field} id="pr-to" type="date" placeholder="Leave blank = open-ended" disabled={submitting} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
      <p className="text-muted-foreground text-xs">
        Leave <strong>Valid To</strong> blank for an open-ended price. Overlapping windows for the same salesman–product
        pair are rejected automatically.
      </p>
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

export function CreatePriceDialog({
  open,
  onOpenChange,
  salesmen,
  products,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  salesmen: SalesmanOption[];
  products: ProductOption[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Price Entry</DialogTitle>
          <DialogDescription>Set a salesman-specific price for a product, with optional scheduling.</DialogDescription>
        </DialogHeader>
        <PriceForm
          defaultValues={{ salesmanId: "", productId: "", price: "", validFrom: todayISO(), validTo: "" }}
          salesmen={salesmen}
          products={products}
          lockSalesmanProduct={false}
          submitLabel="Create Price"
          action={async (values) => {
            const result = await createPriceAction({
              salesmanId: values.salesmanId,
              productId: values.productId,
              price: Number(values.price),
              validFrom: values.validFrom,
              validTo: values.validTo ?? "",
            });
            return result;
          }}
          onSuccess={() => {
            toast.success("Price entry created");
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditPriceDialog({
  row,
  open,
  onOpenChange,
  salesmen,
  products,
}: {
  row: PriceRow | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  salesmen: SalesmanOption[];
  products: ProductOption[];
}) {
  if (!row) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Price</DialogTitle>
          <DialogDescription>
            {row.salesmanName} — {row.productName}
          </DialogDescription>
        </DialogHeader>
        <PriceForm
          key={row.id}
          defaultValues={{
            salesmanId: row.salesmanId,
            productId: row.productId,
            price: String(row.price),
            validFrom: row.validFrom,
            validTo: row.validTo ?? "",
          }}
          salesmen={salesmen}
          products={products}
          lockSalesmanProduct={true}
          submitLabel="Save Changes"
          action={async (values) => {
            const result = await updatePriceAction({
              priceId: row.id,
              salesmanId: values.salesmanId,
              productId: values.productId,
              price: Number(values.price),
              validFrom: values.validFrom,
              validTo: values.validTo ?? "",
            });
            return result;
          }}
          onSuccess={() => {
            toast.success("Price updated");
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
