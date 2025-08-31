"use client";

import React, { useState, FormEvent } from "react";
import { Header } from "./_components/header";
import { ProgressBar } from "./_components/progress-bar";
import { PersonalInfoForm } from "./_components/personal-info-form";
import { DesignSpecsForm } from "./_components/design-specs-form";
import { FinalDetailsForm } from "./_components/final-details-form";
import { NavigationButtons } from "./_components/navigation-buttons";
import { Alert } from "@/components/alert";
import { sendCustomDesignMessage } from "@/lib/api/contact";
import { useCustomDesignStore } from "@/lib/store/custom-design";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface DesignSpecs {
  jewelryType: string;
  metalPurity: string;
  metalType: string;
  gemstone: string;
  size: string;
  budget: string;
  occasion: string;
  engraving: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  jewelryType?: string;
  metalPurity?: string;
  metalType?: string;
  gemstone?: string;
  budget?: string;
  occasion?: string;
  description?: string;
  timeline?: string;
}

interface FormData {
  personalInfo: PersonalInfo;
  designSpecs: DesignSpecs;
  description: string;
  inspiration: string[];
  timeline: string;
  contactPreference: "email" | "phone";
}

export default function CustomDesignPage() {
  const { formData, currentStep, setFormData, setCurrentStep, resetForm } = useCustomDesignStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    section: keyof typeof formData,
    field: string,
    value: string
  ) => {
    if (section === "personalInfo" || section === "designSpecs") {
      setFormData({
        [section]: { ...formData[section], [field]: value },
      });
    } else {
      setFormData({ [section]: value });
    }

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (result: any) => {
    if (result.info) {
      setFormData({
        inspiration: [...formData.inspiration, result.info.secure_url],
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
      if (!formData.designSpecs.jewelryType) {
        newErrors.jewelryType = "Jewelry type is required";
      }
      if (!formData.designSpecs.metalPurity) {
        newErrors.metalPurity = "Metal purity is required";
      }
      if (!formData.designSpecs.metalType) {
        newErrors.metalType = "Metal type is required";
      }
      if (!formData.designSpecs.gemstone) {
        newErrors.gemstone = "Gemstone selection is required";
      }
      if (!formData.designSpecs.budget) {
        newErrors.budget = "Budget is required";
      }
      if (!formData.designSpecs.occasion) {
        newErrors.occasion = "Occasion is required";
      }
    } else if (step === 3) {
      if (!formData.timeline) {
        newErrors.timeline = "Timeline is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, 3));
    } else {
      setAlertType("error");
      setAlertMessage("Please fill in all required fields correctly before proceeding.");
      setShowAlert(true);
    }
  };

  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      setAlertType("error");
      setAlertMessage("Please fill in all required fields correctly before submitting.");
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
          description: formData.description,
          timeline: formData.timeline,
          contactPreference: formData.contactPreference,
          designSpecs: formData.designSpecs,
          inspirationImages: formData.inspiration,
        },
      };

      await sendCustomDesignMessage(message);
      setAlertType("success");
      setAlertMessage("Thank you for your custom design request! We will contact you within 24 hours to discuss your design in detail.");
      setShowAlert(true);
      resetForm();
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertType("error");
      setAlertMessage("There was an error submitting your request. Please try again later.");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen max-w-4xl py-12 mx-auto">
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
      <Header />
      <ProgressBar currentStep={currentStep} />

      <form onSubmit={handleSubmit} className="sm:px-6 pb-12">
        {currentStep === 1 && (
          <PersonalInfoForm
            personalInfo={formData.personalInfo}
            errors={errors}
            onInputChange={(field, value) =>
              handleInputChange("personalInfo", field, value)
            }
          />
        )}

        {currentStep === 2 && (
          <DesignSpecsForm
            designSpecs={formData.designSpecs}
            errors={errors}
            onInputChange={(field, value) =>
              handleInputChange("designSpecs", field, value)
            }
          />
        )}

        {currentStep === 3 && (
          <FinalDetailsForm
            description={formData.description}
            timeline={formData.timeline}
            contactPreference={formData.contactPreference}
            uploadedFiles={formData.inspiration}
            errors={errors}
            onDescriptionChange={(value) =>
              handleInputChange("description", "", value)
            }
            onTimelineChange={(value) =>
              handleInputChange("timeline", "", value)
            }
            onContactPreferenceChange={(value) =>
              handleInputChange("contactPreference", "", value)
            }
            onFileUpload={handleImageUpload}
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
  );
}
