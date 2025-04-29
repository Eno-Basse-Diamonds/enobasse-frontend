type CheckoutFormSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function CheckoutFormSection({
  title,
  children,
}: CheckoutFormSectionProps) {
  return (
    <div className="checkout-form-section">
      <h2 className="checkout-form-section__title">{title}</h2>
      {children}
    </div>
  );
}
