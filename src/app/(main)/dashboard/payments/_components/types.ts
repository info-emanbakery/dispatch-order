export type LedgerEntryType = "debit" | "credit";

export type LedgerEntry = {
  id: string;
  salesmanId: string;
  salesmanName: string;
  entryType: LedgerEntryType;
  amount: number;
  method: string | null;
  dispatchOrderId: string | null;
  dispatchOrderNumber: string | null;
  reference: string | null;
  note: string | null;
  createdAt: string;
};

export type SalesmanBalance = {
  salesmanId: string;
  salesmanName: string;
  active: boolean;
  totalDebits: number;
  totalCredits: number;
  balance: number;
};

export type SalesmanOption = { id: string; name: string; code: string | null };
