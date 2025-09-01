import Image from "next/image";
import { Edit, Trash2, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components";
import { Collection } from "@/lib/types/collections";
import { useState, memo } from "react";

interface CollectionListProps {
  collections: Collection[];
  onEdit: (collection: Collection) => void;
  onDelete: (id: string) => void;
}

export const CollectionList = memo(function CollectionList({
  collections,
  onEdit,
  onDelete,
}: CollectionListProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="bg-white shadow overflow-hidden hover:shadow-md transition-all duration-300 border border-primary-500/10 flex flex-col h-full"
        >
          <div className="h-48 bg-primary-500/10 relative overflow-hidden">
            {collection.image?.url && !imageErrors[collection.id] ? (
              <Image
                src={collection.image.url}
                alt={collection.image.alt || collection.name}
                fill
                sizes="50vw"
                className="object-cover"
                onError={() => handleImageError(collection.id)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <div className="absolute top-3 right-3 flex gap-2">
              <div
                className={`px-3 py-1 text-xs font-semibold ${
                  collection.published
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                }`}
              >
                {collection.published ? (
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    Published
                  </span>
                ) : (
                  <span className="flex items-center">
                    <EyeOff className="w-3 h-3 mr-1" />
                    Unlisted
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex-grow">
              <h3 className="font-bold font-primary text-lg mb-2 text-primary-500 line-clamp-2">
                {collection.name}
              </h3>
              <p className="text-primary-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                {collection.description}
              </p>
              <div className="text-sm text-secondary-500 mb-6">
                {collection.productCount || 0}{" "}
                <span className="font-medium">Products</span>
              </div>
            </div>
            <div className="flex space-x-3 w-full">
              <Button
                leadingIcon={<Edit />}
                onClick={() => onEdit(collection)}
                className="w-full"
              >
                <span>Edit</span>
              </Button>
              <Button
                variant="outline"
                leadingIcon={<Trash2 />}
                onClick={() => onDelete(collection.id)}
                className="w-full"
              >
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
