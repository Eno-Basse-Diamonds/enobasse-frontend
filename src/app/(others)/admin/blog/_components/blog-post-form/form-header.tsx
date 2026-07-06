import { Eye, X } from "lucide-react";
import { Button } from "@/components/button";

interface FormHeaderProps {
  title: string;
  showPreview: boolean;
  onTogglePreview: () => void;
  onClose: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  showPreview,
  onTogglePreview,
  onClose,
}) => (
  <div className="flex items-center justify-between p-6 border-b border-primary-500/10 bg-gray-50">
    <h3 className="text-2xl font-semibold text-primary-500">{title}</h3>
    <div className="flex items-center space-x-3">
      <Button
        size="sm"
        variant="outline"
        leadingIcon={<Eye />}
        onClick={onTogglePreview}
      >
        {showPreview ? "Hide Preview" : "Show Preview"}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="rounded-full w-8 h-8"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>
    </div>
  </div>
);
