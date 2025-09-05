import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { X } from "lucide-react";
import { Button } from "@/components/button";

interface ImageUploadFieldProps {
  images: Array<{ url: string; alt: string }>;
  onImageChange: (images: Array<{ url: string; alt: string }>) => void;
  error?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  images,
  onImageChange,
  error,
}) => {
  const [uploadQueue, setUploadQueue] = useState<
    Array<{ url: string; alt: string }>
  >([]);

  // Process the upload queue whenever it changes
  useEffect(() => {
    if (uploadQueue.length > 0) {
      onImageChange([...images, ...uploadQueue]);
      setUploadQueue([]);
    }
  }, [uploadQueue, images, onImageChange]);

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset="products"
        options={{
          sources: ["local", "url", "camera"],
          resourceType: "image",
          multiple: true,
          maxFiles: 10,
        }}
        onSuccess={(result: any) => {
          if (result.info) {
            const newImage = {
              url: result.info.secure_url,
              alt: result.info.original_filename || "Product image",
            };

            // Add to queue instead of directly updating state
            setUploadQueue((prev) => [...prev, newImage]);
          }
        }}
        onClose={() => {
          // Process any remaining images when widget closes
          if (uploadQueue.length > 0) {
            onImageChange([...images, ...uploadQueue]);
            setUploadQueue([]);
          }
        }}
      >
        {({ open }) => (
          <Button type="button" onClick={() => open()}>
            Upload Images
          </Button>
        )}
      </CldUploadWidget>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={`${image.url}-${index}`} className="relative">
              <CldImage
                src={image.url}
                alt={image.alt}
                width={200}
                height={200}
                crop="fill"
                gravity="auto"
                quality="auto"
                format="avif"
                className="w-full h-64 object-cover border border-gray-200"
              />
              <button
                type="button"
                onClick={() =>
                  onImageChange(images.filter((_, i) => i !== index))
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
