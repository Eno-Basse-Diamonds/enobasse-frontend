"use client";

import React, { useState } from "react";
import { ProgressBar } from "./_components/progress-bar";
import { NavigationButtons } from "./_components/navigation-buttons";
import { CustomerDetailsForm } from "./_components/customer-details-form";
import { RingDetailsForm } from "./_components/ring-details-form";
import { AdditionalInfoForm } from "./_components/additional-info-form";
import { Alert } from "@/components/alert";
import { useRingResizingStore } from "@/lib/store/ring-resizing";
import { sendRingResizingMessage } from "@/lib/api/contact";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  ringType?: string;
  currentSize?: string;
  desiredSize?: string;
  urgency?: string;
  inscriptionText?: string;
}

export default function RingResizingPage() {
  const {
    formData,
    currentStep,
    isSubmitted,
    setFormData,
    setCurrentStep,
    setIsSubmitted,
    resetForm,
  } = useRingResizingStore();

  const [errors, setErrors] = useState<FormErrors>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ringTypes = [
    "Wedding Band",
    "Engagement Ring",
    "Cocktail Ring",
    "Signet Ring",
    "Eternity Band",
    "Fashion Ring",
    "Other",
  ];

  const ringSizes = [
    "3",
    "3.25",
    "3.5",
    "3.75",
    "4",
    "4.25",
    "4.5",
    "4.75",
    "5",
    "5.25",
    "5.5",
    "5.75",
    "6",
    "6.25",
    "6.5",
    "6.75",
    "7",
    "7.25",
    "7.5",
    "7.75",
    "8",
    "8.25",
    "8.5",
    "8.75",
    "9",
    "9.25",
    "9.5",
    "9.75",
    "10",
    "10.25",
    "10.5",
    "10.75",
    "11",
    "11.25",
    "11.5",
    "11.75",
    "12",
    "12.25",
    "12.5",
    "12.75",
    "13",
  ];

  const handleInputChange = (
    section: string,
    field: string,
    value: string | boolean
  ) => {
    if (section === "personalInfo") {
      setFormData({
        ...formData,
        personalInfo: { ...formData.personalInfo, [field]: value },
      });
    } else if (
      section === "ringType" ||
      section === "currentSize" ||
      section === "desiredSize" ||
      section === "urgency"
    ) {
      setFormData({ ...formData, [section]: value });
    } else if (
      section === "hasInscription" ||
      section === "inscriptionText" ||
      section === "notes"
    ) {
      setFormData({ ...formData, [section]: value });
    }

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (result: any) => {
    if (result.info) {
      setFormData({
        ...formData,
        images: [...formData.images, result.info.secure_url],
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.personalInfo.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.personalInfo.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.personalInfo.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.personalInfo.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[\d\s-]{10,}$/.test(formData.personalInfo.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    } else if (step === 2) {
      if (!formData.ringType) newErrors.ringType = "Ring type is required";
      if (!formData.currentSize)
        newErrors.currentSize = "Current size is required";
      if (!formData.desiredSize)
        newErrors.desiredSize = "Desired size is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, 3));
    } else {
      setAlertType("error");
      setAlertMessage(
        "Please fill in all required fields correctly before proceeding."
      );
      setShowAlert(true);
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      setAlertType("error");
      setAlertMessage(
        "Please fill in all required fields correctly before submitting."
      );
      setShowAlert(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const message = {
        name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        message: {
          ringType: formData.ringType,
          currentSize: formData.currentSize,
          desiredSize: formData.desiredSize,
          urgency: formData.urgency,
          inscriptionText: formData.inscriptionText,
          notes: formData.notes,
          images: formData.images,
        },
      };

      await sendRingResizingMessage(message);
      setAlertType("success");
      setAlertMessage(
        "Thank you for your ring resizing request. We'll review your submission and contact you within 24 hours with a detailed quote and timeline."
      );
      setShowAlert(true);
      setIsSubmitted(true);
      resetForm();
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertType("error");
      setAlertMessage(
        "There was an error submitting your request. Please try again later."
      );
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-primary-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-light text-primary-500 mb-4">
              Request Submitted
            </h1>
            <p className="text-slate-600 mb-6">
              Thank you for your ring resizing request. We'll review your
              submission and contact you within 24 hours with a detailed quote
              and timeline.
            </p>
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-slate-600 mb-2">Reference Number</p>
              <p className="text-lg font-mono text-primary-500">
                RR-{Date.now().toString().slice(-6)}
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-primary-500 text-white px-8 py-3 rounded-xl hover:bg-primary-600 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      {showAlert && (
        <Alert
          type={alertType}
          title={alertType === "success" ? "Request Submitted" : "Error"}
          dismissible
          onDismiss={() => setShowAlert(false)}
          duration={5000}
        >
          {alertMessage}
        </Alert>
      )}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-primary text-3xl md:text-4xl font-semibold text-primary-500 items-center text-center mb-4">
              Ring Resizing Request
            </h1>
            <p className="text-slate-600">
              Please fill out the form below to request a ring resizing service.
            </p>
          </div>

          <ProgressBar currentStep={currentStep} />

          <form onSubmit={handleSubmit} className="mt-8">
            {currentStep === 1 && (
              <CustomerDetailsForm
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />
            )}

            {currentStep === 2 && (
              <RingDetailsForm
                formData={formData}
                errors={errors}
                ringTypes={ringTypes}
                ringSizes={ringSizes}
                onInputChange={handleInputChange}
              />
            )}

            {currentStep === 3 && (
              <AdditionalInfoForm
                formData={{
                  hasInscription: formData.hasInscription,
                  inscriptionText: formData.inscriptionText || "",
                  notes: formData.notes || "",
                  images: formData.images,
                }}
                onInputChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  const { name, value, type } = e.target;
                  if (type === "checkbox") {
                    handleInputChange(
                      name,
                      name,
                      (e.target as HTMLInputElement).checked
                    );
                  } else {
                    handleInputChange(name, name, value);
                  }
                }}
                onImageUpload={handleImageUpload}
              />
            )}

            <NavigationButtons
              currentStep={currentStep}
              onPrevStep={prevStep}
              onNextStep={nextStep}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
