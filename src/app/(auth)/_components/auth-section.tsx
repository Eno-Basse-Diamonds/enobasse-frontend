"use client";

import { ReactNode, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input, PasswordInput } from "@/components";
import { AuthGoogleIcon } from "@/components/icons";
import {
  handleChangePassword,
  handleRequestResetPassword,
  handleResetCode,
} from "@/lib/actions/account";
import { handleSignUp } from "@/lib/actions/auth";
import { useAlertStore } from "@/lib/store/alert";
import { useAccountStore } from "@/lib/store/account";
import "./styles.scss";

interface AuthFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  helpText?: string | ReactNode;
  isPassword?: boolean;
  showForgot?: boolean;
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
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: true,
        callbackUrl: "/account",
      });
      setIsAuthenticated(true);
      setAccount({ email: formData.email });
    },
    "forgot-password": async (formData) => {
      setAccount({ email: formData.email });
      const response = await handleRequestResetPassword(formData);
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
        email: accountEmail || "",
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
    <main className="auth-page">
      <section className="auth-page__hero-section">
        <Image
          src={heroImage}
          alt="Auth page hero image"
          fill
          className="auth-page__hero-image"
          quality={100}
          priority={true}
          loading="eager"
        />

        <Link href="/" className="auth-page__logo-container">
          <Image
            src={logoImage}
            alt="Brand Logo"
            width={250}
            height={100}
            className="auth-page__logo"
          />
        </Link>
      </section>

      <section className="auth-page__form-section">
        <header className="auth-page__header">
          <h1 className="auth-page__title">{title}</h1>
        </header>

        <form className="auth-page__form" onSubmit={handleSubmit}>
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
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  errors={errors[field.name]}
                />
              )}
            </div>
          ))}

          {showTermsCheckbox && (
            <div className="auth-page__terms-checkbox">
              <div className="flex items-center h-5">
                <input
                  id="terms-and-conditions"
                  name="terms-and-conditions"
                  type="checkbox"
                  className="auth-page__checkbox-input"
                  required
                  checked={formData["terms-and-conditions"] === "on"}
                  onChange={handleInputChange}
                />
              </div>
              <label
                htmlFor="terms-and-conditions"
                className="auth-page__checkbox-label"
              >
                {termsText || (
                  <>
                    I agree to all{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="auth-page__terms-link"
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
            className="auth-page__submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : actionButtonText}
          </button>

          {/* {showSocialAuth && (
            <>
              <div className="auth-page__social-divider">
                <div className="auth-page__divider-line" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="auth-page__divider-text">
                  <span className="auth-page__divider-span">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="auth-page__social-buttons">
                <button
                  onClick={() => signIn("google", { redirect: false })}
                  type="button"
                  className="auth-page__social-button"
                >
                  <AuthGoogleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  Google
                </button>
              </div>
            </>
          )} */}

          {footer && (
            <p className="auth-page__footer">
              {footer.text}{" "}
              {footer.link && (
                <Link
                  href={footer.link.href}
                  className="auth-page__footer-link"
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
