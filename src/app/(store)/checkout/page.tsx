"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SectionContainer, PageHeading } from "@/components";
import { ChevronDownIcon } from "@/components/icons";
import { CheckoutFormSection } from "./_components/checkout-form-section";
import { OrderSummary } from "./_components/order-summary";
import { FormInput } from "./_components/form-input";
import { useCartStore } from "@/lib/store/cart";
import { useAccountStore } from "@/lib/store/account";
import { useSession } from "next-auth/react";
import { countries } from "@/lib/utils/constants";
import "./styles.scss";

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems } = useCartStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (cartItems.length === 0) router.replace("/cart");
  }, [cartItems, router]);

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
                  />
                  <FormInput
                    id="phone"
                    label="Phone number"
                    placeholder="e.g +234 805 710 4772"
                    required
                  />
                </form>
              </CheckoutFormSection>

              <CheckoutFormSection title="Shipping & Billing">
                <form className="form">
                  <div className="form__grid-2">
                    <FormInput id="first-name" label="First name" required />
                    <FormInput id="last-name" label="Last name" required />
                  </div>

                  <FormInput
                    id="address"
                    label="Address"
                    placeholder="123 Main St"
                    required
                  />

                  <FormInput
                    id="apartment"
                    label="Apartment, suite, etc. (optional)"
                  />

                  <div className="form__grid-2">
                    <FormInput id="city" label="City" required />
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-[#502B3A] mb-1"
                      >
                        Country
                      </label>
                      <div className="form__select-container">
                        <select id="country" className="form__select" required>
                          {countries.map((country) => (
                            <option
                              key={country.code}
                              selected={country.default}
                            >
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
                    <FormInput id="region" label="State/Province" required />
                    <FormInput
                      id="postal-code"
                      label="ZIP/Postal code"
                      required
                    />
                  </div>

                  <div className="form__checkbox-container">
                    <input
                      id="save-address"
                      name="save-address"
                      type="checkbox"
                      className="form__checkbox"
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
              <OrderSummary items={cartItems} />

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
    </div>
  );
}
