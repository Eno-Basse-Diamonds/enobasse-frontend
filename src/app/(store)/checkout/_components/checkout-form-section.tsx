type CheckoutFormSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function CheckoutFormSection({
  title,
  children,
}: CheckoutFormSectionProps) {
  return (
    <div className="bg-white shadow p-8 mb-6">
      <h2 className="text-xl font-semibold text-[#502B3A] mb-6">{title}</h2>
      {children}
    </div>
  );
}
