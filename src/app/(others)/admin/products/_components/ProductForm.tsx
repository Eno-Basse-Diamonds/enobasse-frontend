"use client";

import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { useAdminCollections } from "@/modules/collections/hooks";
import { Collection } from "@/modules/collections/types";
import { useCreateProduct, useUpdateProduct } from "@/modules/products/hooks";
import { Gemstone, Metal, Product, ProductStatus, ProductVariant } from "@/modules/products/types";
import { getExchangeRate } from "@/shared/utils/exchangeRate";
import { Alert } from "@/shared/components/Alert";
import { Button } from "@/shared/components/Button";
import { textToSlug } from "@/shared/utils/string";

import { AdminModal } from "./_elements/AdminModal";
import { CollectionsMultiSelect } from "./_elements/CollectionsMultiSelect";
import { FormField } from "./_elements/FormField";
import { ImageUploadField } from "./_elements/ImageUploadField";
import { MetalsGemstonesSelector } from "./_elements/MetalsGemstoneSelector";
import { VariantCard } from "./_elements/VariantCard";

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

const PRODUCT_CATEGORIES = ["Rings", "Earrings", "Bracelets", "Necklaces"];

const TABS = [
  { key: "basic", label: "Basic Info" },
  { key: "media", label: "Media" },
  { key: "materials", label: "Materials" },
  { key: "variants", label: "Variants" },
  { key: "options", label: "Options" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

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
  status: ProductStatus;
}

const defaultVariant = {
  sku: "",
  title: "",
  price: 0,
  currency: "USD",
  gemstones: [],
  metals: [],
  inventory: { quantity: 1, inStock: true },
  images: [],
};

export function ProductForm({ product, onClose }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("basic");
  const [formData, setFormData] = useState<ProductFormData>({
    sku: product?.variants?.[0]?.sku || "",
    name: product?.name || "",
    category: product?.category || "Rings",
    collections: product?.collections?.map((c: Collection) => c.id) || [],
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
      inventory: v.inventory ?? { quantity: 0, inStock: false },
      images: v.images,
    })) || [{ ...defaultVariant }],
    isCustomDesign: product?.isCustomDesign || false,
    status: product?.status || "published",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });
  const [exchangeRate, setExchangeRate] = useState<number>(1540);

  useEffect(() => {
    const fetchRate = async () => {
      const rate = await getExchangeRate();
      setExchangeRate(rate);
    };
    fetchRate();
  }, []);

  const { data: collectionsResponse } = useAdminCollections({
    page: 1,
    pageSize: 100,
  });
  const collectionsData = (collectionsResponse?.collections || []).map((c: Collection) => ({
    id: c.id,
    name: c.name,
  }));

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const handleInputChange = (
    field: keyof ProductFormData,
    value:
      | string
      | boolean
      | string[]
      | ProductFormData["metals"]
      | ProductFormData["gemstones"]
      | ProductFormData["images"]
      | ProductFormData["variants"],
  ) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "name") {
        newData.slug = textToSlug(value as string);
      }
      return newData;
    });
  };

  const handleVariantChange = (index: number, field: string, value: string | number | boolean) => {
    setFormData((prev) => {
      const variants = prev.variants.map((variant, i) => {
        if (i !== index) return variant;

        if (field === "currency" && typeof value === "string" && value !== variant.currency) {
          let newPrice = variant.price;
          if (variant.price > 0) {
            if (variant.currency === "USD" && value === "NGN") {
              newPrice = Math.ceil(variant.price * exchangeRate);
            } else if (variant.currency === "NGN" && value === "USD") {
              newPrice = Math.ceil(variant.price / exchangeRate);
            }
          }
          return { ...variant, currency: value, price: newPrice };
        }

        return { ...variant, [field]: value };
      });
      return { ...prev, variants: variants as ProductFormData["variants"] };
    });
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...defaultVariant }],
    }));
    setActiveTab("variants");
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
    value: Array<{ url: string; alt: string }>,
  ) => {
    if (field === "images") {
      setFormData((prev) => ({ ...prev, images: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.map((variant, i) =>
          i === index ? { ...variant, images: value } : variant,
        ),
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.slug.trim()) newErrors.slug = "Product slug is required";
    if (!formData.description.trim()) newErrors.description = "Product description is required";
    if (formData.images.length === 0) newErrors.images = "At least one product image is required";
    if (formData.variants.length === 0)
      newErrors.variants = "At least one product variant is required";
    if (formData.collections.length === 0)
      newErrors.collections = "At least one collection is required";

    formData.variants.forEach((variant, index) => {
      if (!variant.sku.trim()) newErrors[`variant-${index}-sku`] = "Variant SKU is required";
      if (!variant.title.trim()) newErrors[`variant-${index}-title`] = "Variant title is required";
      if (variant.price <= 0)
        newErrors[`variant-${index}-price`] = "Variant price must be greater than 0";
      if (variant.images.length === 0)
        newErrors[`variant-${index}-images`] = "At least one variant image is required";
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name || newErrors.slug || newErrors.description || newErrors.collections)
        setActiveTab("basic");
      else if (newErrors.images) setActiveTab("media");
      else if (newErrors.variants || Object.keys(newErrors).some((k) => k.startsWith("variant-")))
        setActiveTab("variants");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent | null, status: ProductStatus = "published") => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    const prices = formData.variants.map((v) => v.price).filter((p) => p > 0);
    const priceRange = {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
      currency: formData.variants[0]?.currency || "USD",
    };

    const submitData = { ...formData, status, priceRange };

    const mutate = product ? updateMutation : createMutation;
    const payload = product ? { id: product.id as string, data: submitData } : submitData;

    mutate.mutate(payload as any, {
      onSuccess: () => {
        const action = product
          ? status === "draft"
            ? "saved as draft"
            : "updated"
          : status === "draft"
            ? "saved as draft"
            : "created";
        setAlertState({
          visible: true,
          type: "success",
          message: `Product ${action} successfully!`,
        });
        setTimeout(() => onClose(), 1500);
      },
      onError: (error: any) => {
        setAlertState({
          visible: true,
          type: "error",
          message: error.message || "Failed to save product",
        });
      },
    });
  };

  const dismissAlert = () => setAlertState((prev) => ({ ...prev, visible: false }));

  const isDraft = product?.status === "draft";
  const formTitle = product ? "Edit Product" : "New Product";
  const saveDraftText = isDraft ? "Save Draft" : "Save as Draft";
  const submitText = product ? (isDraft ? "Publish" : "Update") : "Create Product";
  const isPending = createMutation.isPending || updateMutation.isPending;

  const tabHasErrors = (tab: TabKey) => {
    if (tab === "basic")
      return !!errors.name || !!errors.slug || !!errors.description || !!errors.collections;
    if (tab === "media") return !!errors.images;
    if (tab === "variants")
      return (
        !!errors.variants ||
        formData.variants.some(
          (_, i) =>
            errors[`variant-${i}-sku`] ||
            errors[`variant-${i}-title`] ||
            errors[`variant-${i}-price`] ||
            errors[`variant-${i}-images`],
        )
      );
    return false;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold text-primary-500 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <FormField
                    label="Product Name *"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name..."
                    error={errors?.name}
                  />
                </div>

                <FormField
                  label="Slug *"
                  name="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="product-slug"
                  error={errors?.slug}
                />

                <FormField
                  label="Base SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  placeholder="Enter product SKU..."
                  error={errors?.sku}
                />

                <div>
                  <label className="block text-sm font-semibold text-primary-400 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
                  >
                    {PRODUCT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <CollectionsMultiSelect
                  collections={collectionsData}
                  selectedIds={formData.collections}
                  onChange={(ids) => handleInputChange("collections", ids)}
                  error={errors?.collections}
                />

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-primary-400 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={8}
                    placeholder="Enter product description..."
                    className="w-full p-3 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
                  />
                  {errors?.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "media":
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold text-primary-500 mb-4">Product Images *</h4>
              <p className="text-sm text-gray-500 mb-4">
                Upload product images. First image will be used as the cover.
              </p>
              <ImageUploadField
                images={formData.images}
                onImageChange={(images) => handleInputChange("images", images)}
                error={errors?.images}
              />
            </div>
          </div>
        );

      case "materials":
        return (
          <div className="space-y-6">
            <MetalsGemstonesSelector
              selectedMetals={formData.metals || []}
              selectedGemstones={formData.gemstones || []}
              onMetalsChange={(metals) => handleInputChange("metals", metals)}
              onGemstonesChange={(GEMSTONES) => handleInputChange("gemstones", GEMSTONES)}
            />
          </div>
        );

      case "variants":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-semibold text-primary-500">Product Variants *</h4>
                <p className="text-sm text-gray-500">
                  Define different variations (size, color, etc.)
                </p>
              </div>
              <Button type="button" size="sm" leadingIcon={<Plus />} onClick={addVariant}>
                Add Variant
              </Button>
            </div>

            {errors?.variants && <p className="text-red-500 text-sm">{errors.variants}</p>}

            <div className="space-y-3">
              {formData.variants.map((variant, index) => (
                <VariantCard
                  key={index}
                  variant={variant}
                  index={index}
                  onVariantChange={handleVariantChange}
                  onImageChange={(images) => handleImageChange("variants", index, images)}
                  onRemove={() => removeVariant(index)}
                  canRemove={formData.variants.length > 1}
                  errors={errors}
                />
              ))}
            </div>
          </div>
        );

      case "options":
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold text-primary-500 mb-4">
                Custom Design Options
              </h4>
              <label className="inline-flex items-center gap-3 p-4 border border-gray-200 rounded-sm cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.isCustomDesign}
                  onChange={(e) => handleInputChange("isCustomDesign", e.target.checked)}
                  className="h-5 w-5 text-primary-500 focus:ring-primary-300"
                />
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    This is a custom design product
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Custom design products allow customers to personalize their jewelry
                  </p>
                </div>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {alertState.visible && (
        <div className="fixed top-4 right-4 max-w-md w-full z-[9999]">
          <Alert type={alertState.type} className="mb-6" dismissible onDismiss={dismissAlert}>
            {alertState.message}
          </Alert>
        </div>
      )}

      <AdminModal
        title={formTitle}
        onClose={onClose}
        footer={
          <>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              loading={isPending}
              disabled={isPending}
              onClick={() => handleSubmit(null, "draft")}
            >
              {saveDraftText}
            </Button>
            <Button
              type="submit"
              loading={isPending}
              disabled={isPending}
              onClick={(e: any) => handleSubmit(e, "published")}
            >
              {submitText}
            </Button>
          </>
        }
      >
        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-gray-200 mb-6 -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-x-auto">
          {TABS.map((tab) => {
            const hasErr = tabHasErrors(tab.key);
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {hasErr && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {renderTabContent()}
      </AdminModal>
    </>
  );
}
