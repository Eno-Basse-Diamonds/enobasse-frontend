interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function LoadingSpinner({
  size = 'md',
  className = '',
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-secondary-500 ${sizeClasses[size]}`} />
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );
}
