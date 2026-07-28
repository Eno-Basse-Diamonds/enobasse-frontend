"use client";

import Link from "next/link";
import { ClipboardEvent, FC, KeyboardEvent, useEffect, useRef, useState } from "react";

import { EyeCloseIcon } from "@/shared/components/icons/EyeClose";
import { EyeOpenIcon } from "@/shared/components/icons/EyeOpen";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string[];
  helpText?: React.ReactNode;
  showForgot?: boolean;
}

/**
 * Text input field.
 *
 * @description Renders a labeled text input with support for validation error
 * messages and optional help text below the field. Passes through standard
 * input HTML attributes via props.
 *
 * @param label - Visible label rendered above the input.
 * @param id - Associated input id for label/htmlFor linking.
 * @param errors - Array of error strings displayed below the input.
 * @param helpText - Optional hint or help content.
 * @param props - Additional input HTML attributes.
 * @returns A labeled input with error and help text.
 */
export const Input: FC<InputProps> = ({ label, id, errors, helpText, ...props }) => {
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
        className={`rounded-sm mt-1 sm:mt-2 block w-full py-3 px-3 sm:px-4 bg-[#D1A55933]/20 focus:ring-1 focus:ring-[#D1A559] text-sm sm:text-base ${
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

/**
 * Password input field.
 *
 * @description Extends the standard input with a show/hide password toggle
 * button and an optional "Forgot?" link that navigates to the password reset
 * flow. Maintains all InputProps except type.
 *
 * @param label - Visible label rendered above the input.
 * @param id - Associated input id.
 * @param errors - Validation error messages.
 * @param showForgot - Whether to show a "FORGOT?" link to /forgot-password.
 * @param helpText - Optional hint content.
 * @param props - Additional input HTML attributes.
 * @returns A password input with visibility controls.
 */
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
          className={`rounded-sm block w-full py-3 px-3 sm:px-4 bg-[#D1A55933]/20 focus:ring-1 focus:ring-[#D1A559] text-sm sm:text-base pr-20 ${
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

/** Props for the OTP input component. */
interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

/**
 * One-time password (OTP) input.
 *
 * @description Renders a row of individual digit input boxes for entering a
 * one-time code. Supports automatic focus advancement, Backspace to go back,
 * arrow key navigation, paste from clipboard (strips non-digits), select on
 * focus, and syncs with an external value prop.
 *
 * @param length - Number of digit inputs (default 6).
 * @param value - External value to sync with internal state.
 * @param onChange - Callback with the full OTP string.
 * @param error - Optional error message displayed below the inputs.
 * @returns A row of OTP digit inputs.
 */
export function OtpInput({ length = 6, value, onChange, error }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync external value with internal state
  useEffect(() => {
    if (value) {
      const valueArray = value.split("").slice(0, length);
      const paddedArray = [...valueArray, ...Array(length - valueArray.length).fill("")];
      setOtp(paddedArray);
    }
  }, [value, length]);

  const handleChange = (index: number, digit: string) => {
    // Only allow single digit
    if (digit.length > 1) {
      digit = digit.slice(-1);
    }

    // Only allow numbers
    if (digit && !/^\d$/.test(digit)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Update parent component
    onChange(newOtp.join(""));

    // Move to next input if digit entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Arrow key navigation
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

    if (pastedData) {
      const newOtp = [...Array(length).fill("")];
      pastedData.split("").forEach((char, index) => {
        if (index < length) {
          newOtp[index] = char;
        }
      });
      setOtp(newOtp);
      onChange(newOtp.join(""));

      // Focus last filled input or next empty one
      const lastIndex = Math.min(pastedData.length, length) - 1;
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-center gap-2 sm:gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            className={`w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-xl sm:text-2xl font-semibold
              border-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#D1A559] transition-all
              ${error ? "border-red-400" : "border-[#502B3A]/30"}
              ${digit ? "border-[#502B3A] bg-[#502B3A]/5" : "bg-white"}`}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        ))}
      </div>
      {error && <p className="text-center text-xs sm:text-sm text-red-500">{error}</p>}
    </div>
  );
}
