"use client";

import { ChevronDown, Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

interface ItemDetailsFormProps {
  formData: {
    itemType: string;
    brand: string;
    metalType: string;
    karat: string;
    purchaseDate: string;
    purchaseLocation: string;
    description: string;
    serialNumber: string;
    estimatedValue: string;
    images: string[];
  };
  errors?: {
    itemType?: string;
    metalType?: string;
    karat?: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const ItemDetailsForm = ({
  formData,
  errors,
  onInputChange,
}: ItemDetailsFormProps) => {
  const onFileUpload = (result: any) => {
    if (result.info && result.info.secure_url) {
      onInputChange(
        "images",
        [...formData.images, result.info.secure_url].join(",")
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white border border-primary-100 shadow-md overflow-hidden">
        <div className="flex items-center justify-center space-x-3 my-6">
          <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
            Item Information
          </h2>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Item Type *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.itemType}
                  onChange={(e) => onInputChange("itemType", e.target.value)}
                  className={`w-full px-4 py-3 border border-slate-300 appearance-none ${
                    errors?.itemType ? "border-red-300" : "border-slate-300"
                  }`}
                >
                  <option value="">Select item type</option>
                  <option value="ring">Ring</option>
                  <option value="necklace">Necklace</option>
                  <option value="necklace">Pendant</option>
                  <option value="bracelet">Bracelet</option>
                  <option value="bracelet">Bangle</option>
                  <option value="earrings">Earrings</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              {errors?.itemType && (
                <p className="text-red-500 text-sm mt-1">{errors.itemType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Metal Type *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.metalType}
                  onChange={(e) => onInputChange("metalType", e.target.value)}
                  className={`w-full px-4 py-3 border border-slate-300 appearance-none ${
                    errors?.metalType ? "border-red-300" : "border-slate-300"
                  }`}
                >
                  <option value="">Select metal type</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="platinum">Platinum</option>
                  <option value="none">None</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              {errors?.metalType && (
                <p className="text-red-500 text-sm mt-1">{errors.metalType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Karat *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.karat}
                  onChange={(e) => onInputChange("karat", e.target.value)}
                  className={`w-full px-4 py-3 border border-slate-300 appearance-none ${
                    errors?.karat ? "border-red-300" : "border-slate-300"
                  }`}
                >
                  <option value="">Select karat</option>
                  <option value="22k">22K</option>
                  <option value="18k">18K</option>
                  <option value="14k">14K</option>
                  <option value="10k">10K</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              {errors?.karat && (
                <p className="text-red-500 text-sm mt-1">{errors.karat}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Photos Section */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Item Photos (Optional)
        </label>
        <div className="border-2 border-dashed border-slate-300 p-6 text-center hover:border-secondary-500 transition-colors">
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600 mb-2">
            Drag & drop images or click to browse
          </p>
          <CldUploadWidget
            uploadPreset="maintenance-repairs"
            options={{
              sources: ["local", "url", "camera"],
              resourceType: "image",
              multiple: true,
              maxFiles: 5,
            }}
            onSuccess={onFileUpload}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="inline-block px-4 py-2 bg-secondary-500 text-white cursor-pointer hover:bg-secondary-400 transition-colors rounded-sm"
              >
                Choose Files
              </button>
            )}
          </CldUploadWidget>
          {formData.images.length > 0 && (
            <div className="mt-4 text-left">
              <p className="text-sm text-slate-600 mb-2">Uploaded files:</p>
              {formData.images.map((url, index) => (
                <p key={index} className="text-sm text-slate-800">
                  Image {index + 1}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
