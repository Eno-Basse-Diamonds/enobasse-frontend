"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { handleRequestResetPassword, handleResetCode } from "@/modules/account/actions";
import { useAccountStore } from "@/modules/account/store";
import { BackButton } from "@/shared/components/Button";
import { OtpInput } from "@/shared/components/Input";
import { BLUR_DATA_URL } from "@/shared/constants/url";
import { useAlertStore } from "@/shared/store/alert";

interface PasswordResetCodeSectionProps {
  heroImage: string;
  logoImage: string;
}

export default function PasswordResetCodeSection({
  heroImage,
  logoImage,
}: PasswordResetCodeSectionProps) {
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  const router = useRouter();
  const addAlert = useAlertStore((state) => state.addAlert);
  const resetEmail = useAccountStore((state) => state.resetEmail);
  const accountEmail = useAccountStore((state) => state.email);
  const setResetEmail = useAccountStore((state) => state.setResetEmail);

  // Get the email for display (mask it for privacy)
  const emailToDisplay = resetEmail || accountEmail || "";
  const maskedEmail = emailToDisplay
    ? emailToDisplay.replace(
        /^(.{2})(.*)(@.*)$/,
        (_, start, middle, end) => start + "*".repeat(Math.min(middle.length, 5)) + end,
      )
    : "";

  // Countdown timer
  useEffect(() => {
    if (timeRemaining <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const showAlert = (type: "success" | "error", message: string) => {
    addAlert({
      type,
      title: type === "success" ? "Success!" : "Something went wrong!",
      message,
      duration: type === "success" ? 5000 : 7000,
      dismissible: true,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    const emailToUse = resetEmail || accountEmail || "";
    if (!emailToUse) {
      showAlert("error", "Email not found. Please restart the password reset process.");
      router.push("/forgot-password");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await handleResetCode({
        email: emailToUse,
        resetCode: otpValue,
      });

      if (response?.errors || !response?.valid) {
        setError("Invalid or expired code. Please try again.");
      } else {
        showAlert("success", "Reset code has been successfully verified.");
        router.push("/create-new-password");
      }
    } catch (err) {
      setError("Invalid or expired code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    const emailToUse = resetEmail || accountEmail || "";
    if (!emailToUse) {
      showAlert("error", "Email not found. Please restart the password reset process.");
      router.push("/forgot-password");
      return;
    }

    setIsResending(true);

    try {
      await handleRequestResetPassword({ email: emailToUse });
      showAlert("success", "A new code has been sent to your email.");
      setTimeRemaining(15 * 60);
      setCanResend(false);
      setOtpValue("");
      setError("");
    } catch (err) {
      showAlert("error", "Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="h-[100dvh] flex flex-col lg:flex-row justify-center">
      <section className="hidden lg:block lg:w-[60%] lg:h-full relative overflow-hidden bg-gray-100">
        <Image
          src={heroImage}
          alt="Password reset hero image"
          fill
          className="object-cover"
          priority={true}
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 60vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />

        <Link href="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <Image
            src={logoImage}
            alt="Brand Logo"
            width={250}
            height={100}
            className="h-auto w-24 sm:w-32"
            priority={true}
            loading="eager"
            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 250px"
          />
        </Link>
      </section>

      <section className="lg:w-[40%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative">
        <div className="lg:hidden flex items-center justify-between mb-8">
          <div className="flex-1">
            <BackButton />
          </div>
          <div className="flex-1 flex justify-center">
            <Link href="/">
              <Image
                src={logoImage}
                alt="Brand Logo"
                width={120}
                height={40}
                className="h-auto"
                priority={true}
                loading="eager"
              />
            </Link>
          </div>
          <div className="flex-1" />
        </div>

        <div className="hidden lg:block mb-2">
          <BackButton />
        </div>

        <header className="mb-6 sm:mb-8 mt-2 sm:mt-4 text-center lg:text-left">
          <h1 className="font-primary text-2xl sm:text-3xl md:text-4xl text-[#502B3A]">
            Enter Verification Code
          </h1>
          {maskedEmail && (
            <p className="mt-3 text-sm sm:text-base text-[#787878]">
              We sent a 6-digit code to{" "}
              <span className="font-medium text-[#502B3A]">{maskedEmail}</span>
            </p>
          )}
        </header>

        <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
          <div className="py-4">
            <OtpInput length={6} value={otpValue} onChange={setOtpValue} error={error} />
          </div>

          {/* Countdown Timer */}
          <div className="text-center">
            {timeRemaining > 0 ? (
              <p className="text-sm text-[#787878]">
                Code expires in{" "}
                <span className="font-semibold text-[#502B3A]">{formatTime(timeRemaining)}</span>
              </p>
            ) : (
              <p className="text-sm text-red-500">Code has expired</p>
            )}
          </div>

          <button
            type="submit"
            className={`rounded-sm w-full flex justify-center items-center py-3 px-4 border border-transparent font-primary text-base sm:text-lg font-medium text-white bg-[#502B3A] hover:bg-[#502B3A]/80 transition-colors duration-200 ${
              isSubmitting || otpValue.length !== 6 ? "bg-[#502B3A]/60 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting || otpValue.length !== 6}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-[#787878]">
              Didn't receive the code?{" "}
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="font-medium underline underline-offset-1 text-[#D1A559] hover:text-[#D1A559]/80 disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend Code"}
                </button>
              ) : (
                <span className="text-[#787878]/60">
                  Resend available in {formatTime(timeRemaining)}
                </span>
              )}
            </p>
          </div>

          <p className="text-center text-xs text-gray-500">
            For your security, never share this code with anyone
          </p>
        </form>
      </section>
    </main>
  );
}
