import { X } from "lucide-react";
import { Button } from "@/components/button";

interface AdminModalProps {
  title: string | React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  onConfirm?: () => void;
  confirmText?: string;
  confirmLoading?: boolean;
  confirmVariant?: "primary" | "danger";
  customHeader?: React.ReactNode;
}

export function AdminModal({
  title,
  onClose,
  children,
  footer,
  maxWidth = "max-w-5xl",
  onConfirm,
  confirmText = "Save",
  confirmLoading,
  confirmVariant = "primary",
  customHeader,
}: AdminModalProps) {
  const defaultFooter = onConfirm ? (
    <>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button variant={confirmVariant} onClick={onConfirm} loading={confirmLoading}>
        {confirmText}
      </Button>
    </>
  ) : undefined;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-6">
      <div className={`bg-white w-full ${maxWidth} max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] flex flex-col shadow-2xl rounded-sm`}>
        {customHeader || (
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-primary-500/10 bg-gray-50 shrink-0">
            {typeof title === "string" ? (
              <h3 className="text-lg sm:text-xl font-semibold text-primary-500 truncate pr-2">
                {title}
              </h3>
            ) : (
              title
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="rounded-full w-8 h-8 shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 min-h-[320px] sm:min-h-[400px]">
          {children}
        </div>

        {(footer || defaultFooter) && (
          <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
            {footer || defaultFooter}
          </div>
        )}
      </div>
    </div>
  );
}