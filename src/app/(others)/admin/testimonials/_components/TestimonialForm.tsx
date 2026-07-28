"use client";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { MessageSquare, User } from "lucide-react";

import { AdminModal } from "@/app/(others)/admin/products/_components/_elements/AdminModal";
import { useCreateTestimonial, useUpdateTestimonial } from "@/modules/testimonials/hooks";
import { CreateTestimonialData, Testimonial } from "@/modules/testimonials/types";
import { Alert } from "@/shared/components/Alert";
import { Button } from "@/shared/components/Button";
import { logger } from "@/shared/utils/logger";

interface TestimonialFormProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

export function TestimonialForm({ testimonial, onClose }: TestimonialFormProps) {
  const [formData, setFormData] = useState<CreateTestimonialData>({
    text: testimonial?.text || "",
    name: testimonial?.name || "",
    handle: testimonial?.handle || "",
    avatar: testimonial?.avatar || undefined,
    isActive: testimonial?.isActive ?? true,
    order: testimonial?.order || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();

  const handleInputChange = (field: keyof CreateTestimonialData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar: { url: "", alt: "", ...prev.avatar, [field]: value },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.text.trim()) {
      newErrors.text = "Testimonial text is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required";
    }

    if (formData.text.length > 500) {
      newErrors.text = "Testimonial text must be less than 500 characters";
    }

    if (formData.name.length > 100) {
      newErrors.name = "Customer name must be less than 100 characters";
    }

    if (formData.handle && formData.handle.length > 100) {
      newErrors.handle = "Handle must be less than 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (testimonial) {
      updateMutation.mutate(
        { id: testimonial.id, data: formData },
        {
          onSuccess: () => {
            setTimeout(() => onClose(), 1500);
          },
          onError: (error) => {
            logger.error("Update error:", error);
          },
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setTimeout(() => onClose(), 1500);
        },
        onError: (error) => {
          logger.error("Create error:", error);
        },
      });
    }
  };

  useEffect(() => {
    const mutation = testimonial ? updateMutation : createMutation;
    if (mutation.isSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [testimonial, createMutation, updateMutation, onClose]);

  const formTitle = testimonial ? "Edit Testimonial" : "New Testimonial";
  const mutation = testimonial ? updateMutation : createMutation;

  return (
    <>
      {mutation.isSuccess && (
        <div className="fixed top-4 right-4 max-w-md w-full z-[9999]">
          <Alert type="success" className="mb-6" dismissible>
            {testimonial
              ? "Testimonial updated successfully!"
              : "Testimonial created successfully!"}
          </Alert>
        </div>
      )}

      <AdminModal
        title={formTitle}
        onClose={onClose}
        maxWidth="max-w-2xl"
        confirmText={testimonial ? "Update Testimonial" : "Create Testimonial"}
        confirmLoading={mutation.isPending}
        onConfirm={() => {
          const form = document.querySelector("#testimonial-form") as HTMLFormElement;
          form?.requestSubmit();
        }}
      >
        <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-5">
          <FormField
            label="Customer Name *"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter customer name..."
            error={errors?.name}
            icon={<User className="w-4 h-4" />}
          />

          <FormField
            label="Handle (Optional)"
            name="handle"
            value={formData.handle || ""}
            onChange={(e) => handleInputChange("handle", e.target.value)}
            placeholder="@username"
            error={errors?.handle}
            icon={<MessageSquare className="w-4 h-4" />}
          />

          <FormTextareaField
            label="Testimonial Text *"
            name="text"
            value={formData.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
            rows={4}
            placeholder="Write the customer testimonial..."
            characterCount={formData.text.length}
            maxCharacters={500}
            error={errors?.text}
          />

          <ImageUploadField formData={formData} onImageChange={handleImageChange} />

          <div className="grid grid-cols-2 gap-4">
            <StatusField
              isActive={formData.isActive}
              onChange={(value) => handleInputChange("isActive", value)}
            />

            <OrderField
              order={formData.order}
              onChange={(value) => handleInputChange("order", value)}
            />
          </div>
        </form>
      </AdminModal>
    </>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
}) => (
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-1.5">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 ${
          icon ? "pl-10" : ""
        }`}
        placeholder={placeholder}
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface FormTextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows: number;
  error?: string;
  characterCount?: number;
  maxCharacters?: number;
}

const FormTextareaField: React.FC<FormTextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
  error,
  characterCount,
  maxCharacters,
}) => (
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-1.5">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full p-3 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
      placeholder={placeholder}
    />
    {characterCount !== undefined && maxCharacters !== undefined && (
      <p className="text-xs text-gray-500 mt-1">
        {characterCount}/{maxCharacters} characters
      </p>
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const ImageUploadField = ({
  formData,
  onImageChange,
}: {
  formData: CreateTestimonialData;
  onImageChange: (field: string, value: string) => void;
}) => (
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-1.5">
      Customer Avatar (Optional)
    </label>
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <CldUploadWidget
        uploadPreset="testimonials"
        options={{
          sources: ["local", "url", "camera"],
          resourceType: "image",
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result: any) => {
          if (result.info) {
            onImageChange("url", result.info.secure_url);
            onImageChange("alt", formData.name || "Customer avatar");
          }
        }}
      >
        {({ open }) => (
          <Button type="button" onClick={() => open()}>
            Upload Image
          </Button>
        )}
      </CldUploadWidget>

      <input
        type="text"
        name="avatar.alt"
        value={formData.avatar?.alt || ""}
        onChange={(e) => onImageChange("alt", e.target.value)}
        className="flex-1 h-10 px-3 py-2 border text-sm border-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
        placeholder="Image alt text"
      />
    </div>
    {formData.avatar?.url && (
      <div className="mt-3">
        <CldImage
          src={formData.avatar.url}
          alt={formData.avatar.alt || "Preview"}
          width={200}
          height={200}
          crop="fill"
          gravity="auto"
          quality="auto"
          format="avif"
          className="w-20 h-20 object-cover border border-gray-200 rounded-full"
        />
      </div>
    )}
  </div>
);

interface StatusFieldProps {
  isActive: boolean;
  onChange: (value: boolean) => void;
}

const StatusField: React.FC<StatusFieldProps> = ({ isActive, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-2">Status</label>
    <div className="flex items-center gap-4">
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="isActive"
          checked={isActive}
          onChange={() => onChange(true)}
          className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
        />
        <span className="ml-2">Active</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="isActive"
          checked={!isActive}
          onChange={() => onChange(false)}
          className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
        />
        <span className="ml-2">Inactive</span>
      </label>
    </div>
  </div>
);

interface OrderFieldProps {
  order: number;
  onChange: (value: number) => void;
}

const OrderField: React.FC<OrderFieldProps> = ({ order, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-2">Display Order</label>
    <input
      type="number"
      value={order}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
      min="0"
    />
  </div>
);
