type FormInputProps = {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormInput({
  id,
  label,
  type = "text",
  placeholder = "",
  required = false,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className="form-input">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#502B3A] mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-4 py-2 border border-gray-300 focus:ring-[#D1A559] focus:border-[#D1A559] rounded-sm"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
