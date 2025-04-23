import { Metadata } from "next";
import AuthPage from "../_components/auth-page";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <AuthPage
      title="Welcome Back"
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
        {
          id: "password",
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Create your password",
          required: true,
        },
      ]}
      actionButtonText="Sign In"
      footer={{
        text: "New to EnoBasse?",
        link: { text: "Create an account", href: "/sign-up" }
      }}
      showSocialAuth={true}
      showTermsCheckbox={false}
    />
  );
}
