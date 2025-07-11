import AuthSection from "../_components/auth-section";

export default function SignInPage() {
  return (
    <AuthSection
      type="sign-in"
      title="Welcome Back"
      heroImage="/images/auth/sign-in.webp"
      logoImage="/images/auth/logo-alt.png"
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
          showForgot: true,
        },
      ]}
      actionButtonText="Sign In"
      footer={{
        text: "New to Eno Bassé?",
        link: { text: "Create an account", href: "/sign-up" },
      }}
      messages={{
        success: "Welcome back! You’re now logged in.",
      }}
      showSocialAuth={true}
      showTermsCheckbox={false}
    />
  );
}
