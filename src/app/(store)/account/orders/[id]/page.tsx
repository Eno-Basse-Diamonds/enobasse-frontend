import React from "react";

const OrderDetailPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Order #54879</h1>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View invoice →
          </button>
        </div>
        <div className="text-right text-gray-600">
          <span>Order placed </span>
          <span className="font-semibold">March 22, 2021</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Product Information */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <img
              src="/api/placeholder/120/180"
              alt="Nomad Tumbler"
              className="w-24 h-36 object-cover bg-gray-800 rounded mb-4"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nomad Tumbler
            </h3>
            <p className="text-xl font-bold text-gray-900 mb-3">$35.00</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              This durable and portable insulated tumbler will keep your
              beverage at the perfect temperature during your next adventure.
            </p>
          </div>
        </div>

        {/* Delivery and Shipping Info */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Delivery Address */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery address
            </h3>
            <div className="text-gray-600">
              <p className="font-medium text-gray-900">Floyd Miles</p>
              <p>7363 Cynthia Pass</p>
              <p>Toronto, ON N3Y 4H8</p>
            </div>
          </div>

          {/* Shipping Updates */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping updates
            </h3>
            <div className="text-gray-600">
              <p className="mb-2">f***@example.com</p>
              <p className="mb-4">1*********40</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Progress */}
      <div className="mb-8">
        <p className="text-gray-900 font-medium mb-4">
          Preparing to ship on March 24, 2021
        </p>

        {/* Progress Bar */}
        <div className="relative mb-6">
          <div className="h-1 bg-gray-200 rounded-full">
            <div
              className="h-1 bg-blue-600 rounded-full"
              style={{ width: "35%" }}
            ></div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between text-sm">
          <span className="text-blue-600 font-medium">Order placed</span>
          <span className="text-blue-600 font-medium">Processing</span>
          <span className="text-gray-400">Shipped</span>
          <span className="text-gray-400">Delivered</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Billing address
          </h3>
          <div className="text-gray-600">
            <p className="font-medium text-gray-900">Floyd Miles</p>
            <p>7363 Cynthia Pass</p>
            <p>Toronto, ON N3Y 4H8</p>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment information
          </h3>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
              VISA
            </div>
            <div className="text-gray-600">
              <p className="font-medium">Ending with 4242</p>
              <p className="text-sm">Expires 02 / 24</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">$72</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">$5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">$6.16</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  Order total
                </span>
                <span className="text-lg font-bold text-blue-600">$83.16</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
