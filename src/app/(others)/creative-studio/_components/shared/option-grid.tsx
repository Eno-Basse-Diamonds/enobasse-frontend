import Image from 'next/image';
import type { Option } from '../../../../../lib/types/creative-studio';

interface OptionGridProps {
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabledIds?: string[];
  columns?: number;
  imageSize?: number;
  className?: string;
}

export function OptionGrid({
  options,
  selectedId,
  onSelect,
  disabledIds = [],
  columns = 5,
  imageSize = 40,
  className = '',
}: OptionGridProps) {
  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-3 ${className}`}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const isDisabled = disabledIds.includes(option.id) || option.disabled;

        return (
          <button
            key={option.id}
            onClick={() => !isDisabled && onSelect(option.id)}
            className={`
              p-3 rounded-sm text-center flex flex-col items-center gap-2
              ${isSelected
                ? 'border border-gray-300 bg-gray-50'
                : 'border border-transparent hover:border-gray-300'
              }
              ${isDisabled ? 'cursor-not-allowed opacity-50 border-none' : ''}
            `}
            disabled={isDisabled}
            title={option.name}
          >
            <Image
              src={option.image}
              alt={option.name}
              height={imageSize}
              width={imageSize}
            />
            <p className="text-xs">{option.name}</p>
          </button>
        );
      })}
    </div>
  );
}
