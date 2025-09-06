import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/button";
import { FormField } from "./form-field";
import { ImageUploadField } from "./image-upload-field";

interface VariantFormProps {
  variant: any;
  index: number;
  onVariantChange: (index: number, field: string, value: any) => void;
  onImageChange: (images: Array<{ url: string; alt: string }>) => void;
  onRemove: () => void;
  canRemove: boolean;
  errors: Record<string, string>;
}

export const VariantForm: React.FC<VariantFormProps> = ({
  variant,
  index,
  onVariantChange,
  onImageChange,
  onRemove,
  canRemove,
  errors,
}) => (
  <div className="border border-gray-200 p-6 bg-gray-50">
    <div className="flex items-center justify-between mb-4">
      <h5 className="text-md font-semibold text-primary-500">
        Variant {index + 1}
      </h5>
      {canRemove && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          leadingIcon={<Trash2 />}
          onClick={onRemove}
        >
          Remove
        </Button>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Variant Title *"
        name={`variant-${index}-title`}
        value={variant.title}
        onChange={(e) => onVariantChange(index, "title", e.target.value)}
        placeholder="Enter variant title..."
        error={errors[`variant-${index}-title`]}
      />

      <FormField
        label="Variant SKU *"
        name={`variant-${index}-sku`}
        value={variant.sku}
        onChange={(e) => onVariantChange(index, "sku", e.target.value)}
        placeholder="Enter variant SKU..."
        error={errors[`variant-${index}-sku`]}
      />

      <div>
        <label className="block text-sm font-semibold text-primary-400 mb-2">
          Price *
        </label>
        <input
          type="number"
          value={variant.price}
          onChange={(e) =>
            onVariantChange(index, "price", Number(e.target.value))
          }
          className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
          min="0"
          step="0.01"
        />
        {errors[`variant-${index}-price`] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[`variant-${index}-price`]}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-primary-400 mb-2">
          Currency
        </label>
        <select
          value={variant.currency}
          onChange={(e) => onVariantChange(index, "currency", e.target.value)}
          className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
        >
          <option value="USD">USD</option>
          <option value="NGN">NGN</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-primary-400 mb-2">
          Quantity
        </label>
        <input
          type="number"
          value={variant.inventory.quantity}
          onChange={(e) =>
            onVariantChange(index, "inventory", {
              ...variant.inventory,
              quantity: Number(e.target.value),
            })
          }
          className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
          min="0"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={variant.inventory.inStock}
            onChange={(e) =>
              onVariantChange(index, "inventory", {
                ...variant.inventory,
                inStock: e.target.checked,
              })
            }
            className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
          />
          <span className="ml-2">In Stock</span>
        </label>
      </div>
    </div>

    <div className="mt-6">
      <label className="block text-sm font-semibold text-primary-400 mb-2">
        Variant Images *
      </label>
      <ImageUploadField
        images={variant.images}
        onImageChange={onImageChange}
        error={errors[`variant-${index}-images`]}
      />
    </div>
  </div>
);
