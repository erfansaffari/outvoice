import type { AddOn, InvoiceCalcResult } from "./types";

export function calculateInvoice(params: {
  packageRate: number;
  includedHours: number;
  hoursWorked: number;
  overtimeRate: number;
  travelFee: number;
  selectedAddOns: AddOn[];
  depositPaid: number;
}): InvoiceCalcResult {
  const {
    packageRate,
    includedHours,
    hoursWorked,
    overtimeRate,
    travelFee,
    selectedAddOns,
    depositPaid,
  } = params;

  const lineItems: InvoiceCalcResult["lineItems"] = [];

  lineItems.push({ label: "Package", amount: packageRate });

  const overtimeHours = Math.max(0, hoursWorked - includedHours);
  if (overtimeHours > 0) {
    lineItems.push({
      label: `Overtime (${overtimeHours}h × $${overtimeRate}/hr)`,
      amount: overtimeHours * overtimeRate,
    });
  }

  if (travelFee > 0) {
    lineItems.push({ label: "Travel fee", amount: travelFee });
  }

  for (const addOn of selectedAddOns) {
    lineItems.push({ label: addOn.name, amount: addOn.price });
  }

  const subtotal = lineItems.reduce((sum, i) => sum + i.amount, 0);

  return {
    lineItems,
    subtotal,
    deposit: depositPaid,
    totalDue: Math.max(0, subtotal - depositPaid),
  };
}
