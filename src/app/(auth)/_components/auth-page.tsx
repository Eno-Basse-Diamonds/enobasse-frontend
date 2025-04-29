"use client";

import Image from "next/image";
import Link from "next/link";
import { Input, PasswordInput } from "@/components";
import { AuthFacebookIcon, AuthGoogleIcon } from "@/components/icons";
import { ReactNode } from "react";
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
}

interface AuthPageProps {
  title: string;
  heroImage: string;
  logoImage: string;
  formFields: AuthFormField[];
  actionButtonText: string;
  footer?: { text: string; link?: { text: string; href: string } };
  showSocialAuth?: boolean;
  showTermsCheckbox?: boolean;
  termsText?: ReactNode;
}

export default function AuthPage({
  title,
  heroImage,
  logoImage,
  formFields,
  actionButtonText,
  footer,
  showSocialAuth = true,
  showTermsCheckbox = true,
  termsText,
}: AuthPageProps) {
  return (
    <main className="auth-page">
      <section className="auth-page__hero-section">
        <Image
          src={heroImage}
          alt="Auth page hero image"
          fill
          className="auth-page__hero-image"
          quality={100}
          priority
        />

        <div className="auth-page__logo-container">
          <Image
            src={logoImage}
            alt="Brand Logo"
            width={128}
            height={40}
            quality={100}
            className="auth-page__logo"
          />
        </div>
      </section>

      <section className="auth-page__form-section">
        <header className="auth-page__header">
          <h1 className="auth-page__title">{title}</h1>
        </header>

        <form className="auth-page__form">
          {formFields.map((field) =>
            field.type === "password" ? (
              <PasswordInput
                key={field.id}
                id={field.id}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                helpText={field.helpText}
                required={field.required}
              />
            ) : (
              <Input
                key={field.id}
                id={field.id}
                name={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                helpText={field.helpText}
                required={field.required}
              />
            ),
          )}

          {showTermsCheckbox && (
            <div className="auth-page__terms-checkbox">
              <div className="flex items-center h-5">
                <input
                  id="terms-and-conditions"
                  name="terms-and-conditions"
                  type="checkbox"
                  className="auth-page__checkbox-input"
                  required
                />
              </div>
              <label
                htmlFor="terms-and-conditions"
                className="auth-page__checkbox-label"
              >
                {termsText || (
                  <>
                    I agree to all{" "}
                    <Link href="/terms" className="auth-page__terms-link">
                      Terms & Conditions
                    </Link>
                  </>
                )}
              </label>
            </div>
          )}

          <button type="submit" className="auth-page__submit-button">
            {actionButtonText}
          </button>

          {showSocialAuth && (
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
                <button type="button" className="auth-page__social-button">
                  <AuthGoogleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  Google
                </button>
                <button type="button" className="auth-page__social-button">
                  <AuthFacebookIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  Facebook
                </button>
              </div>
            </>
          )}

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
