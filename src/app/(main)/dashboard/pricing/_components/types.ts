export type PriceStatus = "active" | "scheduled" | "expired";

export type PriceRow = {
  id: string;
  salesmanId: string;
  salesmanName: string;
  productId: string;
  productName: string;
  price: number;
  validFrom: string;
  validTo: string | null;
  status: PriceStatus;
};

export type SalesmanOption = { id: string; name: string; code: string | null };
export type ProductOption = { id: string; name: string; sku: string | null; unit: string };
