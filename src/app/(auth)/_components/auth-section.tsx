"use client";

import { ReactNode, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
  handleChangePassword,
  handleRequestResetPassword,
  handleResetCode,
} from "@/lib/actions/account";
import { handleSignUp } from "@/lib/actions/auth";
import { useAlertStore } from "@/lib/store/alert";
import { useAccountStore } from "@/lib/store/account";
import { blurDataURL } from "@/lib/utils/constants/blur-data-url";
import { BackButton } from "@/components/button";
import { PasswordInput, Input } from "@/components/input";

interface AuthFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  helpText?: string | ReactNode;
  isPassword?: boolean;
  showForgot?: boolean;
  readOnly?: boolean;
}

interface FormErrors {
  [key: string]: string[] | undefined;
}

interface AuthSectionProps {
  type?: string;
  title: string;
  heroImage: string;
  logoImage: string;
  formFields: AuthFormField[];
  actionButtonText: string;
  footer?: { text: string; link?: { text: string; href: string } };
  showSocialAuth?: boolean;
  showTermsCheckbox?: boolean;
  termsText?: ReactNode;
  messages: {
    success: string;
  };
}

export default function AuthSection({
  type,
  title,
  heroImage,
  logoImage,
  formFields,
  actionButtonText,
  footer,
  showSocialAuth = true,
  showTermsCheckbox = true,
  termsText,
  messages,
}: AuthSectionProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addAlert = useAlertStore((state) => state.addAlert);
  const router = useRouter();
  const accountEmail = useAccountStore((state) => state.email);
  const setAccount = useAccountStore((state) => state.setAccount);
  const { setIsAuthenticated } = useAccountStore();
  const { data: session } = useSession();

  const showAlert = (type: "success" | "error", message: string) => {
    addAlert({
      type,
      title: type === "success" ? "Success!" : "Something went wrong!",
      message,
      duration: type === "success" ? 5000 : 7000,
      dismissible: true,
    });
  };

  const authHandlers: Record<
    string,
    (
      formData: Record<string, string>
    ) => Promise<{ errors?: FormErrors } | void>
  > = {
    "sign-up": async (formData) => {
      const response = await handleSignUp(formData);
      if (response?.errors) return response;
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: true,
        callbackUrl: "/account",
      });
      setIsAuthenticated(true);
      setAccount({ email: formData.email });
    },
    "sign-in": async (formData) => {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid email or password.");
      } else if (result?.ok) {
        setIsAuthenticated(true);
        setAccount({ email: formData.email });
        router.push("/account");
      }
    },
    "forgot-password": async (formData) => {
      const response = await handleRequestResetPassword({
        ...formData,
        email: session?.user?.email || "",
      });
      if (response?.errors) return response;
      router.push("/password-reset-code");
    },
    "password-reset-code": async (formData) => {
      const response = await handleResetCode({
        ...formData,
        email: accountEmail || "",
      });
      if (response?.errors) return response;
      router.push("/create-new-password");
    },
    "create-new-password": async (formData) => {
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("Passwords don't match.");
      }
      const response = await handleChangePassword({
        ...formData,
        email: session?.user?.email || "",
      });
      if (response?.errors) return response;
      router.push("/sign-in");
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "on" : "off") : value,
    }));

    // Clear error when user starts typing
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

    if (!type) {
      setIsSubmitting(false);
      return;
    }

    try {
      const handler = authHandlers[type];
      if (!handler) {
        throw new Error("Invalid auth type");
      }

      const result = await handler(formData);
      if (result?.errors) {
        setErrors(result.errors);
      } else {
        showAlert("success", messages.success);
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
    <main className="h-[100dvh] flex flex-col lg:flex-row justify-center">
      <section className="hidden lg:block lg:w-[60%] lg:h-full relative overflow-hidden bg-gray-100">
        <Image
          src={heroImage}
          alt="Auth page hero image"
          fill
          className="object-cover"
          priority={true}
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 60vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />

        <Link
          href="/"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10"
        >
          <Image
            src={logoImage}
            alt="Brand Logo"
            width={250}
            height={100}
            className="h-auto w-24 sm:w-32"
            priority={true}
            loading="eager"
            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 250px"
          />
        </Link>
      </section>

      <section className="lg:w-[40%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative">
        <div className="lg:hidden flex items-center justify-between mb-8">
          <div className="flex-1">
            <BackButton />
          </div>
          <div className="flex-1 flex justify-center">
            <Link href="/">
              <Image
                src={logoImage}
                alt="Brand Logo"
                width={120}
                height={40}
                className="h-auto"
                priority={true}
                loading="eager"
              />
            </Link>
          </div>
          <div className="flex-1" />
        </div>

        <div className="hidden lg:block mb-2">
          <BackButton />
        </div>

        <header className="mb-6 sm:mb-8 mt-2 sm:mt-4">
          <h1 className="font-primary text-center lg:text-left text-2xl sm:text-3xl md:text-4xl text-[#502B3A]">
            {title}
          </h1>
        </header>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.id} className="auth-page__field-container">
              {field.type === "password" ? (
                <PasswordInput
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  helpText={field.helpText}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  errors={errors[field.name]}
                  showForgot={field.showForgot}
                />
              ) : (
                <Input
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  helpText={field.helpText}
                  required={field.required}
                  value={formData[field.name] || field.value || ""}
                  onChange={handleInputChange}
                  errors={errors[field.name]}
                  readOnly={field.readOnly}
                />
              )}
            </div>
          ))}

          {showTermsCheckbox && (
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms-and-conditions"
                  name="terms-and-conditions"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300"
                  required
                  checked={formData["terms-and-conditions"] === "on"}
                  onChange={handleInputChange}
                />
              </div>
              <label
                htmlFor="terms-and-conditions"
                className="ml-2 block text-xs sm:text-sm text-[#787878]"
              >
                {termsText || (
                  <>
                    I agree to all{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="text-[#787878] font-semibold underline underline-offset-1 hover:text-[#D1A559]"
                    >
                      Terms & Conditions
                    </Link>
                  </>
                )}
              </label>
            </div>
          )}

          <button
            type="submit"
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent font-primary text-base sm:text-lg font-medium text-white bg-[#502B3A] hover:bg-[#502B3A]/80 transition-colors duration-200 ${
              isSubmitting ? "bg-[#502B3A]/80 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              actionButtonText
            )}
          </button>

          {/* {showSocialAuth && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-xs sm:text-sm text-[#787878]">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => signIn("google", { redirect: false })}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#D1A559] font-medium text-sm sm:text-base text-gray-700 bg-white hover:bg-gray-50"
                >
                  <AuthGoogleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  Google
                </button>
              </div>
            </>
          )} */}

          {footer && (
            <p className="text-center text-xs sm:text-sm text-gray-600">
              {footer.text}{" "}
              {footer.link && (
                <Link
                  href={footer.link.href}
                  className="font-medium underline underline-offset-1 text-[#D1A559] hover:text-[#D1A559]/80"
                >
                  {footer.link.text}
                </Link>
              )}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
