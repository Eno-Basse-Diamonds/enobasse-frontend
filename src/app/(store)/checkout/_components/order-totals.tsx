import { getCurrencySymbol } from "@/lib/utils/money";

interface OrderTotalsProps {
  subtotal: number;
  totalItems: number;
  currency: string;
}

export function OrderTotals({
  subtotal,
  totalItems,
  currency,
}: OrderTotalsProps) {
  const formattedPrice = (amount: number) => amount.toLocaleString();

  return (
    <div className="space-y-4 border-t border-gray-200 pt-4">
      <div className="flex justify-between">
        <span className="text-sm text-[#502B3A]">
          Subtotal ({totalItems} items)
        </span>
        <span className="text-sm font-medium text-[#502B3A]">
          {getCurrencySymbol(currency)}
          {formattedPrice(subtotal)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-[#502B3A]">Shipping</span>
        <span className="text-sm font-medium text-[#502B3A]">N/A</span>
      </div>
      <div className="flex justify-between border-t border-gray-200 pt-4">
        <span className="text-base font-medium text-[#502B3A]">Total</span>
        <span className="text-base font-bold text-[#502B3A]">
          {getCurrencySymbol(currency)}
          {formattedPrice(subtotal)}
        </span>
      </div>
    </div>
  );
}
