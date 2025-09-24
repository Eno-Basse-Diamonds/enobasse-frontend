"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { sendMessage } from "@/lib/api/contact";
import { logger } from "@/lib/utils/logger";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await sendMessage({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phoneNumber,
        message: formData.message,
      });

      setShowSuccessModal(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      logger.error("Error submitting contact form", error);
      setError("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <Alert
          type="error"
          className="mb-6"
          dismissible
          onDismiss={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="rounded-sm bg-white border border-primary-100 shadow-sm py-6 px-4 sm:px-6 md:p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                id="firstName"
                name="firstName"
                label="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <InputField
                id="lastName"
                name="lastName"
                label="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <InputField
              id="email"
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <InputField
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              label="Phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />

            <InputField
              id="message"
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[99999] backdrop-blur-sm">
          <div className="rounded-sm bg-white p-6 max-w-md w-full">
            <div className="text-center">
              <CircleCheck
                strokeWidth={1.5}
                className="mx-auto h-12 w-12 text-green-500"
              />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                Message Sent Successfully!
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                Thank you for contacting us. We&#39;ll get back to you soon.
              </div>
              <div className="mt-4">
                <Button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  required = false,
  rows,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-primary-500 mb-2"
      >
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          required={required}
          className="rounded-sm w-full px-3 py-2 border border-primary-100 focus:ring-0"
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="rounded-sm w-full px-3 py-2 border border-primary-100 focus:ring-0"
        />
      )}
    </div>
  );
};
