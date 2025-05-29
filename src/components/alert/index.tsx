"use client";

import React, { useState } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import "./styles.scss";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  const variants = {
    success: {
      icon: CheckCircle,
      variantClass: "alert--success",
    },
    error: {
      icon: AlertCircle,
      variantClass: "alert--error",
    },
    warning: {
      icon: AlertTriangle,
      variantClass: "alert--warning",
    },
    info: {
      icon: Info,
      variantClass: "alert--info",
    },
  };

  const variant = variants[type];
  const IconComponent = variant.icon;

  return (
    <div className={`alert ${variant.variantClass} ${className}`}>
      <div className="alert-container">
        <div className="alert-icon-container">
          <IconComponent className="alert-icon" />
        </div>
        <div className="alert-content">
          {title && <h3 className="alert-title">{title}</h3>}
          <div className="alert-body">{children}</div>
        </div>
        {dismissible && (
          <div className="alert-dismiss">
            <div className="alert-dismiss-button">
              <button
                type="button"
                onClick={handleDismiss}
                className="alert-dismiss-button-inner"
              >
                <span className="sr-only">Dismiss</span>
                <X className="dismiss-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
