import { Metadata } from "next";
import AuthSection from "../_components/auth-section";

export const metadata: Metadata = {
  title: "Password Reset",
  description:
    "Enter your verification code to securely reset your Eno Bassé account password. This code expires in 15 minutes for your protection.",
  keywords: [
    "Eno Bassé password reset",
    "jewelry account security",
    "verification code",
    "luxury client portal",
    "secure account recovery",
  ],
  openGraph: {
    title: "Password Reset - Eno Bassé Diamonds",
    description:
      "Protecting your jewelry collection access. Please enter the 6-digit code sent to your registered email.",
    url: "https://www.enobasse.com/password-reset-code",
  },
  twitter: {
    title: "Password Reset - Eno Bassé Diamonds",
    description:
      "For your security, we've sent a temporary access code. Never share this code.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/password-reset-code",
  },
};

export default function PasswordResetCodePage() {
  return (
    <AuthSection
      type="password-reset-code"
      title="Password Rest Code"
      heroImage="/images/auth/reset-code.webp"
      logoImage="/images/auth/logo-alt.png"
      formFields={[
        {
          id: "reset-code",
          name: "resetCode",
          label: "Reset Code",
          type: "number",
          placeholder: "Enter 6 figure reset code",
          required: true,
        },
      ]}
      actionButtonText="Continue"
      messages={{
        success: "Reset code has been succesfully verified.",
      }}
      footer={{
        text: "For your security, this code expires in 15 minutes",
      }}
      showSocialAuth={false}
      showTermsCheckbox={false}
    />
  );
}
