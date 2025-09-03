"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Alert } from "@/components";
import { AdminHeader } from "../_components/admin-header";
import { useAccountByEmail, useUpdateAccount } from "@/lib/hooks/use-accounts";
import { AdminSettingsForm } from "./_components/admin-setting-form";
import { AdminLoadingSkeleton } from "./_components/admin-loading-skeleton";
import { Account, BillingAddress } from "@/lib/types/accounts";

type AdminEditFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  preferredCurrency: string;
  billingAddress: BillingAddress;
};

export type AlertState = {
  visible: boolean;
  type: "success" | "error";
  message: string;
};

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<AdminEditFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    preferredCurrency: "USD",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const { data: account, isLoading } = useAccountByEmail(
    session?.user?.email
  ) as {
    data: Account | undefined;
    isLoading: boolean;
  };
  const updateMutation = useUpdateAccount();

  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    if (account) {
      setEditForm({
        name: account.name || "",
        email: account.email || "",
        password: "",
        confirmPassword: "",
        preferredCurrency: account.preferredCurrency || "USD",
        billingAddress: account.billingAddress || {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
      });
    }
  }, [account]);

  const handleSave = async () => {
    if (editForm.password !== editForm.confirmPassword) {
      setAlertState({
        visible: true,
        type: "error",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const updateData: any = {
        name: editForm.name,
        preferredCurrency: editForm.preferredCurrency,
        billingAddress: editForm.billingAddress,
      };

      if (editForm.password) {
        updateData.password = editForm.password;
      }

      await updateMutation.mutateAsync({
        email: session?.user?.email || "",
        data: updateData,
      });

      setAlertState({
        visible: true,
        type: "success",
        message: "Settings updated successfully!",
      });

      setIsEditing(false);
      setEditForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (error: any) {
      setAlertState({
        visible: true,
        type: "error",
        message:
          error.message || "Failed to update settings. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    if (account) {
      setEditForm({
        name: account.name || "",
        email: account.email || "",
        password: "",
        confirmPassword: "",
        preferredCurrency: account.preferredCurrency || "USD",
        billingAddress: account.billingAddress || {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
      });
    }
    setIsEditing(false);
  };

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  const handleFormChange = (field: keyof AdminEditFormData, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingAddressChange = (
    field: keyof AdminEditFormData["billingAddress"],
    value: string
  ) => {
    setEditForm((prev) => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        [field]: value,
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader
          title="Admin Settings"
          admin={{
            name: session?.user?.name || "Admin User",
            email: session?.user?.email || "admin@example.com",
          }}
        />
        <AdminLoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {alertState.visible && (
        <Alert
          type={alertState.type}
          dismissible
          onDismiss={dismissAlert}
          duration={5000}
        >
          {alertState.message}
        </Alert>
      )}

      <AdminHeader
        title="Admin Settings"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="flex-1 p-8">
        <AdminSettingsForm
          account={account}
          session={session}
          isEditing={isEditing}
          editForm={editForm}
          onEditToggle={() => setIsEditing(!isEditing)}
          onFormChange={handleFormChange}
          onBillingAddressChange={handleBillingAddressChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={updateMutation.isPending}
        />
      </div>
    </div>
  );
}
