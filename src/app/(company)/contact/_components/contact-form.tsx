"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components";

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "info@enobasse.com",
          subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
          text: `
            Name: ${formData.firstName} ${formData.lastName}
            Email: ${formData.email}
            Phone: ${formData.phoneNumber}
            Message: ${formData.message}
          `,
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="contact-form__wrapper">
          <div className="contact-form__group">
            <div className="contact-form__row">
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

            <div className="contact-form__submit">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {showSuccessModal && (
        <div className="contact-form__modal-overlay">
          <div className="contact-form__modal-content">
            <div className="text-center">
              <CircleCheck strokeWidth={1.5} className="contact-form__icon" />
              <h3 className="contact-form__modal-title">
                Message Sent Successfully!
              </h3>
              <div className="contact-form__modal-body">
                Thank you for contacting us. We&#39;ll get back to you soon.
              </div>
              <div className="contact-form__modal-footer">
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
      <label htmlFor={id} className="contact-form__label">
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
          className="contact-form__input"
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="contact-form__input"
        />
      )}
    </div>
  );
};
