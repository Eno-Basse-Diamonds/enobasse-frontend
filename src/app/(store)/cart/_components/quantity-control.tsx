import { MinusIcon, PlusIcon } from "@/components/icons";

interface QuantityControlProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onChange?: (value: number) => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  onChange,
}) => {
  return (
    <div className="cart-page__quantity-control">
      <button
        type="button"
        className="cart-page__quantity-btn"
        onClick={onDecrement}
      >
        <MinusIcon className="h-3 w-3 text-[#502B3A]" />
      </button>
      <input
        type="text"
        className="cart-page__quantity-input"
        value={quantity}
        readOnly={!onChange}
        onChange={onChange ? (e) => onChange(Number(e.target.value)) : undefined}
      />
      <button
        type="button"
        className="cart-page__quantity-btn"
        onClick={onIncrement}
      >
        <PlusIcon className="h-3 w-3 text-[#502B3A]" />
      </button>
    </div>
  );
};
