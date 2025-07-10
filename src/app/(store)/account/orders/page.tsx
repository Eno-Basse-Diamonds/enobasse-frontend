import React from "react";
import { CheckCircle } from "lucide-react";

const OrderHistoryPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Order Header */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order number</p>
              <p className="font-medium text-blue-600">WU88191111</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Date placed</p>
              <p className="font-medium">January 22, 2021</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total amount</p>
              <p className="font-medium">$302.00</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              View Order
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              View Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-8">
        {/* Nomad Tumbler */}
        <div className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-16 h-20 bg-gray-800 rounded-lg relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nomad Tumbler
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                    This durable double-walled insulated tumbler keeps your
                    beverages at the perfect temperature all day long. Hot,
                    cold, or even lukewarm if you're weird like that, this
                    bottle is ready for your next adventure.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      View Product
                    </button>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      Buy Again
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">$35.00</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Out for delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Leather Long Wallet */}
        <div className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-20 h-12 bg-amber-600 rounded-sm relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-amber-800 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Leather Long Wallet
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                    We're not sure who carries cash anymore, but this leather
                    long wallet will keep those bills nice and fold-free. The
                    cashier hasn't seen print money in years, but you'll make a
                    damn fine impression with your pristine cash monies.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      View Product
                    </button>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      Buy Again
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">$118.00</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Delivered on January 25, 2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Wristwatch */}
        <div className="pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-800 rounded-full relative">
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-gray-800 transform -translate-x-1/2 -translate-y-full origin-bottom"></div>
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-gray-800 transform -translate-x-1/2 -translate-y-full origin-bottom rotate-90"></div>
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Minimalist Wristwatch
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                    This contemporary wristwatch has a clean, minimalist look
                    and high quality
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      View Product
                    </button>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      Buy Again
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">$149.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
