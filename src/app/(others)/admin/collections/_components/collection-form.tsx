"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Collection } from "@/lib/types/collections";
import {
  useCreateCollection,
  useUpdateCollection,
} from "@/lib/hooks/use-collections";
import { textToSlug } from "@/lib/utils/string";
import {
  CollectionFormSchema,
  CollectionFormData,
} from "@/lib/validations/collections";

interface CollectionFormProps {
  collection: Collection | null;
  onClose: () => void;
}

interface FormErrors {
  name?: string[];
  slug?: string[];
  description?: string[];
  image?: string[];
}

export function CollectionForm({ collection, onClose }: CollectionFormProps) {
  const [formData, setFormData] = useState<CollectionFormData>({
    name: collection?.name || "",
    slug: collection?.slug || "",
    description: collection?.description || "",
    published: collection?.published || false,
    image: collection?.image || { url: "", alt: "" },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const createMutation = useCreateCollection();
  const updateMutation = useUpdateCollection();

  const handleInputChange = (field: keyof CollectionFormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "name") {
        newData.slug = textToSlug(value);
      }
      return newData;
    });
  };

  const handleImageChange = (
    field: keyof typeof formData.image,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      image: { ...prev.image, [field]: value },
    }));
  };

  const validateForm = (): boolean => {
    const validationResult = CollectionFormSchema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(validationResult.error.flatten().fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (collection) {
      updateMutation.mutate(
        { id: collection.id, data: formData },
        {
          onSuccess: () => {
            setAlertState({
              visible: true,
              type: "success",
              message: "Collection updated successfully!",
            });
            setTimeout(() => onClose(), 1500);
          },
          onError: (error) => {
            setAlertState({
              visible: true,
              type: "error",
              message: error.message || "Failed to update collection",
            });
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setAlertState({
            visible: true,
            type: "success",
            message: "Collection created successfully!",
          });
          setTimeout(() => onClose(), 1500);
        },
        onError: (error) => {
          setAlertState({
            visible: true,
            type: "error",
            message: error.message || "Failed to create collection",
          });
        },
      });
    }
  };

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  const formTitle = collection ? "Edit Collection" : "Create New Collection";
  const submitButtonText = collection ? "Update" : "Create";
  const isFormValid = Boolean(
    !createMutation.isPending &&
      !updateMutation.isPending &&
      formData.name.trim() &&
      formData.slug.trim() &&
      formData.description.trim() &&
      formData.image.url
  );

  return (
    <>
      {alertState.visible && (
        <div className="fixed top-4 right-4 max-w-md w-full z-[9999]">
          <Alert
            type={alertState.type}
            className="mb-6"
            dismissible
            onDismiss={dismissAlert}
          >
            {alertState.message}
          </Alert>
        </div>
      )}

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-4xl h-full flex flex-col shadow-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-primary-500/10 bg-gray-50">
            <h3 className="text-2xl font-semibold text-primary-500">
              {formTitle}
            </h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="rounded-full w-8 h-8"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              <FormField
                label="Collection Name *"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter collection name..."
                error={errors?.name?.[0]}
              />

              <FormField
                label="Slug *"
                name="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="collection-slug"
                error={errors?.slug?.[0]}
              />

              <FormTextareaField
                label="Description *"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                placeholder="Enter collection description..."
                error={errors?.description?.[0]}
              />

              <ImageUploadField
                formData={formData}
                errors={errors}
                onImageChange={handleImageChange}
              />

              <StatusField
                published={formData.published}
                onChange={(value) => handleInputChange("published", value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={createMutation.isPending || updateMutation.isPending}
              disabled={!isFormValid}
            >
              <span>{submitButtonText} Collection</span>
            </Button>
          </div>
        </form>
      </div>
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
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div className="block">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
      placeholder={placeholder}
    />
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
}

const FormTextareaField: React.FC<FormTextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
  error,
}) => (
  <div className="block">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full p-4 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const ImageUploadField = ({
  formData,
  errors,
  onImageChange,
}: {
  formData: CollectionFormData;
  errors: FormErrors;
  onImageChange: (field: keyof typeof formData.image, value: string) => void;
}) => (
  <div className="image-upload">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      Featured Image *
    </label>
    <div className="flex flex-row gap-2 items-center">
      <CldUploadWidget
        uploadPreset="collections"
        options={{
          sources: ["local", "url", "camera"],
          resourceType: "image",
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result: any) => {
          if (result.info) {
            onImageChange("url", result.info.secure_url);
            onImageChange("alt", formData.name || "Collection featured image");
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
        name="image.alt"
        value={formData.image.alt}
        onChange={(e) => onImageChange("alt", e.target.value)}
        className="h-10 px-3 py-2 border text-sm border-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
        placeholder="Image alt text"
      />
    </div>
    {formData.image.url && (
      <div className="mt-3">
        <CldImage
          src={formData.image.url}
          alt={formData.image.alt || "Preview"}
          width={800}
          height={400}
          crop="fill"
          gravity="auto"
          quality="auto"
          format="avif"
          className="w-full h-48 object-cover border border-gray-200"
        />
      </div>
    )}
    {errors?.image && (
      <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
    )}
  </div>
);

interface StatusFieldProps {
  published: boolean;
  onChange: (value: boolean) => void;
}

const StatusField: React.FC<StatusFieldProps> = ({ published, onChange }) => (
  <div className="status-field">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      Should this collection appear on the collections page for customers?
    </label>
    <div className="flex items-center space-x-4">
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="published"
          checked={published}
          onChange={() => onChange(true)}
          className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
        />
        <span className="ml-2 flex items-center">
          <Eye className="w-4 h-4 mr-1" />
          Yes
        </span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="published"
          checked={!published}
          onChange={() => onChange(false)}
          className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
        />
        <span className="ml-2 flex items-center">
          <EyeOff className="w-4 h-4 mr-1" />
          No
        </span>
      </label>
    </div>
  </div>
);
