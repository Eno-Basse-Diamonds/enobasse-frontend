interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

/**
 * Loading spinner indicator.
 *
 * @description Renders a simple spinning border animation with optional
 * descriptive text below it. Supports sm, md, and lg sizes.
 * @param size - Spinner size (sm, md, lg; default md).
 * @param className - Additional CSS classes.
 * @param text - Optional label rendered below the spinner.
 * @returns A spinner element with optional text.
 */
export function LoadingSpinner({ size = "md", className = "", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-secondary-500 ${sizeClasses[size]}`}
      />
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );
}
