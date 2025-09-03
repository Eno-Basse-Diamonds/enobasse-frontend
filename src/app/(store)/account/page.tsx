"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, Package, Heart, LogOut, ShoppingCart, Lock } from "lucide-react";
import { useAccountByEmail, useUpdateAccount } from "@/lib/hooks/use-accounts";
import { Alert, PageHeading } from "@/components";
import { AccountForm } from "./_components/account-form";
import { DesktopNavigation, MobileNavigation } from "./_components/navigation";
import { AccountLoadingSkeleton } from "@/components/loaders";
import type { Account } from "@/lib/types/accounts";

export type NavigationItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  action?: () => void;
};

export type AlertState = {
  visible: boolean;
  type: "success" | "error";
  message: string;
};

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

export default function CustomerAccountPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditFormData>({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const { data: account, isLoading } = useAccountByEmail(
    session?.user?.email
  ) as { data: Account | undefined; isLoading: boolean };
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
        phone: account.phone || "",
        street: account.billingAddress?.street || "",
        city: account.billingAddress?.city || "",
        state: account.billingAddress?.state || "",
        postalCode: account.billingAddress?.postalCode || "",
        country: account.billingAddress?.country || "",
      });
    }
  }, [account]);

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        email: session?.user?.email || "",
        data: {
          name: editForm.name,
          phone: editForm.phone,
          billingAddress: {
            street: editForm.street,
            city: editForm.city,
            state: editForm.state,
            postalCode: editForm.postalCode,
            country: editForm.country,
          },
        },
      });

      setAlertState({
        visible: true,
        type: "success",
        message: "Account updated successfully!",
      });

      setIsEditing(false);
    } catch (error) {
      setAlertState({
        visible: true,
        type: "error",
        message: "Failed to update account. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    if (account) {
      setEditForm({
        name: account.name || "",
        email: account.email || "",
        phone: account.phone || "",
        street: account.billingAddress?.street || "",
        city: account.billingAddress?.city || "",
        state: account.billingAddress?.state || "",
        postalCode: account.billingAddress?.postalCode || "",
        country: account.billingAddress?.country || "",
      });
    }
    setIsEditing(false);
  };

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  const handleFormChange = (field: keyof EditFormData, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const tabs: NavigationItem[] = [
    { id: "profile", label: "Profile", icon: User },
  ];

  const linkItems: NavigationItem[] = [
    { id: "orders", label: "Order History", icon: Package, href: "/orders" },
    { id: "wishlist", label: "Wishlist", icon: Heart, href: "/wishlist" },
    { id: "cart", label: "Cart", icon: ShoppingCart, href: "/cart" },
    {
      id: "forgot-password",
      label: "Forgot Password",
      icon: Lock,
      href: "/forgot-password",
    },
  ];

  const allNavigationItems: NavigationItem[] = [
    ...tabs,
    ...linkItems,
    {
      id: "signout",
      label: "Sign Out",
      icon: LogOut,
      action: () => signOut(),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <AccountForm
            account={account}
            session={session}
            isEditing={isEditing}
            editForm={editForm}
            onEditToggle={() => setIsEditing(!isEditing)}
            onFormChange={handleFormChange}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={updateMutation.isPending}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="my-12">
        <PageHeading title="Account" />
        <AccountLoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen my-12">
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

      <PageHeading title="Account" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <MobileNavigation
          items={allNavigationItems}
          activeTab={activeTab}
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onTabChange={setActiveTab}
          onItemClick={() => setIsMobileMenuOpen(false)}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <DesktopNavigation
              items={allNavigationItems}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          <div className="flex-1">
            <div className="bg-white">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
