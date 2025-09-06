import { Metadata } from "next";
import AuthSection from "../_components/auth-section";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Securely reset your Eno Bassé account password. Enter your email to receive a verification link for account recovery.",
  keywords: [
    "Eno Bassé password recovery",
    "jewelry account access",
    "reset luxury account password",
    "Eno Bassé client portal",
    "secure password reset",
  ],
  openGraph: {
    title: "Forgot Password - Eno Bassé Diamonds",
    description:
      "Regain access to your jewelry collection account. We'll send a secure reset link to your registered email.",
    url: "https://www.enobasse.com/forgot-password",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgot Password - Eno Bassé Diamonds",
    description:
      "We'll help you securely regain access to your jewelry account.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/forgot-password",
  },
};

export default async function ForgotPasswordPage() {
  const session = await getServerSession();

  return (
    <AuthSection
      type="forgot-password"
      title="Forgot Password"
      heroImage="https://res.cloudinary.com/enobasse/image/upload/v1756507385/forgot-password_k0hbxj.webp"
      logoImage="https://res.cloudinary.com/enobasse/image/upload/v1756507384/logo-alt_q7lagf.png"
      formFields={[
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "email",
          value: session?.user?.email || "",
          placeholder: "Enter your email",
          required: true,
          readOnly: true,
        },
      ]}
      messages={{
        success:
          "We've sent a password reset link to your email address. Please check your inbox (and spam folder).",
      }}
      actionButtonText="Send Reset Code"
      showSocialAuth={false}
      showTermsCheckbox={false}
    />
  );
}
