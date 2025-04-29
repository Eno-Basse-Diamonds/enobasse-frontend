"use client";

type PaymentMethodProps = {
  id: string;
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function PaymentMethod({
  id,
  label,
  name,
  checked = false,
  onChange,
}: PaymentMethodProps) {
  return (
    <div className="payment-method">
      <input
        id={id}
        name={name}
        type="radio"
        className="payment-method__input"
        checked={checked}
        onChange={() => {}}
      />
      <label htmlFor={id} className="payment-method__label">
        {label}
      </label>
    </div>
  );
}
