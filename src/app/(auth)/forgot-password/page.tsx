import { Metadata } from "next";
import AuthPage from "../_components/auth-page";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function SignInPage() {
  return (
    <AuthPage
      title="Forgot Password"
      heroImage="/images/auth/sign-in.png"
      logoImage="/images/auth/logo-alt.svg"
      formFields={[
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          required: true,
        },
      ]}
      actionButtonText="Send Reset Code"
      showSocialAuth={false}
      showTermsCheckbox={false}
    />
  );
}
