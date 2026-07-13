export type DispatchStatus = "draft" | "submitted" | "delivered" | "partial" | "returned" | "cancelled";

export const DISPATCH_STATUS_LABELS: Record<DispatchStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  delivered: "Delivered",
  partial: "Partial",
  returned: "Returned",
  cancelled: "Cancelled",
};

export type DispatchOrderItem = {
  id: string;
  productId: string;
  productName: string;
  productUnit: string;
  quantity: number;
  qtyReturned: number;
  unitPrice: number;
  lineTotal: number;
};

export type DispatchOrderRow = {
  id: string;
  orderNumber: string;
  salesmanId: string;
  salesmanName: string;
  orderDate: string;
  status: DispatchStatus;
  notes: string | null;
  total: number;
  itemCount: number;
  createdAt: string;
};

export type DispatchOrderDetail = DispatchOrderRow & {
  items: DispatchOrderItem[];
};

export type SalesmanOption = { id: string; name: string; code: string | null };
export type ProductOption = {
  id: string;
  name: string;
  sku: string | null;
  unit: string;
  activePrice: number | null;
};
