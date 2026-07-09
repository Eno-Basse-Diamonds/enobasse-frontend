"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useAlertStore } from "@/lib/store/alert";

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
    <div
      className="fixed top-0 right-0 left-0 sm:left-auto sm:top-4 sm:right-4 z-9999 p-4 sm:p-0 flex flex-col gap-3 pointer-events-none"
      aria-live="assertive"
    >
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          id={alert.id}
          type={alert.type}
          title={alert.title}
          dismissible={alert.dismissible ?? true}
          onDismiss={() => removeAlert(alert.id)}
          duration={alert.duration}
          className="pointer-events-auto shadow-lg"
        >
          {alert.message}
        </Alert>
      ))}
    </div>
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
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      iconColor: "text-green-400",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      iconColor: "text-red-400",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-400",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      iconColor: "text-blue-400",
    },
  };

  const variant = variants[type];
  const IconComponent = variant.icon;

  return (
    <div
      className={`rounded-sm border p-4 w-full sm:max-w-md ${
        variant.bgColor
      } ${variant.borderColor} ${variant.textColor} ${className} ${
        isExiting
          ? "opacity-0 transition-opacity duration-300 ease-out"
          : "animate-in slide-in-from-top-2 sm:slide-in-from-right-2 duration-300"
      }`}
      role="alert"
    >
      <div className="flex">
        <div className="shrink-0">
          <IconComponent className={`h-5 w-5 ${variant.iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              onClick={handleDismiss}
              className="-mx-1.5 -my-1.5 inline-flex p-1.5 focus:outline-none hover:bg-black/10 hover:rounded-full"
              aria-label="Dismiss alert"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
