"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useAlertStore } from "@/lib/store/alert";
import "./styles.scss";

interface AlertProps {
  id?: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  duration?: number;
}

export const AppAlert = () => {
  const alerts = useAlertStore((state) => state.alerts);
  const removeAlert = useAlertStore((state) => state.removeAlert);

  return (
    <>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          id={alert.id}
          type={alert.type}
          title={alert.title}
          dismissible={alert.dismissible ?? true}
          onDismiss={() => removeAlert(alert.id)}
          duration={alert.duration}
        >
          {alert.message}
        </Alert>
      ))}
    </>
  );
};

export const Alert: React.FC<AlertProps> = ({
  id,
  type = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className = "",
  duration,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const removeAlert = useAlertStore((state) => state.removeAlert);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) onDismiss();
      if (id) removeAlert(id);
    }, 300);

    return () => clearTimeout(timer);
  }, [onDismiss, id, removeAlert]);

  useEffect(() => {
    if (duration && isVisible && !isExiting) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, isExiting, handleDismiss]);

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
    <div
      className={`alert ${variant.variantClass} ${className} ${isExiting ? "alert--exiting" : ""}`}
      role="alert"
      aria-live="assertive"
    >
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
            <button
              type="button"
              onClick={handleDismiss}
              className="alert-dismiss-button"
              aria-label="Dismiss alert"
            >
              <X className="dismiss-icon" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
