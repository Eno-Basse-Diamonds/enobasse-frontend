import { SectionContainer, PageHeading } from "@/components";
import { ChevronDownIcon } from "@/components/icons";
import { getCartItems } from "@/lib/api/cart";
import { CheckoutFormSection } from "./_components/checkout-form-section";
import { OrderSummary } from "./_components/order-summary";
import { PaymentMethod } from "./_components/payment-method";
import { FormInput } from "./_components/form-input";
import "./styles.scss";

export default async function CheckoutPage() {
  const cartItems = await getCartItems();

  return (
    <div className="checkout-page">
      <PageHeading title="Checkout" />
      <SectionContainer id="checkout">
        <div className="checkout-page__container">
          <div className="checkout-page__columns">
            {/* Left Column - Forms */}
            <div className="checkout-page__left-column">
              <CheckoutFormSection title="Contact Information">
                <form className="form">
                  <FormInput
                    id="email"
                    label="Email address"
                    type="email"
                    placeholder="e.g you@example.com"
                  />
                  <FormInput
                    id="phone"
                    label="Phone number"
                    placeholder="e.g +234 805 710 4772"
                  />
                </form>
              </CheckoutFormSection>

              <CheckoutFormSection title="Shipping Address">
                <form className="form">
                  <div className="form__grid-2">
                    <FormInput id="first-name" label="First name" />
                    <FormInput id="last-name" label="Last name" />
                  </div>

                  <FormInput
                    id="address"
                    label="Address"
                    placeholder="123 Main St"
                  />

                  <FormInput
                    id="apartment"
                    label="Apartment, suite, etc. (optional)"
                  />

                  <div className="form__grid-2">
                    <FormInput id="city" label="City" />
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-[#502B3A] mb-1"
                      >
                        Country
                      </label>
                      <div className="form__select-container">
                        <select id="country" className="form__select">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                        <div className="form__select-icon">
                          <ChevronDownIcon className="h-4 w-4 text-[#502B3A]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form__grid-2">
                    <FormInput id="region" label="State/Province" />
                    <FormInput id="postal-code" label="ZIP/Postal code" />
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

              <CheckoutFormSection title="Payment">
                <div className="form">
                  <div className="pb-2">
                    <h3 className="sr-only">Payment Method</h3>
                    <div className="form__radio-group">
                      <PaymentMethod
                        id="credit-card"
                        name="payment-method"
                        label="Credit card"
                        checked
                      />
                      <PaymentMethod
                        id="bank-transfer"
                        name="payment-method"
                        label="Bank transfer"
                      />
                    </div>
                  </div>

                  <div className="form">
                    <FormInput
                      id="card-number"
                      label="Card number"
                      placeholder="0000 0000 0000 0000"
                    />

                    <div className="form__grid-2">
                      <FormInput
                        id="expiration-date"
                        label="Expiration date"
                        placeholder="MM/YY"
                      />
                      <FormInput id="cvc" label="CVC" placeholder="CVC" />
                    </div>
                  </div>
                </div>
              </CheckoutFormSection>
            </div>

            {/* Right Column - Order Summary */}
            <div className="checkout-page__right-column">
              <OrderSummary items={cartItems} />
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
