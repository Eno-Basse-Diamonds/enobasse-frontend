import { Upload, ChevronDown } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

interface FormErrors {
  timeline?: string;
}

interface FinalDetailsFormProps {
  description: string;
  timeline: string;
  contactPreference: "email" | "phone";
  uploadedFiles: string[];
  errors: FormErrors;
  onDescriptionChange: (value: string) => void;
  onTimelineChange: (value: string) => void;
  onContactPreferenceChange: (value: "email" | "phone") => void;
  onFileUpload: (result: any) => void;
}

export const FinalDetailsForm = ({
  description,
  timeline,
  contactPreference,
  uploadedFiles,
  errors,
  onDescriptionChange,
  onTimelineChange,
  onContactPreferenceChange,
  onFileUpload,
}: FinalDetailsFormProps) => {
  return (
    <div className="bg-white shadow-md border border-primary-100 p-4 py-8 md:p-8 mb-8 rounded-sm">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
          Final Details
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Design Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Describe your vision in detail. Include any specific elements, inspirations, or requirements..."
            rows={5}
            className="w-full px-4 py-3 border rounded-sm border-slate-30 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Upload Inspiration Images (Optional)
          </label>
          <div className="border-2 border-dashed border-slate-300 p-6 text-center hover:border-secondary-500 transition-colors">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600 mb-2">
              Drag & drop images or click to browse
            </p>
            <CldUploadWidget
              uploadPreset="custom-designs"
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
                  className="rounded-sm inline-block px-4 py-2 bg-secondary-500 text-white cursor-pointer hover:bg-secondary-400 transition-colors"
                >
                  Choose Files
                </button>
              )}
            </CldUploadWidget>
            {uploadedFiles.length > 0 && (
              <div className="mt-4 text-left">
                <p className="text-sm text-slate-600 mb-2">Uploaded files:</p>
                {uploadedFiles.map((url, index) => (
                  <p key={index} className="text-sm text-slate-800">
                    Image {index + 1}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Preferred Timeline *
          </label>
          <div className="relative">
            <select
              value={timeline}
              onChange={(e) => onTimelineChange(e.target.value)}
              className={`w-full px-4 py-3 border rounded-sm ${
                errors.timeline ? "border-red-500" : "border-slate-300"
              } focus:border-transparent appearance-none bg-white`}
              required
            >
              <option value="">Select timeline</option>
              <option value="6-8 weeks">6-8 weeks (Standard)</option>
              <option value="4-6 weeks">4-6 weeks (Rush)</option>
              <option value="2-4 weeks">2-4 weeks (Priority Rush)</option>
              <option value="flexible">Flexible</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          {errors.timeline && (
            <p className="mt-1 text-sm text-red-500">{errors.timeline}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Preferred Contact Method
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="contactPreference"
                value="email"
                checked={contactPreference === "email"}
                onChange={(e) =>
                  onContactPreferenceChange(e.target.value as "email" | "phone")
                }
                className="text-amber-600 focus:ring-amber-500"
              />
              <span className="text-slate-700">Email</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="contactPreference"
                value="phone"
                checked={contactPreference === "phone"}
                onChange={(e) =>
                  onContactPreferenceChange(e.target.value as "email" | "phone")
                }
                className="text-amber-600 focus:ring-amber-500"
              />
              <span className="text-slate-700">Phone</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
