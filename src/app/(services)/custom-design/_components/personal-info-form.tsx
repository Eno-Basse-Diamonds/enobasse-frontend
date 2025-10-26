interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  errors: FormErrors;
  onInputChange: (field: keyof PersonalInfo, value: string) => void;
}

export const PersonalInfoForm = ({
  personalInfo,
  errors,
  onInputChange,
}: PersonalInfoFormProps) => {
  return (
    <div className="bg-white border border-primary-100 shadow-md p-4 py-8 md:p-8 mb-8 rounded-sm">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
          Personal Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => onInputChange("firstName", e.target.value)}
            className={`w-full px-4 py-3 border rounded-sm ${
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
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => onInputChange("lastName", e.target.value)}
            className={`w-full px-4 py-3 border rounded-sm ${
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
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className={`w-full px-4 py-3 border rounded-sm ${
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
            Phone Number *
          </label>
          <input
            id="phoneNumber"
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            className={`w-full px-4 py-3 border rounded-sm ${
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
