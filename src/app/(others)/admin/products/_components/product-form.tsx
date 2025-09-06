"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button, Alert } from "@/components";
import { Product, Gemstone, Metal, ProductVariant } from "@/lib/types/products";
import { useCreateProduct, useUpdateProduct } from "@/lib/hooks/use-products";
import { textToSlug } from "@/lib/utils/string";
import { useAdminCollections } from "@/lib/hooks/use-collections";
import { MetalsGemstonesSelector } from "./_elements/metals-gemstone-selector";
import { FormField } from './_elements/form-field';
import { FormTextareaField } from './_elements/form-textarea-field';
import { ImageUploadField } from './_elements/image-upload-field';
import { VariantForm } from './_elements/variant-form';
import { CollectionsSelector } from './_elements/collections-selector';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

const PRODUCT_CATEGORIES = ["Rings", "Earrings", "Wristwears", "Neckpieces"];

interface ProductFormData {
  sku: string;
  name: string;
  category: string;
  collections: string[];
  slug: string;
  description: string;
  priceRange: { min: number; max: number; currency: string };
  images: Array<{ url: string; alt: string }>;
  gemstones?: Array<{ type: string; weightCarat?: string }>;
  metals?: Array<{ type: string; purity?: string; weightGrams?: string }>;
  variants: Array<{
    sku: string;
    title: string;
    price: number;
    currency: string;
    gemstones?: Array<{ type: string; weightCarat?: string }>;
    metals?: Array<{ type: string; purity?: string; weightGrams?: string }>;
    inventory: { quantity: number; inStock: boolean };
    images: Array<{ url: string; alt: string }>;
  }>;
  isCustomDesign: boolean;
}

