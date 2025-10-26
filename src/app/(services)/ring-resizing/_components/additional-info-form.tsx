import { Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

interface AdditionalInfoFormProps {
  formData: {
    hasInscription: boolean;
    inscriptionText: string;
    notes: string;
    images: string[];
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageUpload: (result: any) => void;
}

export const AdditionalInfoForm = ({
  formData,
  onInputChange,
  onImageUpload,
}: AdditionalInfoFormProps) => {
  return (
    <div className="space-y-8">
      {/* Inscription Details */}
      <div className="bg-white border border-primary-100 shadow-md rounded-sm overflow-hidden">
        <div className="flex items-center justify-center space-x-3 my-6">
          <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
            Inscription Details
          </h2>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="hasInscription"
                checked={formData.hasInscription}
                onChange={onInputChange}
                className="w-5 h-5 text-primary-600 border border-slate-300"
              />
              <label className="ml-3 text-sm font-medium text-slate-700">
                This ring has an inscription that needs to be preserved
              </label>
            </div>

            {formData.hasInscription && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Inscription Text
                </label>
                <input
                  type="text"
                  name="inscriptionText"
                  value={formData.inscriptionText}
                  onChange={onInputChange}
                  className="w-full px-4 py-3 border rounded-sm border-slate-300"
                  placeholder="Enter the exact inscription text"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white border border-primary-100 shadow-md rounded-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center space-x-3 my-6">
          <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
            Ring Photos
          </h2>
          <p className="text-primary-400 text-sm mt-1">
            Upload clear photos of your ring
          </p>
        </div>
        <div className="p-8">
          <div className="border-2 border-dashed border-slate-300 p-8 text-center hover:border-primary-500 transition-colors">
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">
              Drag & drop images or click to browse
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Helps us provide accurate assessment (optional)
            </p>
            <CldUploadWidget
              uploadPreset="ring-resizing"
              options={{
                sources: ["local", "url", "camera"],
                resourceType: "image",
                multiple: true,
                maxFiles: 5,
              }}
              onSuccess={onImageUpload}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="inline-block bg-primary-100 text-primary-700 px-6 py-2 hover:bg-primary-200 cursor-pointer transition-colors rounded-sm"
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

      {/* Additional Notes */}
      <div className="bg-white border border-primary-100 shadow-md rounded-sm overflow-hidden">
        <div className="flex items-center justify-center space-x-3 my-6">
          <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
            Additional Information
          </h2>
        </div>
        <div className="p-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Special Instructions or Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={onInputChange}
              rows={4}
              className="w-full px-4 py-3 border rounded-sm border-slate-300"
              placeholder="Any special requests, concerns, or additional information about your ring..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
