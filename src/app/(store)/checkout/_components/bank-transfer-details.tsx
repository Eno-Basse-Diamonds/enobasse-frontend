import Image from "next/image";
import { getCurrencySymbol } from "@/lib/utils/money";

interface BankTransferDetailsProps {
  amount: number;
  currency: string;
}

const BANK_NAME = process.env.NEXT_PUBLIC_BANK_NAME ?? "GT Bank";
const ACCOUNT_NAME =
  process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME ?? "Eno Bassé Jewellery";
const NGN_ACCOUNT = process.env.NEXT_PUBLIC_BANK_NGN_ACCOUNT ?? "";
const USD_ACCOUNT = process.env.NEXT_PUBLIC_BANK_USD_ACCOUNT ?? "";

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
              alt={BANK_NAME}
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-sm">{BANK_NAME} (NGN)</span>
        </div>
        <p className="font-mono text-sm bg-gray-50 p-2 rounded">{NGN_ACCOUNT}</p>
        <p className="text-xs text-gray-600 mt-1">{ACCOUNT_NAME}</p>
      </div>

      <div className="border border-gray-200 p-3 rounded-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 relative">
            <Image
              src="https://res.cloudinary.com/enobasse/image/upload/v1756511213/gtbank_ttbzya.png"
              alt={BANK_NAME}
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-sm">{BANK_NAME} (USD)</span>
        </div>
        <p className="font-mono text-sm bg-gray-50 p-2 rounded">{USD_ACCOUNT}</p>
        <p className="text-xs text-gray-600 mt-1">{ACCOUNT_NAME}</p>
      </div>
    </div>
  );
}
