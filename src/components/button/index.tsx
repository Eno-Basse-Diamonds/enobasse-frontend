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
export const WhatsAppButton = () => {
  const phoneNumber = "2349164886579";

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="bg-primary-500 text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.479 5.092 1.479 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </button>
    </div>
  );
};
