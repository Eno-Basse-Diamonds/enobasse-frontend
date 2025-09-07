import { ChevronDown  } from "lucide-react";

interface ServiceDetailsFormProps {
  formData: {
    serviceType: string;
    urgency: string;
    description: string;
    preferredContact: string;
    pickupDelivery: string;
  };
  errors?: {
    serviceType?: string;
    urgency?: string;
    description?: string;
  };
  onInputChange: (field: string, value: string | boolean) => void;
}

export const ServiceDetailsForm = ({
  formData,
  errors,
  onInputChange,
}: ServiceDetailsFormProps) => {
  return (
    <div className="space-y-8">
      {/* Service Information */}
      <div className="bg-white border border-primary-100 shadow-md overflow-hidden">
        <div className="flex items-center justify-center space-x-3 my-6">
          <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
            Service Requirements
          </h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Service Type *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.serviceType}
                  onChange={(e) => onInputChange("serviceType", e.target.value)}
                  className={`w-full px-4 py-3 border border-slate-300 appearance-none ${
                    errors?.serviceType ? "border-red-300" : "border-slate-300"
                  }`}
                >
                  <option value="">Select service type</option>
                  <option value="cleaning">Professional Cleaning</option>
                  <option value="polishing">Polishing & Restoration</option>
                  <option value="repair">Repair</option>
                  <option value="resizing">Ring Resizing</option>
                  <option value="stone-replacement">Stone Replacement</option>
                  <option value="chain-repair">Chain Repair</option>
                  <option value="prong-repair">Prong Repair</option>
                  <option value="appraisal">Appraisal/Authentication</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              {errors?.serviceType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.serviceType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Urgency *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.urgency}
                  onChange={(e) => onInputChange("urgency", e.target.value)}
                  className={`w-full px-4 py-3 border border-slate-300 appearance-none ${
                    errors?.urgency ? "border-red-300" : "border-slate-300"
                  }`}
                >
                  <option value="">Select urgency</option>
                  <option value="standard">Standard (7-10 days)</option>
                  <option value="expedited">Expedited (3-5 days)</option>
                  <option value="rush">Rush (1-2 days)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              {errors?.urgency && (
                <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Contact Method (Optional)
              </label>
              <div className="relative">
                <select
                  value={formData.preferredContact}
                  onChange={(e) =>
                    onInputChange("preferredContact", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 appearance-none"
                >
                  <option value="">Select contact method</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="text">Text Message</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Delivery Method (Optional)
              </label>
              <div className="relative">
                <select
                  value={formData.pickupDelivery}
                  onChange={(e) =>
                    onInputChange("pickupDelivery", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 appearance-none"
                >
                  <option value="">Select delivery method</option>
                  <option value="drop-off">Drop-off at Store</option>
                  <option value="pickup">Free Pickup & Delivery</option>
                  <option value="mail">Insured Mail Service</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Service Description (Optional)
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => onInputChange("description", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300"
                placeholder="Please describe the issue or service needed in detail..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
