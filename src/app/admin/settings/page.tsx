"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Save, User, Shield, Globe, MapPin } from "lucide-react";
import { Button, Alert } from "@/components";
import { AdminHeader } from "../_components/admin-header";
import { useAccountByEmail, useUpdateAccount } from "@/lib/hooks/use-accounts";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
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

  const { data: account, isLoading } = useAccountByEmail(session?.user?.email);
  const updateMutation = useUpdateAccount();

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

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
      setEditForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (error: any) {
      setAlertState({
        visible: true,
        type: "error",
        message: error.message || "Failed to update settings. Please try again.",
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
        <div className="flex-1 p-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 w-48"></div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
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
        <div className="max-w-4xl mx-auto">
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
              <Button
                onClick={() => setIsEditing(true)}
                leadingIcon={<Save />}
              >
                Edit Settings
              </Button>
            )}
          </div>

          <div className="space-y-8">
            {/* Profile Information */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
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
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{account?.name || "Not provided"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <p className="text-gray-900">{account?.email || session?.user?.email}</p>
                  <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
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
                        onChange={(e) => setEditForm(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Leave blank to keep current"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={editForm.confirmPassword}
                        onChange={(e) => setEditForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirm new password"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Account Preferences */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
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
                    Preferred Currency
                  </label>
                  {isEditing ? (
                    <select
                      value={editForm.preferredCurrency}
                      onChange={(e) => setEditForm(prev => ({ ...prev, preferredCurrency: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="USD">USD</option>
                      <option value="NGN">NGN</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{account?.preferredCurrency || "USD"}</p>
                  )}
                </div>

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

            {/* Billing Address */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Billing Address
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.billingAddress.street}
                      onChange={(e) => setEditForm(prev => ({
                        ...prev,
                        billingAddress: { ...prev.billingAddress, street: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{account?.billingAddress?.street || "Not provided"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.billingAddress.city}
                      onChange={(e) => setEditForm(prev => ({
                        ...prev,
                        billingAddress: { ...prev.billingAddress, city: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{account?.billingAddress?.city || "Not provided"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.billingAddress.state}
                      onChange={(e) => setEditForm(prev => ({
                        ...prev,
                        billingAddress: { ...prev.billingAddress, state: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{account?.billingAddress?.state || "Not provided"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.billingAddress.postalCode}
                      onChange={(e) => setEditForm(prev => ({
                        ...prev,
                        billingAddress: { ...prev.billingAddress, postalCode: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{account?.billingAddress?.postalCode || "Not provided"}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.billingAddress.country}
                      onChange={(e) => setEditForm(prev => ({
                        ...prev,
                        billingAddress: { ...prev.billingAddress, country: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{account?.billingAddress?.country || "Not provided"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-4 pt-6">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  loading={updateMutation.isPending}
                  leadingIcon={<Save />}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
