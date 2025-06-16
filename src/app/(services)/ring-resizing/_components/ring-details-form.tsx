import { ChevronDown } from "lucide-react";

interface RingDetailsFormProps {
  formData: {
    ringType: string;
    currentSize: string;
    desiredSize: string;
    urgency: string;
  };
  errors: {
    ringType?: string;
    currentSize?: string;
    desiredSize?: string;
  };
  onInputChange: (section: string, field: string, value: string) => void;
  ringTypes: string[];
  ringSizes: string[];
}

export const RingDetailsForm = ({
  formData,
  errors,
  onInputChange,
  ringTypes,
  ringSizes,
}: RingDetailsFormProps) => {
  return (
    <div className="bg-white border border-primary-100 shadow-md overflow-hidden">
      <div className="flex items-center justify-center space-x-3 my-6">
        <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
          Ring Details
        </h2>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ring Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.ringType}
                onChange={(e) => onInputChange("ringType", "", e.target.value)}
                className={`w-full px-4 py-3 border appearance-none ${
                  errors.ringType ? "border-red-500" : "border-slate-300"
                }`}
                required
              >
                <option value="">Select ring type</option>
                {ringTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
            {errors.ringType && (
              <p className="text-red-500 text-sm mt-1">{errors.ringType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Size <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.currentSize}
                onChange={(e) => onInputChange("currentSize", "", e.target.value)}
                className={`w-full px-4 py-3 border appearance-none ${
                  errors.currentSize ? "border-red-500" : "border-slate-300"
                }`}
                required
              >
                <option value="">Select current size</option>
                {ringSizes.map((size) => (
                  <option key={size} value={size}>
                    Size {size}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
            {errors.currentSize && (
              <p className="text-red-500 text-sm mt-1">{errors.currentSize}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Desired Size <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.desiredSize}
                onChange={(e) => onInputChange("desiredSize", "", e.target.value)}
                className={`w-full px-4 py-3 border appearance-none ${
                  errors.desiredSize ? "border-red-500" : "border-slate-300"
                }`}
                required
              >
                <option value="">Select desired size</option>
                {ringSizes.map((size) => (
                  <option key={size} value={size}>
                    Size {size}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
            {errors.desiredSize && (
              <p className="text-red-500 text-sm mt-1">{errors.desiredSize}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Service Priority
            </label>
            <div className="relative">
              <select
                value={formData.urgency}
                onChange={(e) => onInputChange("urgency", "", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 appearance-none"
              >
                <option value="standard">Standard (7-10 days)</option>
                <option value="expedited">Expedited (3-5 days) +$50</option>
                <option value="rush">Rush (1-2 days) +$100</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
