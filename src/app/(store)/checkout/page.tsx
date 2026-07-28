"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { ChevronDownIcon, User } from "lucide-react";

import { useAccountStore } from "@/modules/account/store";
import { useAccountByEmail } from "@/modules/admin/hooks";
import { useCartStore } from "@/modules/cart/store";
import { trackBeginCheckout } from "@/shared/analytics/gtag";
import { SectionContainer } from "@/shared/components/SectionContainer";
import { COUNTRIES } from "@/shared/constants/countries";

import { CheckoutFormSection } from "./_components/CheckoutFormSection";
import { FormInput } from "./_components/FormInput";
import { OrderSummary } from "./_components/OrderSummary";

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
  const { items: cartItems, hydrated, hydrate, loading, refreshWithCurrency } = useCartStore();
  const {
    preferredCurrency,
    isHydrated,
    billingAddress: savedBillingAddress,
    updateBillingAddress,
    updateLocalBillingAddress,
  } = useAccountStore();
  const [lastCurrency, setLastCurrency] = useState(preferredCurrency);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [saveAddress, setSaveAddress] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "Nigeria",
    region: "",
    postalCode: "",
  });
  const { data: session } = useSession();
  const { data: dbAccount } = useAccountByEmail(session?.user?.email);
  const hasInitializedRef = useRef(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0,
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
    ];

    return requiredFields.every((field) => {
      const value = formData[field];
      return value && value.trim().length > 0;
    });
  }, [formData]);

  useEffect(() => {
    if (!hydrated) return;
    if (cartItems.length === 0 && !isProcessingPayment) {
      router.replace("/Cart");
    }
  }, [cartItems, router, isProcessingPayment, hydrated]);

  useEffect(() => {
    if (hydrated && cartItems.length > 0 && preferredCurrency) {
      trackBeginCheckout(cartItems, preferredCurrency);
    }
  }, [hydrated]);

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

  useEffect(() => {
    if (
      isHydrated &&
      !hasInitializedRef.current &&
      (session === undefined || dbAccount !== undefined)
    ) {
      setFormData((prev) => {
        const email = session?.user?.email || savedBillingAddress?.email || prev.email;
        let firstName = savedBillingAddress?.firstName || prev.firstName;
        let lastName = savedBillingAddress?.lastName || prev.lastName;
        let address = savedBillingAddress?.address || prev.address;
        let apartment = savedBillingAddress?.apartment || prev.apartment;
        let city = savedBillingAddress?.city || prev.city;
        let country = savedBillingAddress?.country || prev.country;
        let region = savedBillingAddress?.region || prev.region;
        let postalCode = savedBillingAddress?.postalCode || prev.postalCode;
        let phone = savedBillingAddress?.phone || prev.phone;

        if (dbAccount) {
          if (dbAccount.name) {
            const parts = dbAccount.name.trim().split(/\s+/);
            firstName = parts[0] || firstName;
            lastName = parts.slice(1).join(" ") || lastName;
          }
          phone = dbAccount.phone || phone;

          if (dbAccount.billingAddress) {
            const dbAddr = dbAccount.billingAddress;
            if (dbAddr.street) {
              const parts = dbAddr.street.split(",");
              address = parts[0]?.trim() || address;
              apartment = parts.slice(1).join(",")?.trim() || apartment;
            }
            city = dbAddr.city || city;
            country = dbAddr.country || country;
            region = dbAddr.state || region;
            postalCode = dbAddr.postalCode || postalCode;
          }
        }

        hasInitializedRef.current = true;

        return {
          email,
          phone,
          firstName,
          lastName,
          address,
          apartment,
          city,
          country,
          region,
          postalCode,
        };
      });
    }
  }, [savedBillingAddress, isHydrated, session, dbAccount]);

  // Autosave form data locally and to database (debounced)
  useEffect(() => {
    if (!isHydrated || !hasInitializedRef.current) return;

    const timer = setTimeout(() => {
      updateBillingAddress({
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        country: formData.country,
        region: formData.region,
        postalCode: formData.postalCode,
        phone: formData.phone,
        email: formData.email,
      });
    }, 2000); // 2 second debounce to prevent spamming database API

    return () => clearTimeout(timer);
  }, [formData, isHydrated, updateBillingAddress]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const billingAddress = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    street: `${formData.address}${formData.apartment ? `, ${formData.apartment}` : ""}`,
    city: formData.city,
    state: formData.region,
    postalCode: formData.postalCode,
    country: formData.country,
  };

  const handlePaymentSuccess = () => {
    if (saveAddress && updateBillingAddress) {
      updateBillingAddress({
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        country: formData.country,
        region: formData.region,
        postalCode: formData.postalCode,
        phone: formData.phone,
        email: formData.email,
      });
    }
    setIsProcessingPayment(true);
    router.push("/orders");
  };

  const handleAuthSuccess = (email: string) => {
    setFormData((prev) => ({ ...prev, email }));
  };

  return (
    <>
      <SectionContainer id="checkout">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/5">
              {!session && (
                <div className="mb-6 p-6 bg-white border border-gray-100 rounded-sm flex items-center justify-between shadow-sm group hover:border-[#D1A559]/30 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FDFBF9] border border-[#F3EFE9] flex items-center justify-center group-hover:bg-[#D1A559]/5 transition-colors duration-300">
                      <User className="w-5 h-5 text-[#502B3A]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#502B3A]">Returning customer?</h3>
                      <p className="text-xs text-[#502B3A]/60 mt-1">
                        Sign in to checkout faster with your saved details.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/sign-in"
                    className="px-6 py-2 border border-[#D1A559] text-[#D1A559] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#D1A559] hover:text-white transition-all duration-300"
                  >
                    Sign In
                  </Link>
                </div>
              )}

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
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                    <FormInput
                      id="last-name"
                      label="Last name"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>

                  <FormInput
                    id="address"
                    label="Address"
                    placeholder="123 Main St"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />

                  <FormInput
                    id="apartment"
                    label="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={(e) => handleInputChange("apartment", e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      id="city"
                      label="City"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
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
                          onChange={(e) => handleInputChange("country", e.target.value)}
                        >
                          {COUNTRIES.map((country) => (
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
                      onChange={(e) => handleInputChange("region", e.target.value)}
                    />
                    <FormInput
                      id="postal-code"
                      label="ZIP/Postal code (optional)"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="save-address"
                      name="save-address"
                      type="checkbox"
                      className="h-4 w-4 text-[#D1A559] focus:ring-[#D1A559] border-gray-300 rounded"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                    />
                    <label htmlFor="save-address" className="ml-2 block text-sm text-[#502B3A]">
                      Save this information for next time
                    </label>
                  </div>
                </div>
              </CheckoutFormSection>
            </div>

            <div className="lg:w-2/5">
              <OrderSummary
                items={cartItems}
                email={formData.email}
                phone={formData.phone}
                billingAddress={billingAddress}
                disabled={!isFormValid}
                currency={preferredCurrency}
                onPaymentSuccess={handlePaymentSuccess}
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
    </>
  );
}
