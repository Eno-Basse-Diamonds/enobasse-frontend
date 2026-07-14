"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { handleSignUp } from "@/lib/actions/auth";
import { login } from "@/lib/api/auth";
import { useAlertStore } from "@/lib/store/alert";
import { useAccountStore } from "@/lib/store/account";
import { PasswordInput, Input } from "@/components/input";
import { ChevronDownIcon, ChevronUpIcon, User, Loader2 } from "lucide-react";

type AuthMode = "sign-in" | "sign-up";

interface FormErrors {
  [key: string]: string[] | undefined;
}

interface CheckoutAuthSectionProps {
  onAuthSuccess?: (email: string) => void;
}

export function CheckoutAuthSection({
  onAuthSuccess,
}: CheckoutAuthSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addAlert = useAlertStore((state) => state.addAlert);
  const { setIsAuthenticated, setAccount } = useAccountStore();

  const showAlert = (type: "success" | "error", message: string) => {
    addAlert({
      type,
      title: type === "success" ? "Success!" : "Something went wrong!",
      message,
      duration: type === "success" ? 5000 : 7000,
      dismissible: true,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      if (authMode === "sign-in") {
        const { accessToken, account } = await login(
          formData.email,
          formData.password,
        );

        const result = await signIn("credentials", {
          email: formData.email,
          preIssuedToken: JSON.stringify({ accessToken, account }),
          redirect: false,
        });

        if (result?.error) {
          throw new Error("Invalid email or password.");
        } else if (result?.ok) {
          setIsAuthenticated(true);
          setAccount({ email: formData.email });
          showAlert("success", "Welcome back! You're now logged in.");
          onAuthSuccess?.(formData.email);
          setIsExpanded(false);
        }
      } else {
        const response = await handleSignUp(formData);
        if (response?.errors) {
          setErrors(response.errors);
          return;
        }

        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.ok) {
          setIsAuthenticated(true);
          setAccount({ email: formData.email });
          showAlert("success", "Account created successfully!");
          onAuthSuccess?.(formData.email);
          setIsExpanded(false);
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      showAlert("error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-sm mb-6 overflow-hidden">
      {/* Collapsed Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D1A559]/10 flex items-center justify-center">
            <User className="w-4 h-4 text-[#D1A559]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#502B3A]">
              Have an account?
            </p>
            <p className="text-xs text-gray-500">Login for faster checkout</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Form */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-8">
          {/* Auth Mode Tabs */}
          <div className="flex gap-1 mb-4 p-1 bg-gray-100 rounded-sm">
            <button
              type="button"
              onClick={() => {
                setAuthMode("sign-in");
                setErrors({});
              }}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-sm transition-colors ${
                authMode === "sign-in"
                  ? "bg-white text-[#502B3A] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("sign-up");
                setErrors({});
              }}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-sm transition-colors ${
                authMode === "sign-up"
                  ? "bg-white text-[#502B3A] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "sign-up" && (
              <Input
                id="checkout-name"
                name="name"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                required
                value={formData.name || ""}
                onChange={handleInputChange}
                errors={errors.name}
              />
            )}

            <Input
              id="checkout-email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email || ""}
              onChange={handleInputChange}
              errors={errors.email}
            />

            <PasswordInput
              id="checkout-password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              required
              value={formData.password || ""}
              onChange={handleInputChange}
              errors={errors.password}
              showForgot={authMode === "sign-in"}
            />

            {authMode === "sign-up" && (
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="checkout-terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    required
                  />
                </div>
                <label
                  htmlFor="checkout-terms"
                  className="ml-2 block text-xs text-gray-500"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="text-[#D1A559] underline hover:text-[#D1A559]/80"
                  >
                    Terms & Conditions
                  </Link>
                </label>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 flex justify-center items-center py-2.5 px-4 border border-transparent rounded-sm font-medium text-sm text-white bg-[#502B3A] hover:bg-[#502B3A]/80 transition-colors ${
                  isSubmitting ? "bg-[#502B3A]/80 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {authMode === "sign-in" ? "Signing in..." : "Creating..."}
                  </>
                ) : authMode === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500">
              or{" "}
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-[#D1A559] font-medium hover:underline"
              >
                continue as guest
              </button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
