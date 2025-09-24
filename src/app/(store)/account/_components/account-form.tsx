import { Edit3, Save, X } from "lucide-react";
import type { Account } from "@/lib/types/accounts";

export type EditFormData = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

interface AccountFormProps {
  account: Account | undefined;
  session: any;
  isEditing: boolean;
  editForm: EditFormData;
  onEditToggle: () => void;
  onFormChange: (field: keyof EditFormData, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

export function AccountForm({
  account,
  session,
  isEditing,
  editForm,
  onEditToggle,
  onFormChange,
  onSave,
  onCancel,
  isSaving,
}: AccountFormProps) {
  const handleInputChange = (field: keyof EditFormData, value: string) => {
    onFormChange(field, value);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-primary-500">
          Personal Information
        </h2>
        {!isEditing && (
          <button
            className="flex items-center gap-2 text-primary-400 hover:text-primary-500 transition-colors rounded-sm"
            onClick={onEditToggle}
          >
            <Edit3 size={16} />
            <span className="text-sm">Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full p-3 border border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={editForm.email}
                disabled
                className="w-full p-3 border border-primary-200 bg-gray-50 text-primary-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full p-3 border border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={editForm.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
                className="w-full p-3 border border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={editForm.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full p-3 border border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                State
              </label>
              <input
                type="text"
                value={editForm.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="w-full p-3 border border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={editForm.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                className="w-full p-3 border border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Country
              </label>
              <input
                type="text"
                value={editForm.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full p-3 border border-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 hover:bg-primary-400 transition-colors disabled:opacity-50 rounded-sm"
            >
              <Save size={16} />
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-2 border border-primary-200 px-6 py-3 hover:bg-primary-500/10 transition-colors rounded-sm"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Full Name
              </label>
              <p className="text-primary-500 font-light">
                {account?.name || session?.user?.name || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Email Address
              </label>
              <p className="text-primary-500 font-light">
                {account?.email || session?.user?.email || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Phone Number
              </label>
              <p className="text-primary-500 font-light">
                {account?.phone || "Not provided"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Member Since
              </label>
              <p className="text-primary-500 font-light">
                {account?.memberSince
                  ? new Date(account.memberSince).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                  : "Not available"}
              </p>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-300 mb-2">
                Billing Address
              </label>
              <p className="text-primary-500 font-light leading-relaxed">
                {account?.billingAddress?.street ? (
                  <>
                    {account.billingAddress.street}
                    <br />
                    {account.billingAddress.city},{" "}
                    {account.billingAddress.state}{" "}
                    {account.billingAddress.postalCode}
                    <br />
                    {account.billingAddress.country}
                  </>
                ) : (
                  "No billing address provided"
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
