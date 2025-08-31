interface DividerProps {
  label: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ label, className }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-[#D1A559]/60"></div>
      </div>
      <div className="relative flex justify-center">
        <span
          className={
            className
              ? className
              : "px-2 bg-white text-xs sm:text-sm text-[#502B3A]"
          }
        >
          {label}
        </span>
      </div>
    </div>
  );
};
