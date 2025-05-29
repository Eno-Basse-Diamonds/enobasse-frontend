"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "../icons";
import "./styles.scss";

type IconProps = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

type IconElement = React.ReactElement<IconProps>;

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonType = "button" | "submit" | "reset";

type BaseButtonProps = {
  children?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  leadingIcon?: IconElement;
  trailingIcon?: IconElement;
};

type ButtonButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    type?: ButtonType;
    href?: never;
    target?: never;
    rel?: never;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

type ButtonAnchorProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "type"> & {
    type?: never;
    href: string;
    target?: string;
    rel?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  };

type ButtonProps = ButtonButtonProps | ButtonAnchorProps;

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  type = "button",
  href,
  target,
  rel,
  leadingIcon,
  trailingIcon,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const getButtonClasses = () => {
    const baseClass = "button";
    const sizeClass = `button--${size}`;
    const variantClass = `button--${variant}`;
    return `${baseClass} ${sizeClass} ${variantClass} ${className}`;
  };

  const getIconSizeClass = () => `button__icon--${size}`;

  const renderLeadingIcon = () => {
    if (loading) {
      return <Loader2 className={`button__spinner ${getIconSizeClass()}`} />;
    }
    if (leadingIcon) {
      return React.cloneElement(leadingIcon, {
        className: `${leadingIcon.props.className || ""} ${getIconSizeClass()}`,
      });
    }
    return null;
  };

  const renderTrailingIcon = () => {
    if (loading || !trailingIcon) return null;
    return React.cloneElement(trailingIcon, {
      className: `${trailingIcon.props.className || ""} ${getIconSizeClass()}`,
    });
  };

  const content = (
    <>
      {renderLeadingIcon()}
      {children && <span>{children}</span>}
      {renderTrailingIcon()}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={getButtonClasses()}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={getButtonClasses()}
      disabled={isDisabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
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
