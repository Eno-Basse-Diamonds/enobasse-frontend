"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Package,
  Heart,
  ShoppingBag,
  Settings,
  LogOut,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { useAccountByEmail, useUpdateAccount } from "@/lib/hooks/use-accounts";
import { Alert } from "@/components";

export default function CustomerAccountPage() {
  const { data: session, signOut } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
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
        phone: "",
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
        phone: "",
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

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "cart", label: "Shopping Bag", icon: ShoppingBag },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const orders = [
    {
      id: "#LV2024001",
      date: "June 25, 2025",
      status: "Delivered",
      total: "$3,200.00",
      items: ["Neverfull MM Monogram Canvas", "Capucines PM Leather"],
    },
    {
      id: "#LV2024002",
      date: "June 20, 2025",
      status: "Processing",
      total: "$1,850.00",
      items: ["Twist PM Epi Leather"],
    },
    {
      id: "#LV2024003",
      date: "June 15, 2025",
      status: "Shipped",
      total: "$950.00",
      items: ["Multi Pochette Accessoires"],
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Coussin PM Puffy Lambskin",
      price: "$4,050.00",
      image: "🔸",
    },
    {
      id: 2,
      name: "Onthego MM Monogram Giant",
      price: "$3,050.00",
      image: "🔸",
    },
    {
      id: 3,
      name: "Petite Malle Trunk",
      price: "$6,400.00",
      image: "🔸",
    },
  ];

  const cartItems = [
    {
      id: 1,
      name: "Speedy 30 Monogram Canvas",
      price: "$1,760.00",
      quantity: 1,
      image: "🔸",
    },
    {
      id: 2,
      name: "Key Pouch Monogram Canvas",
      price: "$350.00",
      quantity: 2,
      image: "🔸",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-light text-gray-900">
                Personal Information
              </h2>
              {!isEditing && (
                <button
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsEditing(true)}
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
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      disabled
                      className="w-full p-3 border border-gray-300 bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={editForm.street}
                      onChange={(e) => setEditForm(prev => ({ ...prev, street: e.target.value }))}
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={editForm.state}
                      onChange={(e) => setEditForm(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={editForm.postalCode}
                      onChange={(e) => setEditForm(prev => ({ ...prev, postalCode: e.target.value }))}
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={editForm.country}
                      onChange={(e) => setEditForm(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 border border-gray-300 px-6 py-3 hover:bg-gray-50 transition-colors"
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
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Full Name
                    </label>
                    <p className="text-gray-900 font-light">
                      {account?.name || session?.user?.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Email Address
                    </label>
                    <p className="text-gray-900 font-light">
                      {account?.email || session?.user?.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Member Since
                    </label>
                    <p className="text-gray-900 font-light">
                      {account?.memberSince ? new Date(account.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : "Not available"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Billing Address
                    </label>
                    <p className="text-gray-900 font-light leading-relaxed">
                      {account?.billingAddress?.street ? (
                        <>
                          {account.billingAddress.street}
                          <br />
                          {account.billingAddress.city}, {account.billingAddress.state} {account.billingAddress.postalCode}
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

      case "orders":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-light text-gray-900">Order History</h2>

            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {order.total}
                        </p>
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full mt-1 ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Items:</p>
                      <ul className="space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-sm text-gray-700">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                      <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        View Details
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Track Order
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "wishlist":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-light text-gray-900">Wishlist</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="group border border-gray-200 hover:border-gray-300 transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center text-6xl">
                    {item.image}
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-light text-gray-900 group-hover:text-gray-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-900 font-medium">{item.price}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-black text-white py-2 px-4 text-sm hover:bg-gray-800 transition-colors">
                        Add to Bag
                      </button>
                      <button className="p-2 border border-gray-300 hover:border-gray-400 transition-colors">
                        <Heart size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "cart":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-light text-gray-900">Shopping Bag</h2>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border border-gray-200"
                >
                  <div className="w-24 h-24 bg-gray-50 flex items-center justify-center text-2xl">
                    {item.image}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-light text-gray-900">{item.name}</h3>
                    <p className="text-gray-900 font-medium">{item.price}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                          +
                        </button>
                      </div>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-light">Subtotal</span>
                  <span className="text-lg font-medium">$2,460.00</span>
                </div>
                <button className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-light text-gray-900">
              Account Settings
            </h2>

            <div className="space-y-6">
              <div className="border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Notifications
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-700">
                      Email notifications for new arrivals
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-700">
                      SMS notifications for order updates
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Marketing communications
                    </span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">Privacy</h3>
                <div className="space-y-4">
                  <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Download my data
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Delete my account
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">Security</h3>
                <div className="space-y-4">
                  <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Change password
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Enable two-factor authentication
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 w-48"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200"></div>
                ))}
              </div>
              <div className="lg:col-span-3">
                <div className="h-64 bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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

      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-light text-gray-900">My Account</h1>
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => signOut()}
            >
              <LogOut size={18} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gray-50 text-gray-900 border-r-2 border-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-light">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
