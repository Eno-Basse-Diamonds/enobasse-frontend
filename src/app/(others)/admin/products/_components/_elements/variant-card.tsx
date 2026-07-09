"use client";

import { Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/button";
import { ImageUploadField } from "./image-upload-field";
import { useState } from "react";

interface Variant {
  sku: string;
  title: string;
  price: number;
  currency: string;
  gemstones?: Array<{ type: string; weightCarat?: string }>;
  metals?: Array<{ type: string; purity?: string; weightGrams?: string }>;
  inventory: { quantity: number; inStock: boolean };
  images: Array<{ url: string; alt: string }>;
}

interface VariantCardProps {
  variant: Variant;
  index: number;
  onVariantChange: (index: number, field: string, value: any) => void;
  onImageChange: (images: Array<{ url: string; alt: string }>) => void;
  onRemove: () => void;
  canRemove: boolean;
  errors: Record<string, string>;
}

export function VariantCard({
  variant,
  index,
  onVariantChange,
  onImageChange,
  onRemove,
  canRemove,
  errors,
}: VariantCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasPrice = variant.price > 0;

  return (
    <div className="border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <GripVertical className="w-4 h-4 text-gray-400 shrink-0 cursor-grab" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-sm shrink-0">
              #{index + 1}
            </span>
            <span className="text-sm font-medium text-gray-800 truncate">
              {variant.title || `New Variant`}
            </span>
            {variant.inventory.inStock ? (
              <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm shrink-0">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded-sm shrink-0">Out of Stock</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500 truncate">{variant.sku || "No SKU"}</span>
            {hasPrice && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-xs font-medium text-secondary-600">
                  {variant.currency === "USD" ? "$" : "₦"}{variant.price.toLocaleString()}
                </span>
              </>
            )}
            <span className="text-gray-300">|</span>
            <span className="text-xs text-gray-500">Qty: {variant.inventory.quantity}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-gray-700 p-1"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-400 hover:text-red-600 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {expanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
              <input
                type="text"
                value={variant.title}
                onChange={(e) => onVariantChange(index, "title", e.target.value)}
                placeholder="e.g. Gold 18K Size 7"
                className="w-full p-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
              />
              {errors[`variant-${index}-title`] && (
                <p className="text-red-500 text-xs mt-0.5">{errors[`variant-${index}-title`]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">SKU *</label>
              <input
                type="text"
                value={variant.sku}
                onChange={(e) => onVariantChange(index, "sku", e.target.value)}
                placeholder="e.g. GR-001-G"
                className="w-full p-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
              />
              {errors[`variant-${index}-sku`] && (
                <p className="text-red-500 text-xs mt-0.5">{errors[`variant-${index}-sku`]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Price *</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) => onVariantChange(index, "price", Number(e.target.value))}
                  min="0"
                  step="0.01"
                  className="flex-1 p-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
                />
                <select
                  value={variant.currency}
                  onChange={(e) => onVariantChange(index, "currency", e.target.value)}
                  className="w-20 p-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
                >
                  <option value="USD">USD</option>
                  <option value="NGN">NGN</option>
                </select>
              </div>
              {errors[`variant-${index}-price`] && (
                <p className="text-red-500 text-xs mt-0.5">{errors[`variant-${index}-price`]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={variant.inventory.quantity}
                  onChange={(e) =>
                    onVariantChange(index, "inventory", {
                      ...variant.inventory,
                      quantity: Number(e.target.value),
                    })
                  }
                  min="0"
                  className="flex-1 p-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
                />
                <label className="flex items-center gap-1.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={variant.inventory.inStock}
                    onChange={(e) =>
                      onVariantChange(index, "inventory", {
                        ...variant.inventory,
                        inStock: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-primary-500 focus:ring-primary-300"
                  />
                  <span className="text-xs text-gray-600">In Stock</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Variant Images *
            </label>
            <ImageUploadField
              images={variant.images}
              onImageChange={onImageChange}
              error={errors[`variant-${index}-images`]}
            />
          </div>
        </div>
      )}
    </div>
  );
}