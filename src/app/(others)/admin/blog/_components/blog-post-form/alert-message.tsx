import { Alert } from "@/components/alert";
import { FormState } from "@/lib/api/blog-posts";

interface AlertMessageProps {
  state: FormState;
}

export const AlertMessage = ({ state }: AlertMessageProps) => {
  if (!state.message) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md w-full z-[9999]">
      <Alert
        type={state.success ? "success" : "error"}
        className="mb-6"
        dismissible
      >
        {state.message}
      </Alert>
    </div>
  );
};
