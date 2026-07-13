import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Dispatch Order",
  version: packageJson.version,
  copyright: `© ${currentYear}, Dispatch Order.`,
  meta: {
    title: "Dispatch Order — Internal Dispatch & Ledger",
    description:
      "Internal dispatch and ledger management system for field sales operations: dispatch orders, salesman-specific pricing, payments, and reporting.",
  },
};
