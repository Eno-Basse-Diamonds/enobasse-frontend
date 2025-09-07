import { User, Globe, Shield, Save } from "lucide-react";
import type { Account, BillingAddress } from "@/lib/types/accounts";
import { Button } from "@/components/button";

type AdminEditFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  preferredCurrency: string;
  billingAddress: BillingAddress;
};

interface AdminSettingsFormProps {
  account: Account | undefined;
  session: any;
  isEditing: boolean;
  editForm: AdminEditFormData;
  onEditToggle: () => void;
  onFormChange: (field: keyof AdminEditFormData, value: string) => void;
  onBillingAddressChange: (
    field: keyof AdminEditFormData["billingAddress"],
    value: string
  ) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

export function AdminSettingsForm({
  account,
  session,
  isEditing,
  editForm,
  onEditToggle,
  onFormChange,
  onBillingAddressChange,
  onSave,
  onCancel,
  isSaving,
}: AdminSettingsFormProps) {
  const handleInputChange = (field: keyof AdminEditFormData, value: string) => {
    onFormChange(field, value);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Account Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your admin account preferences and personal information
          </p>
        </div>
        {!isEditing && (
          <Button onClick={onEditToggle} leadingIcon={<Save />}>
            Edit Settings
          </Button>
        )}
      </div>

      {/* Profile Information */}
      <div className="bg-white shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{account?.name || "Not provided"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <p className="text-gray-900">
              {account?.email || session?.user?.email}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Email cannot be changed
            </p>
          </div>

          {isEditing && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={editForm.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Leave blank to keep current"
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={editForm.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm new password"
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Account Preferences */}
      <div className="bg-white shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Account Preferences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-red-500" />
              <span className="text-red-600 font-medium">Administrator</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Full system access</p>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-4 pt-6">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave} loading={isSaving} leadingIcon={<Save />}>
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
