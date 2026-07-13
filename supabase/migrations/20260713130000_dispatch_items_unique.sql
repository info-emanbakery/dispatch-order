-- Add missing unique constraint on dispatch_items so that each product
-- appears at most once per order. This also enables proper ON CONFLICT
-- handling in upsert operations.
alter table public.dispatch_items
  add constraint dispatch_items_order_product_unique
  unique (dispatch_order_id, product_id);
