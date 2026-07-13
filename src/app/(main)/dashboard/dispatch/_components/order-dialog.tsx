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
import { Textarea } from "@/components/ui/textarea";
import { createDispatchOrderAction, updateDispatchOrderAction } from "@/server/dispatch-actions";

import type { DispatchOrderRow, SalesmanOption } from "./types";

const formSchema = z.object({
  salesmanId: z.uuid({ error: "Select a salesman." }),
  orderDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date."),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function OrderForm({
  defaultValues,
  salesmen,
  onSuccess,
  onCancel,
  submitLabel,
  action,
}: {
  defaultValues: FormValues;
  salesmen: SalesmanOption[];
  onSuccess: (orderId?: string) => void;
  onCancel: () => void;
  submitLabel: string;
  action: (values: FormValues) => Promise<{ success: boolean; error?: string; orderId?: string }>;
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const form = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    const result = await action(values);
    setSubmitting(false);
    if (result.success) {
      onSuccess("orderId" in result ? result.orderId : undefined);
    } else {
      toast.error("Action failed", { description: result.error });
    }
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="salesmanId"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel>Salesman *</FieldLabel>
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="orderDate"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="do-date">Order Date *</FieldLabel>
              <Input {...field} id="do-date" type="date" disabled={submitting} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="notes"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="do-notes">Notes (optional)</FieldLabel>
              <Textarea
                {...field}
                id="do-notes"
                rows={3}
                placeholder="Route notes, special instructions…"
                disabled={submitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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

export function CreateOrderDialog({
  open,
  onOpenChange,
  salesmen,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  salesmen: SalesmanOption[];
  onCreated?: (orderId: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New Dispatch Order</DialogTitle>
          <DialogDescription>Create a draft order. Add products on the next step.</DialogDescription>
        </DialogHeader>
        <OrderForm
          defaultValues={{ salesmanId: "", orderDate: todayISO(), notes: "" }}
          salesmen={salesmen}
          submitLabel="Create Order"
          action={async (values) => {
            const result = await createDispatchOrderAction(values);
            return result;
          }}
          onSuccess={(orderId) => {
            toast.success("Draft order created");
            onOpenChange(false);
            if (orderId && onCreated) onCreated(orderId);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export function EditOrderDialog({
  order,
  open,
  onOpenChange,
  salesmen,
}: {
  order: DispatchOrderRow | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  salesmen: SalesmanOption[];
}) {
  if (!order) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {order.orderNumber}</DialogTitle>
          <DialogDescription>Update header — only available on draft orders.</DialogDescription>
        </DialogHeader>
        <OrderForm
          key={order.id}
          defaultValues={{ salesmanId: order.salesmanId, orderDate: order.orderDate, notes: order.notes ?? "" }}
          salesmen={salesmen}
          submitLabel="Save Changes"
          action={async (values) => {
            const result = await updateDispatchOrderAction({ orderId: order.id, ...values });
            return result;
          }}
          onSuccess={() => {
            toast.success("Order updated");
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