export function ProductForm({ product, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    sku: product?.variants?.[0]?.sku || "",
    name: product?.name || "",
    category: product?.category || "Rings",
    collections: product?.collections?.map((c: any) => c.id) || [],
    slug: product?.slug || "",
    description: product?.description || "",
    priceRange: product?.priceRange || { min: 0, max: 0, currency: "USD" },
    images: product?.images || [],
    gemstones:
      product?.gemstones?.map((g: Gemstone) => ({
        type: g.type,
        weightCarat: g.weightCarat,
      })) || [],
    metals:
      product?.metals?.map((m: Metal) => ({
        type: m.type,
        purity: m.purity ?? undefined,
        weightGrams: m.weightGrams,
      })) || [],
    variants: product?.variants?.map((v: ProductVariant) => ({
      sku: v.sku,
      title: v.title,
      price: v.price,
      currency: v.currency,
      gemstones:
        v.gemstones?.map((g: Gemstone) => ({
          type: g.type,
          weightCarat: g.weightCarat,
        })) || [],
      metals:
        v.metals?.map((m: Metal) => ({
          type: m.type,
          purity: m.purity ?? undefined,
          weightGrams: m.weightGrams,
        })) || [],
      inventory: { quantity: 1, inStock: true },
      images: v.images,
    })) || [
      {
        sku: "",
        title: "",
        price: 0,
        currency: "USD",
        gemstones: [],
        metals: [],
        inventory: { quantity: 1, inStock: true },
        images: [],
      },
    ],
    isCustomDesign: product?.isCustomDesign || false,

  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const { data: collectionsResponse } = useAdminCollections({
    page: 1,
    pageSize: 100,
  });
  const collectionsData = collectionsResponse?.collections;

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "name") {
        newData.slug = textToSlug(value);
      }
      return newData;
    });
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          sku: "",
          title: "",
          price: 0,
          currency: "USD",
          gemstones: [],
          metals: [],
          inventory: { quantity: 1, inStock: true },
          images: [],
        },
      ],
    }));
  };

  const removeVariant = (index: number) => {
    if (formData.variants.length > 1) {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index),
      }));
    }
  };

  const handleImageChange = (
    field: "images" | "variants",
    index: number,
    value: any
  ) => {
    if (field === "images") {
      setFormData((prev) => ({
        ...prev,
        images: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((variant, i) =>
          i === index ? { ...variant, images: value } : variant
        ),
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Product slug is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one product image is required";
    }

    if (formData.variants.length === 0) {
      newErrors.variants = "At least one product variant is required";
    }

    if (formData.collections.length === 0) {
      newErrors.collections = "At least one collection is required";
    }

    // Validate variants
    formData.variants.forEach((variant, index) => {
      if (!variant.sku.trim()) {
        newErrors[`variant-${index}-sku`] = "Variant SKU is required";
      }
      if (!variant.title.trim()) {
        newErrors[`variant-${index}-title`] = "Variant title is required";
      }
      if (variant.price <= 0) {
        newErrors[`variant-${index}-price`] =
          "Variant price must be greater than 0";
      }
      if (variant.images.length === 0) {
        newErrors[`variant-${index}-images`] =
          "At least one variant image is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Calculate price range from variants
    const prices = formData.variants.map((v) => v.price).filter((p) => p > 0);
    const priceRange = {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
      currency: formData.variants[0]?.currency || "USD",
    };

    const submitData = {
      ...formData,
      priceRange,
    };

    if (product) {
      updateMutation.mutate(
        { id: product.id as string, data: submitData },
        {
          onSuccess: () => {
            setAlertState({
              visible: true,
              type: "success",
              message: "Product updated successfully!",
            });
            setTimeout(() => onClose(), 1500);
          },
          onError: (error) => {
            setAlertState({
              visible: true,
              type: "error",
              message: error.message || "Failed to update product",
            });
          },
        }
      );
    } else {
      createMutation.mutate(submitData, {
        onSuccess: () => {
          setAlertState({
            visible: true,
            type: "success",
            message: "Product created successfully!",
          });
          setTimeout(() => onClose(), 1500);
        },
        onError: (error) => {
          setAlertState({
            visible: true,
            type: "error",
            message: error.message || "Failed to create product",
          });
        },
      });
    }
  };

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  const formTitle = product ? "Edit Product" : "Create New Product";
  const submitButtonText = product ? "Update" : "Create";
  const isFormValid = Boolean(
    !createMutation.isPending &&
      !updateMutation.isPending &&
      formData.name.trim() &&
      formData.description.trim() &&
      formData.images.length > 0 &&
      formData.variants.length > 0
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
          className="bg-white w-full max-w-7xl h-full flex flex-col shadow-2xl"
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
            <div className="space-y-8">
              {/* Basic Product Information */}
              <section>
                <h4 className="text-lg font-semibold text-primary-500 mb-4">
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Product Name *"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name..."
                    error={errors?.name}
                  />

                  <FormField
                    label="SKU *"
                    name="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    placeholder="Enter product SKU..."
                    error={errors?.sku}
                  />

                  <FormField
                    label="Slug *"
                    name="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="product-slug"
                    error={errors?.slug}
                  />

                  <div>
                    <label className="block text-sm font-semibold text-primary-400 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
                    >
                      {PRODUCT_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <section>
                    <CollectionsSelector
                      collections={collectionsData || []}
                      selectedCollections={formData.collections}
                      onCollectionsChange={(collections) =>
                        handleInputChange("collections", collections)
                      }
                    />
                  </section>

                  <FormTextareaField
                    label="Description *"
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={13}
                    placeholder="Enter product description..."
                    error={errors?.description}
                  />
                </div>
              </section>

              <MetalsGemstonesSelector
                selectedMetals={formData.metals || []}
                selectedGemstones={formData.gemstones || []}
                onMetalsChange={(metals) => handleInputChange("metals", metals)}
                onGemstonesChange={(gemstones) =>
                  handleInputChange("gemstones", gemstones)
                }
              />

              {/* Product Images */}
              <section>
                <h4 className="text-lg font-semibold text-primary-500 mb-4">
                  Product Images *
                </h4>
                <ImageUploadField
                  images={formData.images}
                  onImageChange={(images) =>
                    handleInputChange("images", images)
                  }
                  error={errors?.images}
                />
              </section>

              {/* Product Variants */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-primary-500">
                    Product Variants *
                  </h4>
                  <Button
                    type="button"
                    size="sm"
                    leadingIcon={<Plus />}
                    onClick={addVariant}
                  >
                    Add Variant
                  </Button>
                </div>

                <div className="space-y-6">
                  {formData.variants.map((variant, index) => (
                    <VariantForm
                      key={index}
                      variant={variant}
                      index={index}
                      onVariantChange={handleVariantChange}
                      onImageChange={(images) =>
                        handleImageChange("variants", index, images)
                      }
                      onRemove={() => removeVariant(index)}
                      canRemove={formData.variants.length > 1}
                      errors={errors}
                    />
                  ))}
                </div>
              </section>

              {/* Custom Design Options */}
              <section>
                <h4 className="text-lg font-semibold text-primary-500 mb-4">
                  Custom Design Options
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isCustomDesign}
                        onChange={(e) =>
                          handleInputChange("isCustomDesign", e.target.checked)
                        }
                        className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
                      />
                      <span className="ml-2">
                        This is a custom design product
                      </span>
                    </label>
                  </div>
                </div>
              </section>
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
              <span>{submitButtonText} Product</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
