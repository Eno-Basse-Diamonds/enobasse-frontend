import { Metadata } from "next";
import AuthPage from "../_components/auth-page";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <AuthPage
      title="Join the World of Timeless Luxury"
      heroImage="/images/auth/sign-up.png"
      logoImage="/images/auth/logo-alt.svg"
      formFields={[
        {
          id: "name",
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
          required: true,
        },
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          required: true,
        },
        {
          id: "password",
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Create your password",
          required: true,
        },
      ]}
      actionButtonText="Sign Up"
      footer={{
        text: "Already have an account?",
        link: { text: "Sign In", href: "/sign-in" },
      }}
      showSocialAuth={true}
      showTermsCheckbox={true}
    />
  );
}
