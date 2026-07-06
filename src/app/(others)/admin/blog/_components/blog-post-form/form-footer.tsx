import { Button } from "@/components/button";

interface FormFooterProps {
  onClose: () => void;
  isPending: boolean;
  isValid: boolean;
  submitButtonText: string;
}

export const FormFooter: React.FC<FormFooterProps> = ({
  onClose,
  isPending,
  isValid,
  submitButtonText,
}) => (
  <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
    <Button variant="outline" onClick={onClose}>
      Cancel
    </Button>
    <Button type="submit" loading={isPending} disabled={!isValid}>
      <span>{submitButtonText}</span>
    </Button>
  </div>
);
