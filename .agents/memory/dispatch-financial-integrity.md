---
name: Dispatch financial integrity rules
description: Critical patterns for the dispatch order flow to maintain ledger correctness — price trust, atomicity, reversals.
---

## Rules

**1. Never trust client-supplied unit_price.**
`upsertOrderItemAction` must fetch `unit_price` from `salesman_prices` on the server. The client shows the price as a display hint only. Schema must NOT include `unitPrice`.

**Why:** An authenticated user with `dispatch:edit` can forge any price (including 0) by calling the server action directly with a custom payload.

**How to apply:** Always query `salesman_prices WHERE salesman_id = order.salesman_id AND product_id = ? AND valid_to IS NULL AND valid_from <= today ORDER BY valid_from DESC LIMIT 1`. Return an error if no active price found.

---

**2. Insert ledger entry BEFORE flipping order status.**
In `submitOrderAction`: insert `ledger_entries (debit)` first, then `UPDATE dispatch_orders SET status='submitted' WHERE id=? AND status='draft'`.

**Why:** If the status update runs first and the ledger insert fails, the order is submitted with no financial record. With the reversed order, a failed ledger insert leaves the order in draft (safe to retry). The conditional `.eq('status','draft')` on the UPDATE also closes the double-submit race.

**How to apply:** If the conditional UPDATE returns no rows, a concurrent submit already succeeded — delete the just-inserted ledger entry and return an error.

---

**3. Insert a compensating credit when cancelling or returning.**
In `advanceOrderStatusAction`: when `newStatus === 'cancelled' || newStatus === 'returned'`, insert a `ledger_entries (credit)` entry equal to `order.total` referencing the same `dispatch_order_id` BEFORE updating status. If ledger insert fails, abort (do not change status).

**Why:** The debit created at submit time permanently inflates the salesman's balance unless explicitly reversed. Without the credit, a returned/cancelled order makes it look like the salesman owes money for goods they never kept.

---

**4. Validate qty_returned ≤ item.quantity server-side.**
In `updateReturnedQtyAction`: always fetch the item's `quantity` and reject if `qtyReturned > quantity`.

**Why:** Client validation is bypassable. Allowing return > dispatch creates negative effective delivery quantities and corrupts return reporting.
