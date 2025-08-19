"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SectionContainer, PageHeading } from "@/components";
import { ChevronDownIcon } from "@/components/icons";
import { CheckoutFormSection } from "./_components/checkout-form-section";
import { OrderSummary } from "./_components/order-summary";
import { FormInput } from "./_components/form-input";
import { PaymentConfirmationModal } from "./_components/payment-confirmation.modal";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { useAccountStore } from "@/lib/store/account";
import { countries } from "@/lib/utils/constants";
import { getCurrencySymbol } from "@/lib/utils/money";
import "./styles.scss";

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
    <div className="checkout-page">
      <PageHeading title="Checkout" />
      <SectionContainer id="checkout">
        <div className="checkout-page__container">
          <div className="checkout-page__columns">
            <div className="checkout-page__left-column">
              <CheckoutFormSection title="Contact Information">
                <form className="form">
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
                </form>
              </CheckoutFormSection>

              <CheckoutFormSection title="Shipping & Billing">
                <form className="form">
                  <div className="form__grid-2">
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

                  <div className="form__grid-2">
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
                      <div className="form__select-container">
                        <select
                          id="country"
                          className="form__select"
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
                        <div className="form__select-icon">
                          <ChevronDownIcon className="h-4 w-4 text-[#502B3A]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form__grid-2">
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

                  <div className="form__checkbox-container">
                    <input
                      id="save-address"
                      name="save-address"
                      type="checkbox"
                      className="form__checkbox"
                      checked
                    />
                    <label
                      htmlFor="save-address"
                      className="form__checkbox-label"
                    >
                      Save this information for next time
                    </label>
                  </div>
                </form>
              </CheckoutFormSection>
            </div>

            <div className="checkout-page__right-column">
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
    </div>
  );
}
