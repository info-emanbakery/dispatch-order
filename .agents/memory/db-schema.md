---
name: DB schema pointers
description: Non-obvious table/column names and relationships in the bakery dispatch schema
---

Key non-obvious facts (all derivable from the foundation migration but easy to get wrong):

- Dispatch items table: `dispatch_items` (NOT `dispatch_order_items`). FK: `dispatch_order_id`. Columns: `quantity` (integer), `line_total` (generated column).
- Payments ledger: `ledger_entries.created_by` references `public.profiles(id)` — NOT `auth.users`. Always pass `session.userId`.
- `salesman_balances` is a VIEW (security_invoker=on). Columns: `salesman_id, name, active, total_debits, total_credits, balance`. RLS applies through it.
- Payment methods enum (string check): `cash | bank_transfer | cheque | mobile_wallet | other`
- Order status enum (string check): `draft | confirmed | delivered | partially_returned | cancelled`
- APP_MODULES keys: `users, salesmen, products, pricing, dispatch, payments, reports`
- `record_payment` DB function uses `auth.uid()` which is null in admin-client calls — insert directly via `createAdminClient()` instead of calling the function.

**Why:** The `record_payment` DB function relies on `auth.uid()` for the permission check, but server actions use the service-role key (no JWT). Direct insert via admin client is the correct bypass.
