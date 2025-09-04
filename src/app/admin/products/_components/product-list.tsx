import Image from "next/image";
import { Edit, Trash2, Image as ImageIcon, Package } from "lucide-react";
import { Button } from "@/components";
import { Product } from "@/lib/types/products";
import { useState, memo } from "react";
import { getCurrencySymbol } from "@/lib/utils/money";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductList = memo(function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow overflow-hidden hover:shadow-md transition-all duration-300 border border-primary-500/10 flex flex-col h-full"
        >
          <div className="h-48 bg-primary-500/10 relative overflow-hidden">
            {product.images?.[0]?.url && !imageErrors[product.id] ? (
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                fill
                sizes="50vw"
                className="object-cover"
                onError={() => handleImageError(product.id as string)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <div className="absolute top-3 left-3">
              <div className="px-3 py-1 text-xs font-semibold bg-primary-500 text-white">
                {product.category}
              </div>
            </div>
            <div className="absolute top-3 right-3">
              <div className="px-3 py-1 text-xs font-semibold bg-secondary-500 text-white">
                {product.variants?.length || 0} Variants
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex-grow">
              <h3 className="font-bold font-primary text-lg mb-2 text-primary-500 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-primary-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-400">SKU:</span>
                  <span className="font-medium text-primary-500">
                    {product.variants?.[0]?.sku || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-400">Price Range:</span>
                  <span className="font-medium text-secondary-500">
                    {getCurrencySymbol(product.priceRange.currency)}
                    {product.priceRange.min.toLocaleString()} - {getCurrencySymbol(product.priceRange.currency)}
                    {product.priceRange.max.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-400">Variants:</span>
                  <span className="font-medium text-primary-500">
                    {product.variants?.length || 0}
                  </span>
                </div>
                {product.isCustomDesign && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-400">Type:</span>
                    <span className="font-medium text-secondary-500">
                      Custom Design
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3 w-full">
              <Button
                leadingIcon={<Edit />}
                onClick={() => onEdit(product)}
                className="w-full"
              >
                <span>Edit</span>
              </Button>
              <Button
                variant="outline"
                leadingIcon={<Trash2 />}
                onClick={() => onDelete(product.id as string)}
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
