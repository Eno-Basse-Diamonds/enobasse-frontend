import { Metadata } from "next";
import AuthSection from "../_components/auth-section";

export const metadata: Metadata = {
  title: "Create New Password",
  description:
    "Set a new secure password for your Eno Bassé account. Ensure your jewelry collection and personal details remain protected.",
  keywords: [
    "Eno Bassé new password",
    "luxury account security",
    "reset jewelry account password",
    "secure password update",
    "Eno Bassé client portal",
  ],
  openGraph: {
    title: "Create New Password - Eno Bassé Diamonds",
    description:
      "Create a strong new password to protect access to your jewelry collection and client profile.",
    url: "https://www.enobasse.com/create-new-password",
  },
  twitter: {
    title: "Create New Password - Eno Bassé Diamonds",
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
      heroImage="https://res.cloudinary.com/enobasse/image/upload/v1756507390/create-new-password_logxft.webp"
      logoImage="https://res.cloudinary.com/enobasse/image/upload/v1756507384/logo-alt_q7lagf.png"
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
