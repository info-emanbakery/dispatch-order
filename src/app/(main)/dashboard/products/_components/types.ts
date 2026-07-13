export type ProductRow = {
  id: string;
  code: string | null;
  sku: string | null;
  barcode: string | null;
  name: string;
  unit: string;
  category: string | null;
  active: boolean;
  createdAt: string;
};
