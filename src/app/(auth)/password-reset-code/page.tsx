import { Metadata } from "next";
import AuthPage from "../_components/auth-page";

export const metadata: Metadata = {
  title: "Password Reset Code",
};

export default function PasswordResetCodePage() {
  return (
    <AuthPage
      title="Forgot Password"
      heroImage="/images/auth/reset-code.png"
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
        {
          id: "reset-code",
          name: "reset-code",
          label: "Reset Code",
          type: "number",
          placeholder: "Enter 6 figure reset code",
          helpText: (
            <p className="mt-2 text-sm text-[#787878]">
              Didn’t receive the code? Resend code in:{" "}
              <span className="text-[#D1A559]">0:57s</span>
            </p>
          ),
          required: true,
        },
      ]}
      actionButtonText="Continue"
      footer={{
        text: "For your security, this code expires in 10 minutes",
      }}
      showSocialAuth={false}
      showTermsCheckbox={false}
    />
  );
}
