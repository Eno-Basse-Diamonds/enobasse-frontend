"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { EyeOpenIcon } from "../icons/eye-open";
import { EyeCloseIcon } from "../icons/eye-close";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string[];
  helpText?: React.ReactNode;
  showForgot?: boolean;
}

export const Input: FC<InputProps> = ({
  label,
  id,
  errors,
  helpText,
  ...props
}) => {
  return (
    <div className="block">
      <label
        htmlFor={id}
        className="block font-primary font-medium text-sm sm:text-base text-[#502B3A]"
      >
        {label}
      </label>
      <input
        id={id}
        className={`mt-1 sm:mt-2 block w-full py-3 px-3 sm:px-4 bg-[#D1A55933]/20 focus:ring-1 focus:ring-[#D1A559] text-sm sm:text-base ${
          errors ? "border border-red-500" : ""
        }`}
        {...props}
      />
      {helpText && <p className="mt-2 text-sm text-[#787878]">{helpText}</p>}
      {errors &&
        errors.map((error, index) => (
          <p key={index} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
    </div>
  );
};

type PasswordInputProps = Omit<InputProps, "type">;

export const PasswordInput: FC<PasswordInputProps> = ({
  label,
  id,
  helpText,
  errors,
  showForgot = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="block">
      <label
        htmlFor={id}
        className="block font-primary font-medium text-sm sm:text-base text-[#502B3A]"
      >
        {label}
      </label>
      <div className="mt-1 sm:mt-2 relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`block w-full py-3 px-3 sm:px-4 bg-[#D1A55933]/20 focus:ring-1 focus:ring-[#D1A559] text-sm sm:text-base pr-20 ${
            errors ? "border border-red-500" : ""
          }`}
          {...props}
        />
        <div className="flex flex-row gap-x-2 items-center absolute inset-y-0 right-0 pr-3">
          {showForgot && (
            <Link
              href="/forgot-password"
              className="text-sm text-primary-300 hover:text-primary-500"
            >
              FORGOT?
            </Link>
          )}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex items-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 hover:text-gray-700" />
            ) : (
              <EyeCloseIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 hover:text-gray-700" />
            )}
          </button>
        </div>
      </div>
      {helpText && <p className="mt-2 text-sm text-[#787878]">{helpText}</p>}
      {errors &&
        errors.map((error, index) => (
          <p key={index} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
    </div>
  );
};
