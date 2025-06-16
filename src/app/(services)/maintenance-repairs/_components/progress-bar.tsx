interface ProgressBarProps {
  currentStep: number;
}

export const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className="flex flex-col items-center relative flex-1"
          >
            <div className="flex items-center">
              {step > 1 && (
                <div
                  className={`absolute right-[calc(50%+20px)] left-0 h-0.5 ${
                    currentStep >= step ? "bg-primary-500" : "bg-slate-200"
                  }`}
                />
              )}

              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium relative z-10 ${
                  currentStep >= step
                    ? "bg-primary-500 text-white"
                    : "bg-slate-200 text-primary-400"
                }`}
              >
                {step}
              </div>

              {step < 3 && (
                <div
                  className={`absolute left-[calc(50%+20px)] right-0 h-0.5 ${
                    currentStep > step ? "bg-primary-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>

            <span
              className={`mt-2 text-xs sm:text-sm text-center px-1 ${
                currentStep >= step
                  ? "text-primary-500 font-medium"
                  : "text-primary-400"
              }`}
            >
              {step === 1 && (
                <>
                  <span className="hidden sm:inline">Customer Details</span>
                  <span className="sm:hidden">Customer</span>
                </>
              )}
              {step === 2 && (
                <>
                  <span className="hidden sm:inline">Item Details</span>
                  <span className="sm:hidden">Item</span>
                </>
              )}
              {step === 3 && (
                <>
                  <span className="hidden sm:inline">Service Details</span>
                  <span className="sm:hidden">Service</span>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
