"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { EyeCloseIcon, EyeOpenIcon } from "@/components/icons";
import "./styles.scss";

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
    <div className="input__container">
      <label htmlFor={id} className="input__label">
        {label}
      </label>
      <input
        id={id}
        className={`input__field ${errors ? "input__field--error" : ""}`}
        {...props}
      />
      {helpText && <p className="input__help-text">{helpText}</p>}
      {errors &&
        errors.map((error, index) => (
          <p key={index} className="input__error">
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
    <div className="input__container">
      <label htmlFor={id} className="input__label">
        {label}
      </label>
      <div className="input__password-container">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`input__field ${errors ? "input__field--error" : ""}`}
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
            className="input__toggle-button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOpenIcon className="input__toggle-icon" />
            ) : (
              <EyeCloseIcon className="input__toggle-icon" />
            )}
          </button>
        </div>
      </div>
      {helpText && <p className="input__help-text">{helpText}</p>}
      {errors &&
        errors.map((error, index) => (
          <p key={index} className="input__error">
            {error}
          </p>
        ))}
    </div>
  );
};
