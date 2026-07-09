"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
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
import { AdminModal } from "../../products/_components/_elements/admin-modal";

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

  const formTitle = collection ? "Edit Collection" : "New Collection";
  const isPending = createMutation.isPending || updateMutation.isPending;

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

      <AdminModal
        title={formTitle}
        onClose={onClose}
        confirmText={collection ? "Update Collection" : "Create Collection"}
        confirmLoading={isPending}
        onConfirm={() => {
          const form = document.querySelector("#collection-form") as HTMLFormElement;
          form?.requestSubmit();
        }}
      >
        <form id="collection-form" onSubmit={handleSubmit} className="space-y-5">
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
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-1.5">
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
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-1.5">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full p-3 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
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
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-1.5">
      Featured Image *
    </label>
    <div className="flex flex-col sm:flex-row gap-2">
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
        className="flex-1 h-10 px-3 py-2 border text-sm border-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
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
          className="w-full h-40 object-cover border border-gray-200"
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
  <div>
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      Should this collection appear on the collections page for customers?
    </label>
    <div className="flex items-center gap-4">
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