interface ProductDetailsProps {
  metalName: string;
  isModal?: boolean;
  onClose?: () => void;
}

export function ProductDetails({
  metalName,
  isModal = false,
  onClose,
}: ProductDetailsProps) {
  const details = [
    { label: "Stock Number", value: "BR4377M-14K-WG", bg: false },
    { label: "Metal", value: metalName, bg: true },
    { label: "Width", value: "1.5mm", bg: false },
    { label: "Length", value: "1.5-1.8mm", bg: true },
    { label: "Head Type", value: metalName, bg: false },
    { label: "Shank Type", value: metalName, bg: true },
  ];

  const content = (
    <div className="text-sm">
      {details.map((detail, index) => (
        <div
          key={index}
          className={`flex justify-between ${detail.bg ? "bg-gray-50" : ""} p-3 rounded-sm`}
        >
          <span className="text-gray-600">{detail.label}</span>
          <span className="text-primary-500 font-medium">{detail.value}</span>
        </div>
      ))}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 backdrop">
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-sm shadow-xl h-[70vh] overflow-y-auto animate-slide-up">
          <div className="sticky top-0 bg-white flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Product Details</h2>
            <button className="p-2" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">{content}</div>
        </div>
      </div>
    );
  }

  return <div className="hidden lg:block">{content}</div>;
}
