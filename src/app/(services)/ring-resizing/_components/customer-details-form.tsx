interface CustomerDetailsFormProps {
  formData: {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  };
  errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  onInputChange: (section: string, field: string, value: string) => void;
}

export const CustomerDetailsForm = ({
  formData,
  errors,
  onInputChange,
}: CustomerDetailsFormProps) => {
  return (
    <div className="bg-white border border-primary-100 shadow-md p-4 py-8 md:p-8 mb-8">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
          Personal Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) =>
              onInputChange("personalInfo", "firstName", e.target.value)
            }
            className={`w-full px-4 py-3 border ${
              errors.firstName ? "border-red-500" : "border-slate-300"
            }`}
            required
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) =>
              onInputChange("personalInfo", "lastName", e.target.value)
            }
            className={`w-full px-4 py-3 border ${
              errors.lastName ? "border-red-500" : "border-slate-300"
            }`}
            required
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) =>
              onInputChange("personalInfo", "email", e.target.value)
            }
            className={`w-full px-4 py-3 border ${
              errors.email ? "border-red-500" : "border-slate-300"
            }`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phoneNumber"
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) =>
              onInputChange("personalInfo", "phone", e.target.value)
            }
            className={`w-full px-4 py-3 border ${
              errors.phone ? "border-red-500" : "border-slate-300"
            }`}
            required
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};
