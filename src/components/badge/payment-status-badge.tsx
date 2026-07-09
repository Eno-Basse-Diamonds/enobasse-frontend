const STYLES: Record<string, string> = {
  paid: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-gray-50 text-gray-600 border-gray-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  flagged: "bg-red-50 text-red-700 border-red-300 font-semibold",
};

const LABELS: Record<string, string> = {
  flagged: "Flagged — review",
};

export function PaymentStatusBadge({
  paymentStatus,
}: {
  paymentStatus?: string;
}) {
  const status = paymentStatus || "pending";
  const classes = STYLES[status] || STYLES.pending;
  const label = LABELS[status] || status;

  return (
    <span
      className={`text-xs px-2 py-1 border capitalize rounded-sm ${classes}`}
    >
      {label}
    </span>
  );
}
