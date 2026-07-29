"use client";

import { useState } from "react";

import { ChevronDown, ChevronUp, GripVertical, Minus, Plus, Trash2 } from "lucide-react";

import { ImageUploadField } from "./ImageUploadField";

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
  const updateQuantity = (quantity: number) => {
    const nextQuantity = Math.max(0, quantity);

    onVariantChange(index, "inventory", {
      ...variant.inventory,
      quantity: nextQuantity,
      inStock: nextQuantity > 0 ? variant.inventory.inStock : false,
    });
  };

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
              <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm shrink-0">
                In Stock
              </span>
            ) : (
              <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded-sm shrink-0">
                Out of Stock
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500 truncate">{variant.sku || "No SKU"}</span>
            {hasPrice && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-xs font-medium text-secondary-600">
                  {variant.currency === "USD" ? "$" : "₦"}
                  {variant.price.toLocaleString()}
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
          <button type="button" onClick={onRemove} className="text-red-400 hover:text-red-600 p-1">
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

            <div className="min-w-0">
              <label className="block text-xs font-medium text-gray-600 mb-1">Price *</label>
              <div className="flex gap-1">
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) => onVariantChange(index, "price", Number(e.target.value))}
                  min="0"
                  step="0.01"
                  className="min-w-0 flex-1 p-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
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

            <div className="min-w-0">
              <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
              <div className="flex h-[38px] overflow-hidden border border-gray-300 focus-within:border-primary-300 focus-within:ring-1 focus-within:ring-primary-300">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => updateQuantity(variant.inventory.quantity - 1)}
                  disabled={variant.inventory.quantity === 0}
                  className="grid w-9 shrink-0 place-items-center border-r border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:text-gray-300"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <input
                  type="number"
                  value={variant.inventory.quantity}
                  onChange={(e) => updateQuantity(Number(e.target.value))}
                  min="0"
                  step="1"
                  placeholder="0"
                  aria-label="Variant quantity"
                  className="min-w-0 flex-1 appearance-none border-0 px-2 text-center text-sm font-medium text-gray-800 focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => updateQuantity(variant.inventory.quantity + 1)}
                  className="grid w-9 shrink-0 place-items-center border-l border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">Available for sale</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={variant.inventory.inStock}
                    disabled={variant.inventory.quantity === 0}
                    onChange={(e) =>
                      onVariantChange(index, "inventory", {
                        ...variant.inventory,
                        inStock: e.target.checked,
                      })
                    }
                    className="peer sr-only"
                  />
                  <span
                    className="h-5 w-9 rounded-full bg-gray-200 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-green-500 peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-300 peer-focus-visible:ring-offset-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    aria-hidden="true"
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Variant Images *</label>
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
