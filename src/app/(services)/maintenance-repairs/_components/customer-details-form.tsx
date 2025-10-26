interface CustomerDetailsFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  errors?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const CustomerDetailsForm = ({
  formData,
  errors,
  onInputChange,
}: CustomerDetailsFormProps) => {
  return (
    <div className="bg-white border border-primary-100 shadow-md rounded-sm overflow-hidden">
      <div className="flex items-center justify-center space-x-3 my-6">
        <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
          Customer Information
        </h2>
      </div>

      <div className="p-4 py-8 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => onInputChange("firstName", e.target.value)}
              className={`w-full px-4 py-3 border rounded-sm border-slate-300 ${
                errors?.firstName ? "border-red-300" : "border-slate-300"
              }`}
            />
            {errors?.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => onInputChange("lastName", e.target.value)}
              className={`w-full px-4 py-3 border rounded-sm border-slate-300 ${
                errors?.lastName ? "border-red-300" : "border-slate-300"
              }`}
            />
            {errors?.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-sm border-slate-300 ${
                errors?.email ? "border-red-300" : "border-slate-300"
              }`}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number *
            </label>
            <input
              id="phoneNumber"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
              className={`w-full px-4 py-3 border rounded-sm border-slate-300 ${
                errors?.phone ? "border-red-300" : "border-slate-300"
              }`}
            />
            {errors?.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
