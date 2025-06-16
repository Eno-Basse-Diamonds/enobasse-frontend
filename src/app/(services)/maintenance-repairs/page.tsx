"use client";

import React, { useState } from "react";
import { ProgressBar } from "./_components/progress-bar";
import { NavigationButtons } from "./_components/navigation-buttons";
import { CustomerDetailsForm } from "./_components/customer-details-form";
import { ItemDetailsForm } from "./_components/item-details-form";
import { ServiceDetailsForm } from "./_components/service-details-form";
import { Alert } from "@/components/alert";
import { sendMaintenanceRepairsMessage } from "@/lib/api/contact";
import { useMaintenanceRepairsStore } from "@/lib/store/maintenance-repairs";

interface FormErrors {
  customerInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  itemInfo?: {
    itemType?: string;
    metalType?: string;
    karat?: string;
  };
  serviceInfo?: {
    serviceType?: string;
    urgency?: string;
    description?: string;
  };
}

export default function MaintenanceRepairsForm() {
  const { formData, currentStep, setFormData, setCurrentStep, resetForm } = useMaintenanceRepairsStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleInputChange = (
    section: keyof typeof formData,
    field: string,
    value: string | boolean
  ) => {
    if (field === "images") {
      // Handle images as an array
      const imageUrls = value.toString().split(",").filter(url => url);
      setFormData({
        [section]: { ...formData[section], [field]: imageUrls },
      });
    } else {
      setFormData({
        [section]: { ...formData[section], [field]: value },
      });
    }

    // Clear error when user starts typing
    if (errors[section]?.[field as keyof typeof errors[typeof section]]) {
      setErrors((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: undefined,
        },
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.customerInfo.firstName.trim())
        newErrors.customerInfo = { ...newErrors.customerInfo, firstName: "First name is required" };
      if (!formData.customerInfo.lastName.trim())
        newErrors.customerInfo = { ...newErrors.customerInfo, lastName: "Last name is required" };
      if (!formData.customerInfo.email.trim())
        newErrors.customerInfo = { ...newErrors.customerInfo, email: "Email is required" };
      if (!formData.customerInfo.phone.trim())
        newErrors.customerInfo = { ...newErrors.customerInfo, phone: "Phone is required" };
      if (formData.customerInfo.email && !/\S+@\S+\.\S+/.test(formData.customerInfo.email)) {
        newErrors.customerInfo = { ...newErrors.customerInfo, email: "Please enter a valid email address" };
      }
    } else if (step === 2) {
      if (!formData.itemInfo.itemType)
        newErrors.itemInfo = { ...newErrors.itemInfo, itemType: "Item type is required" };
      if (!formData.itemInfo.metalType)
        newErrors.itemInfo = { ...newErrors.itemInfo, metalType: "Metal type is required" };
      if (!formData.itemInfo.karat)
        newErrors.itemInfo = { ...newErrors.itemInfo, karat: "Karat is required" };
    } else if (step === 3) {
      if (!formData.serviceInfo.serviceType)
        newErrors.serviceInfo = { ...newErrors.serviceInfo, serviceType: "Service type is required" };
      if (!formData.serviceInfo.urgency)
        newErrors.serviceInfo = { ...newErrors.serviceInfo, urgency: "Urgency is required" };
      if (!formData.serviceInfo.description.trim())
        newErrors.serviceInfo = { ...newErrors.serviceInfo, description: "Description is required" };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, 3));
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      await sendMaintenanceRepairsMessage({
        name: `${formData.customerInfo.firstName} ${formData.customerInfo.lastName}`,
        email: formData.customerInfo.email,
        phone: formData.customerInfo.phone,
        address: formData.customerInfo.address,
        city: formData.customerInfo.city,
        state: formData.customerInfo.state,
        message: {
          itemType: formData.itemInfo.itemType,
          brand: formData.itemInfo.brand,
          metalType: formData.itemInfo.metalType,
          karat: formData.itemInfo.karat,
          purchaseDate: formData.itemInfo.purchaseDate,
          purchaseLocation: formData.itemInfo.purchaseLocation,
          description: formData.itemInfo.description,
          serialNumber: formData.itemInfo.serialNumber,
          estimatedValue: formData.itemInfo.estimatedValue,
          serviceType: formData.serviceInfo.serviceType,
          urgency: formData.serviceInfo.urgency,
          serviceDescription: formData.serviceInfo.description,
          preferredContact: formData.serviceInfo.preferredContact,
          pickupDelivery: formData.serviceInfo.pickupDelivery,
          images: formData.itemInfo.images,
        },
      });
      setAlertMessage({
        type: 'success',
        message: 'Thank you for your maintenance request. We\'ll review your submission and contact you within 24 hours with a detailed quote and timeline.'
      });
      setShowAlert(true);
      resetForm();
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertMessage({
        type: 'error',
        message: 'Failed to submit the form. Please try again or contact support if the problem persists.'
      });
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
              Thank you for your maintenance request. We'll review your submission and contact you within 24 hours with a detailed quote and timeline.
            </p>
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-slate-600 mb-2">Reference Number</p>
              <p className="text-lg font-mono text-primary-500">
                MR-{Date.now().toString().slice(-6)}
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
      {showAlert && alertMessage && (
        <Alert
          type={alertMessage.type}
          title={alertMessage.type === 'success' ? "Request Submitted" : "Submission Failed"}
          dismissible
          onDismiss={() => setShowAlert(false)}
          duration={5000}
        >
          {alertMessage.message}
        </Alert>
      )}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-primary text-3xl md:text-4xl font-semibold text-primary-500 items-center text-center mb-4">
              Professional Jewelry Care
            </h1>
            <p className="text-primary-400 text-lg text-center max-w-2xl mx-auto">
              Expert maintenance and repair services for your precious jewelry
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <ProgressBar currentStep={currentStep} />

            {currentStep === 1 && (
              <CustomerDetailsForm
                formData={formData.customerInfo}
                errors={errors.customerInfo}
                onInputChange={(field, value) =>
                  handleInputChange("customerInfo", field, value)
                }
              />
            )}

            {currentStep === 2 && (
              <ItemDetailsForm
                formData={formData.itemInfo}
                errors={errors.itemInfo}
                onInputChange={(field, value) =>
                  handleInputChange("itemInfo", field, value)
                }
              />
            )}

            {currentStep === 3 && (
              <ServiceDetailsForm
                formData={formData.serviceInfo}
                errors={errors.serviceInfo}
                onInputChange={(field, value) =>
                  handleInputChange("serviceInfo", field, value)
                }
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
