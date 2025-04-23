"use client";

import React, { FC } from "react";
import { EyeCloseIcon, EyeOpenIcon } from "@/components/icons";
import { useState } from "react";
import "./styles.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: React.ReactNode;
}

export const Input: FC<InputProps> = ({
  label,
  id,
  error,
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
        className={`input__field ${error ? "input__field--error" : ""}`}
        {...props}
      />
      {helpText && <p className="input__help-text">{helpText}</p>}
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};

type PasswordInputProps = Omit<InputProps, "type">;

export const PasswordInput: FC<PasswordInputProps> = ({
  label,
  id,
  helpText,
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
          className="input__field"
          {...props}
        />
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
      {helpText && <p className="input__help-text">{helpText}</p>}
      {props.error && <p className="input__error">{props.error}</p>}
    </div>
  );
};
