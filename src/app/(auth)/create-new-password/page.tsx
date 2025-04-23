import { Metadata } from "next";
import AuthPage from "../_components/auth-page";

export const metadata: Metadata = {
  title: "Create New Password",
};

export default function CreateNewPasswordPage() {
  return (
    <AuthPage
      title="Create New Password"
      heroImage="/images/auth/forgot-password.png"
      logoImage="/images/auth/logo-alt.svg"
      formFields={[
        {
          id: "new-password",
          name: "new-password",
          label: "New Password",
          type: "password",
          placeholder: "Enter new password",
          helpText: "Must be atleast 8 characters",
          required: true,
        },
        {
          id: "confirm-password",
          name: "confirm-password",
          label: "Confirm Password",
          type: "password",
          placeholder: "Retype your new password",
          required: true,
        },
      ]}
      actionButtonText="Continue"
      showSocialAuth={false}
      showTermsCheckbox={false}
    />
  );
}
