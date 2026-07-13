export type ReportKpis = {
  totalOrders: number;
  totalDispatchedValue: number;
  totalPaymentsCollected: number;
  totalOutstandingBalance: number;
};

export type MonthlyPoint = {
  month: string; // "Jan 25"
  dispatched: number;
  collected: number;
};

export type SalesmanPerf = {
  salesmanId: string;
  salesmanName: string;
  active: boolean;
  ordersCount: number;
  dispatchedValue: number;
  collectedValue: number;
  balance: number;
};
