import AuthSection from "../_components/auth-section";

export default function SignUpPage() {
  return (
    <AuthSection
      type="sign-up"
      title="Join the World of Timeless Luxury"
      heroImage="/images/auth/sign-up.webp"
      logoImage="/images/auth/logo-alt.png"
      formFields={[
        {
          id: "name",
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your full name",
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
      messages={{
        success: "Your account has been created successfully.",
      }}
      showSocialAuth={true}
      showTermsCheckbox={true}
    />
  );
}
