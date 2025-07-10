import { Metadata } from "next";
import AuthSection from "../_components/auth-section";

export const metadata: Metadata = {
  title: "Create New Password",
  description:
    "Set a new secure password for your Eno Basse account. Ensure your jewelry collection and personal details remain protected.",
  keywords: [
    "Eno Basse new password",
    "luxury account security",
    "reset jewelry account password",
    "secure password update",
    "Eno Basse client portal",
  ],
  openGraph: {
    title: "Create New Password - Eno Basse Diamonds",
    description:
      "Create a strong new password to protect access to your jewelry collection and client profile.",
    url: "https://www.enobasse.com/create-new-password",
  },
  twitter: {
    title: "Create New Password - Eno Basse Diamonds",
    description:
      "Update your password to maintain exclusive access to your jewelry portfolio.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/create-new-password",
  },
};

export default function CreateNewPasswordPage() {
  return (
    <AuthSection
      type="create-new-password"
      title="Create New Password"
      heroImage="/images/auth/create-new-password.webp"
      logoImage="/images/auth/logo-alt.png"
      formFields={[
        {
          id: "newPassword",
          name: "newPassword",
          label: "New Password",
          type: "password",
          placeholder: "Enter new password",
          helpText: "Must be atleast 8 characters",
          required: true,
        },
        {
          id: "confirmPassword",
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholder: "Retype your new password",
          required: true,
        },
      ]}
      messages={{
        success:
          "Your new password has been saved. You can now log in with your new credentials.",
      }}
      actionButtonText="Continue"
      showSocialAuth={false}
      showTermsCheckbox={false}
    />
  );
}
