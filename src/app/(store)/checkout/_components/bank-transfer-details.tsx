import Image from "next/image";
import { getCurrencySymbol } from "@/lib/utils/money";

interface BankTransferDetailsProps {
  amount: number;
  currency: string;
}

export function BankTransferDetails({
  amount,
  currency,
}: BankTransferDetailsProps) {
  const formattedPrice = (val: number) => val.toLocaleString();

  return (
    <div className="mb-4 space-y-3">
      <p className="text-sm text-gray-600 mb-3">
        Transfer {getCurrencySymbol(currency)}
        {formattedPrice(amount)} to:
      </p>

      <div className="border border-gray-200 p-3 rounded-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 relative">
            <Image
              src="https://res.cloudinary.com/enobasse/image/upload/v1756511213/gtbank_ttbzya.png"
              alt="GT Bank"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-sm">GT Bank (NGN)</span>
        </div>
        <p className="font-mono text-sm bg-gray-50 p-2 rounded">0638724267</p>
        <p className="text-xs text-gray-600 mt-1">Eno Bassé Jewellery</p>
      </div>

      <div className="border border-gray-200 p-3 rounded-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 relative">
            <Image
              src="https://res.cloudinary.com/enobasse/image/upload/v1756511213/gtbank_ttbzya.png"
              alt="GT Bank"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-sm">GT Bank (USD)</span>
        </div>
        <p className="font-mono text-sm bg-gray-50 p-2 rounded">0670021982</p>
        <p className="text-xs text-gray-600 mt-1">Eno Bassé Jewellery</p>
      </div>
    </div>
  );
}
