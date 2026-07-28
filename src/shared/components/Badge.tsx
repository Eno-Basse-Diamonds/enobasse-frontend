const STYLES: Record<string, string> = {
  paid: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-gray-50 text-gray-600 border-gray-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  flagged: "bg-red-50 text-red-700 border-red-300 font-semibold",
};

const LABELS: Record<string, string> = {
  flagged: "Flagged — review",
};

/**
 * Payment status badge.
 *
 * @description Renders a small colored label indicating the payment state of an order.
 * Supports paid (green), pending (gray), failed (red), and flagged (red, bold) statuses.
 * Defaults to "pending" when no status is provided.
 *
 * @param paymentStatus - The current payment status string.
 * @returns A styled span element with status-appropriate colors.
 */
export function PaymentStatusBadge({ paymentStatus }: { paymentStatus?: string }) {
  const status = paymentStatus || "pending";
  const classes = STYLES[status] || STYLES.pending;
  const label = LABELS[status] || status;

  return (
    <span className={`text-xs px-2 py-1 border capitalize rounded-sm ${classes}`}>{label}</span>
  );
}
