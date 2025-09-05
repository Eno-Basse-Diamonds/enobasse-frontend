import React from "react";

interface FormTextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows: number;
  error?: string;
}

export const FormTextareaField: React.FC<FormTextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
  error,
}) => (
  <div className="block">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full p-4 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
