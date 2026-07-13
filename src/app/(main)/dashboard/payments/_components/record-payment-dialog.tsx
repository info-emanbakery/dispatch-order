"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { recordPaymentAction } from "@/server/payment-actions";

import type { SalesmanOption } from "./types";

const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cheque", label: "Cheque" },
  { value: "mobile_wallet", label: "Mobile Wallet" },
  { value: "other", label: "Other" },
] as const;

const formSchema = z.object({
  salesmanId: z.uuid({ error: "Select a salesman." }),
  amount: z
    .string()
    .trim()
    .min(1, "Amount is required.")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, "Amount must be positive."),
  method: z.enum(["cash", "bank_transfer", "cheque", "mobile_wallet", "other"]),
  reference: z.string().trim().max(100).optional().or(z.literal("")),
  note: z.string().trim().max(500).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function RecordPaymentDialog({
  open,
  onOpenChange,
  salesmen,
  preselectedSalesmanId,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  salesmen: SalesmanOption[];
  preselectedSalesmanId?: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesmanId: preselectedSalesmanId ?? "",
      amount: "",
      method: "cash",
      reference: "",
      note: "",
    },
  });

  // Reset when the pre-selected salesman changes
  React.useEffect(() => {
    if (open) {
      form.reset({
        salesmanId: preselectedSalesmanId ?? "",
        amount: "",
        method: "cash",
        reference: "",
        note: "",
      });
    }
  }, [open, preselectedSalesmanId, form]);

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    const result = await recordPaymentAction(values);
    setSubmitting(false);
    if (result.success) {
      toast.success("Payment recorded");
      router.refresh();
      onOpenChange(false);
    } else {
      toast.error("Failed to record payment", { description: result.error });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <DialogDescription>Add a credit entry to the salesman ledger.</DialogDescription>
        </DialogHeader>
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
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={form.control}
                name="amount"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="pay-amount">Amount (EGP) *</FieldLabel>
                    <Input
                      {...field}
                      id="pay-amount"
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
              <Controller
                control={form.control}
                name="method"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel>Method</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={submitting}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {PAYMENT_METHODS.map((m) => (
                            <SelectItem key={m.value} value={m.value}>
                              {m.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            <Controller
              control={form.control}
              name="reference"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="pay-ref">Reference (cheque #, receipt #…)</FieldLabel>
                  <Input {...field} id="pay-ref" placeholder="CHQ-0001" disabled={submitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="note"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="pay-note">Note (optional)</FieldLabel>
                  <Textarea {...field} id="pay-note" rows={2} placeholder="Additional details…" disabled={submitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Spinner className="size-4" />}
              Record Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
