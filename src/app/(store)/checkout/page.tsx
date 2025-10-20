"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckoutFormSection } from "./_components/checkout-form-section";
import { OrderSummary } from "./_components/order-summary";
import { FormInput } from "./_components/form-input";
import { PaymentConfirmationModal } from "./_components/payment-confirmation.modal";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { useAccountStore } from "@/lib/store/account";
import { countries } from "@/lib/utils/constants/countries";
import { getCurrencySymbol } from "@/lib/utils/money";
import { SectionContainer } from "@/components/section-container";
import { ChevronDownIcon } from "lucide-react";

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  region: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items: cartItems,
    clear: clearCart,
    hydrated,
    hydrate,
    loading,
    refreshWithCurrency,
  } = useCartStore();
  const { preferredCurrency, isHydrated } = useAccountStore();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [lastCurrency, setLastCurrency] = useState(preferredCurrency);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "NG",
    region: "",
    postalCode: "",
  });
  const { data: session } = useSession();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0
  );

  const isFormValid = useMemo(() => {
    const requiredFields: (keyof FormData)[] = [
      "email",
      "phone",
      "firstName",
      "lastName",
      "address",
      "city",
      "region",
      "postalCode",
    ];

    return requiredFields.every((field) => {
      const value = formData[field];
      return value && value.trim().length > 0;
    });
  }, [formData]);

  useEffect(() => {
    if (cartItems.length === 0 && !isProcessingPayment) {
      router.replace("/cart");
    }
  }, [cartItems, router, isProcessingPayment]);

  useEffect(() => {
    if (!isHydrated) return;

    const handleCurrencyChange = async () => {
      if (preferredCurrency && preferredCurrency !== lastCurrency) {
        if (session?.user?.email) {
          await refreshWithCurrency(session.user.email, preferredCurrency);
        } else {
          await refreshWithCurrency(preferredCurrency);
        }
        setLastCurrency(preferredCurrency);
      } else if (session?.user?.email && preferredCurrency && !hydrated) {
        await hydrate(session.user.email, preferredCurrency);
        setLastCurrency(preferredCurrency);
      } else if (!session && !hydrated) {
        await hydrate();
        setLastCurrency(preferredCurrency);
      }
    };

    handleCurrencyChange();
  }, [
    session,
    hydrate,
    refreshWithCurrency,
    preferredCurrency,
    hydrated,
    isHydrated,
    lastCurrency,
  ]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayNow = () => {
    if (!isFormValid) return;
    setShowPaymentModal(true);
  };

  const billingAddress = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    street: `${formData.address}${
      formData.apartment ? `, ${formData.apartment}` : ""
    }`,
    city: formData.city,
    state: formData.region,
    postalCode: formData.postalCode,
    country: formData.country,
  };

  const handlePaymentConfirmed = () => {
    setIsProcessingPayment(true);
    setShowPaymentModal(false);
    clearCart();
    router.push("/orders");
  };

  return (
    <>
      <SectionContainer id="checkout">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/5">
              <CheckoutFormSection title="Contact Information">
                <div className="space-y-4">
                  <FormInput
                    id="email"
                    label="Email address"
                    type="email"
                    placeholder="e.g you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <FormInput
                    id="phone"
                    label="Phone number"
                    placeholder="e.g +234 805 710 4772"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </CheckoutFormSection>

              <CheckoutFormSection title="Shipping & Billing">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      id="first-name"
                      label="First name"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                    <FormInput
                      id="last-name"
                      label="Last name"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>

                  <FormInput
                    id="address"
                    label="Address"
                    placeholder="123 Main St"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />

                  <FormInput
                    id="apartment"
                    label="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={(e) =>
                      handleInputChange("apartment", e.target.value)
                    }
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      id="city"
                      label="City"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                    />
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-[#502B3A] mb-1"
                      >
                        Country
                      </label>
                      <div className="relative">
                        <select
                          id="country"
                          className="block w-full px-4 py-2 pr-8 border border-gray-300 rounded-sm focus:ring-[#D1A559] focus:border-[#D1A559] appearance-none bg-white"
                          required
                          value={formData.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                        >
                          {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#502B3A]">
                          <ChevronDownIcon className="h-4 w-4 text-[#502B3A]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      id="region"
                      label="State/Province"
                      required
                      value={formData.region}
                      onChange={(e) =>
                        handleInputChange("region", e.target.value)
                      }
                    />
                    <FormInput
                      id="postal-code"
                      label="ZIP/Postal code"
                      required
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="save-address"
                      name="save-address"
                      type="checkbox"
                      className="h-4 w-4 text-[#D1A559] focus:ring-[#D1A559] border-gray-300 rounded"
                      checked
                    />
                    <label
                      htmlFor="save-address"
                      className="ml-2 block text-sm text-[#502B3A]"
                    >
                      Save this information for next time
                    </label>
                  </div>
                </div>
              </CheckoutFormSection>
            </div>

            <div className="lg:w-2/5">
              <OrderSummary
                items={cartItems}
                onPayNow={handlePayNow}
                disabled={!isFormValid}
                currency={preferredCurrency}
              />

              {!isFormValid && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-red-600">
                    Please fill all required fields to proceed with payment
                  </p>
                </div>
              )}

              <div className="mt-4 w-full text-center">
                <div className="text-sm text-[#502B3A]/70">
                  By clicking Pay you agree to our{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="underline font-semibold hover:text-[#D1A559]"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline font-semibold hover:text-[#D1A559]"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      <PaymentConfirmationModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentConfirmed={handlePaymentConfirmed}
        amount={totalAmount}
        currencySymbol={getCurrencySymbol(preferredCurrency)}
        items={cartItems}
        billingAddress={billingAddress}
        email={formData.email}
        phone={formData.phone}
      />
    </>
  );
}
