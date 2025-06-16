import { Button } from "@/components";
import { Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  onPrevStep: (e: React.MouseEvent) => void;
  onNextStep: (e: React.MouseEvent) => void;
  isSubmitting?: boolean;
}

export const NavigationButtons = ({
  currentStep,
  onPrevStep,
  onNextStep,
  isSubmitting = false,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between items-center px-4 sm:px-0 mt-8">
      {currentStep > 1 && (
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={onPrevStep}
          disabled={isSubmitting}
        >
          Previous Step
        </Button>
      )}

      {currentStep < 3 ? (
        <Button
          type="button"
          onClick={onNextStep}
          size="lg"
          className="ml-auto"
          disabled={isSubmitting}
        >
          Next Step
        </Button>
      ) : (
        <Button
          type="submit"
          size="lg"
          className="ml-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
            </span>
          ) : (
            "Submit Request"
          )}
        </Button>
      )}
    </div>
  );
};
