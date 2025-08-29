import AuthSection from "../_components/auth-section";

export default function SignInPage() {
  return (
    <AuthSection
      type="sign-in"
      title="Welcome Back"
      heroImage="https://res.cloudinary.com/enobasse/image/upload/v1756507388/sign-in_luzacd.webp"
      logoImage="https://res.cloudinary.com/enobasse/image/upload/v1756507384/logo-alt_q7lagf.png"
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
