"use client";

import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import {
  Account,
  CreateAccountData,
  UpdateAccount,
} from "@/lib/types/accounts";
import { useCreateAccount, useUpdateAccount } from "@/lib/hooks/use-accounts";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { AdminModal } from "../../products/_components/_elements/admin-modal";

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
        billingAddress: account.billingAddress
          ? {
              street: account.billingAddress.street || "",
              city: account.billingAddress.city || "",
              state: account.billingAddress.state || "",
              postalCode: account.billingAddress.postalCode || "",
              country: account.billingAddress.country || "",
            }
          : {
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

  const formTitle = account ? "Edit Account" : "New Account";
  const submitButtonText = account ? "Update" : "Create";
  const isPending = createMutation.isPending || updateMutation.isPending;
  const isFormValid = !isPending && formData.name.trim() && formData.email.trim() && (account || formData.password);

  const isFormValidated = Boolean(formData.name.trim() && formData.email.trim());

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

      <AdminModal
        title={formTitle}
        onClose={onClose}
        confirmText={`${submitButtonText} Account`}
        confirmLoading={isPending}
        onConfirm={() => {
          const form = document.querySelector("#account-form") as HTMLFormElement;
          form?.requestSubmit();
        }}
      >
        <form id="account-form" onSubmit={handleSubmit} className="space-y-6">
          <section>
            <h4 className="text-base font-semibold text-primary-500 mb-4">
              Basic Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <section>
            <h4 className="text-base font-semibold text-primary-500 mb-4">
              Account Settings
            </h4>
            <div className="flex flex-wrap gap-6">
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
          </section>

          <section>
            <h4 className="text-base font-semibold text-primary-500 mb-4">
              Billing Address (Optional)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="sm:col-span-2">
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

          </form>
      </AdminModal>
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
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-1.5">
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