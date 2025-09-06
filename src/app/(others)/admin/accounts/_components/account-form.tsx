"use client";

import { useState, useEffect } from "react";
import { X, Shield } from "lucide-react";
import { Button, Alert } from "@/components";
import {
  Account,
  CreateAccountData,
  UpdateAccount,
} from "@/lib/types/accounts";
import { useCreateAccount, useUpdateAccount } from "@/lib/hooks/use-accounts";

interface AccountFormProps {
  account: Account | null;
  onClose: () => void;
}

export function AccountForm({ account, onClose }: AccountFormProps) {
  const [formData, setFormData] = useState<CreateAccountData>({
    name: "",
    email: "",
    password: "",
    isVerified: false,
    isAdmin: false,
    preferredCurrency: "USD",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const createMutation = useCreateAccount();
  const updateMutation = useUpdateAccount();

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name || "",
        email: account.email || "",
        password: "",
        isVerified: account.isVerified || false,
        isAdmin: account.isAdmin || false,
        preferredCurrency: account.preferredCurrency || "USD",
        billingAddress: account.billingAddress ? {
          street: account.billingAddress.street || "",
          city: account.billingAddress.city || "",
          state: account.billingAddress.state || "",
          postalCode: account.billingAddress.postalCode || "",
          country: account.billingAddress.country || "",
        } : {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
      });
    }
  }, [account]);

  const handleInputChange = (field: keyof CreateAccountData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress!,
        [field]: value,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!account && !formData.password) {
      newErrors.password = "Password is required for new accounts";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (account) {
        const updateData: UpdateAccount = { ...formData };
        if (!formData.password) {
          delete updateData.password;
        }

        await updateMutation.mutateAsync({
          email: account.email,
          data: updateData,
        });

        setAlertState({
          visible: true,
          type: "success",
          message: "Account updated successfully!",
        });
      } else {
        // Create new account
        await createMutation.mutateAsync(formData);

        setAlertState({
          visible: true,
          type: "success",
          message: "Account created successfully!",
        });
      }

      setTimeout(() => onClose(), 1500);
    } catch (error: any) {
      setAlertState({
        visible: true,
        type: "error",
        message: error.message || "Failed to save account. Please try again.",
      });
    }
  };

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  const formTitle = account ? "Edit Account" : "Create New Account";
  const submitButtonText = account ? "Update" : "Create";
  const isFormValid = Boolean(
    !createMutation.isPending &&
      !updateMutation.isPending &&
      formData.name.trim() &&
      formData.email.trim() &&
      (account || formData.password)
  );

  return (
    <>
      {alertState.visible && (
        <div className="fixed top-4 right-4 max-w-md w-full z-[9999]">
          <Alert
            type={alertState.type}
            className="mb-6"
            dismissible
            onDismiss={dismissAlert}
          >
            {alertState.message}
          </Alert>
        </div>
      )}

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-4xl h-full flex flex-col shadow-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-primary-500/10 bg-gray-50">
            <h3 className="text-2xl font-semibold text-primary-500">
              {formTitle}
            </h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="rounded-full w-8 h-8"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Information */}
              <section>
                <h4 className="text-lg font-semibold text-primary-500 mb-4">
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name..."
                    error={errors?.name}
                  />

                  <FormField
                    label="Email Address *"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address..."
                    error={errors?.email}
                  />

                  <FormField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password || ""}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder={
                      account
                        ? "Leave blank to keep current"
                        : "Enter password..."
                    }
                    error={errors?.password}
                    helpText={
                      account
                        ? "Leave blank to keep current password"
                        : "Minimum 6 characters"
                    }
                  />

                  <div>
                    <label className="block text-sm font-semibold text-primary-400 mb-2">
                      Preferred Currency
                    </label>
                    <select
                      value={formData.preferredCurrency}
                      onChange={(e) =>
                        handleInputChange("preferredCurrency", e.target.value)
                      }
                      className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
                    >
                      <option value="USD">USD</option>
                      <option value="NGN">NGN</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Account Settings */}
              <section>
                <h4 className="text-lg font-semibold text-primary-500 mb-4">
                  Account Settings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isVerified}
                        onChange={(e) =>
                          handleInputChange("isVerified", e.target.checked)
                        }
                        className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
                      />
                      <span className="ml-2">Email Verified</span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isAdmin}
                        onChange={(e) =>
                          handleInputChange("isAdmin", e.target.checked)
                        }
                        className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
                      />
                      <span className="ml-2 flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-red-500" />
                        Has Admin Access
                      </span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Billing Address */}
              <section>
                <h4 className="text-lg font-semibold text-primary-500 mb-4">
                  Billing Address (Optional)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Street Address"
                    name="street"
                    value={formData.billingAddress?.street ?? ""}
                    onChange={(e) =>
                      handleBillingAddressChange("street", e.target.value)
                    }
                    placeholder="Enter street address..."
                  />

                  <FormField
                    label="City"
                    name="city"
                    value={formData.billingAddress?.city ?? ""}
                    onChange={(e) =>
                      handleBillingAddressChange("city", e.target.value)
                    }
                    placeholder="Enter city..."
                  />

                  <FormField
                    label="State/Province"
                    name="state"
                    value={formData.billingAddress?.state ?? ""}
                    onChange={(e) =>
                      handleBillingAddressChange("state", e.target.value)
                    }
                    placeholder="Enter state..."
                  />

                  <FormField
                    label="Postal Code"
                    name="postalCode"
                    value={formData.billingAddress?.postalCode ?? ""}
                    onChange={(e) =>
                      handleBillingAddressChange("postalCode", e.target.value)
                    }
                    placeholder="Enter postal code..."
                  />

                  <div className="md:col-span-2">
                    <FormField
                      label="Country"
                      name="country"
                      value={formData.billingAddress?.country ?? ""}
                      onChange={(e) =>
                        handleBillingAddressChange("country", e.target.value)
                      }
                      placeholder="Enter country..."
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={createMutation.isPending || updateMutation.isPending}
              disabled={!isFormValid}
            >
              <span>{submitButtonText} Account</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  type?: string;
  helpText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  helpText,
}) => (
  <div className="block">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
      placeholder={placeholder}
    />
    {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
