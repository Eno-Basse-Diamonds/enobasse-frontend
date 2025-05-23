"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, HTMLMotionProps } from "motion/react";
import { ArrowLeftIcon } from "../icons";
import "./styles.scss";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

interface LinkButtonProps extends Omit<ButtonProps, "href"> {
  href: string;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  ...props
}, ref) => {
  const baseClass = "button";
  const variantClass = `button--${variant}`;
  const sizeClass = `button--${size}`;
  const widthClass = fullWidth ? "button--full" : "";
  const loadingClass = isLoading ? "button--loading" : "";

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    widthClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const buttonContent = (
    <>
      {isLoading && (
        <span className="button__loader" aria-hidden="true">
          <span className="button__loader-dot" />
          <span className="button__loader-dot" />
          <span className="button__loader-dot" />
        </span>
      )}
      {!isLoading && leftIcon && (
        <span className="button__icon button__icon--left">{leftIcon}</span>
      )}
      <span className="button__text">{children}</span>
      {!isLoading && rightIcon && (
        <span className="button__icon button__icon--right">{rightIcon}</span>
      )}
    </>
  );

  return (
    <motion.button
      ref={ref}
      className={classes}
      disabled={isLoading || props.disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
});

ButtonComponent.displayName = "Button";

export const Button = ButtonComponent;

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  ...props
}) => {
  return (
    <motion.a
      href={href}
      className={props.className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button {...props} />
    </motion.a>
  );
};

export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      className="back-button"
      aria-label="Go back to previous page"
      onClick={handleBack}
    >
      <ArrowLeftIcon className="back-button__icon" />
    </button>
  );
};
