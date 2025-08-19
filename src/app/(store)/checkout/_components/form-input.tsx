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
      <label htmlFor={id} className="form-input__label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="form-input__field"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
