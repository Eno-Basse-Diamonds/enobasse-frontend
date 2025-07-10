"use client";

import { useState } from "react";
import {
  User,
  Package,
  Heart,
  ShoppingBag,
  Settings,
  LogOut,
  Edit3,
} from "lucide-react";

export default function CustomerAccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

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
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Edit3 size={16} />
                <span className="text-sm">Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Full Name
                  </label>
                  <p className="text-gray-900 font-light">
                    Isabella Marie Rodriguez
                  </p>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Email Address
                  </label>
                  <p className="text-gray-900 font-light">
                    isabella.rodriguez@email.com
                  </p>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Phone Number
                  </label>
                  <p className="text-gray-900 font-light">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Member Since
                  </label>
                  <p className="text-gray-900 font-light">March 2023</p>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Preferred Language
                  </label>
                  <p className="text-gray-900 font-light">English</p>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Billing Address
                  </label>
                  <p className="text-gray-900 font-light leading-relaxed">
                    123 Park Avenue
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-light text-gray-900">My Account</h1>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
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
