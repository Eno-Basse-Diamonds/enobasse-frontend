import Image from "next/image";
import {
  AdminBlogSkeletonLoader,
  BlogSectionSkeletonLoader,
  BlogPostDetailLoader,
} from "./blog";
import { CollectionListLoader } from "./collections";
import { ProductListLoader, ProductsPageLoader, ProductDetailPageLoader, AdminProductsSkeletonLoader } from "./products";
import { WishlistLoader } from "./wishlist";
import { CartLoader } from "./cart";
import { OrderHistoryLoader } from "./orders";
import { AdminCollectionsSkeletonLoader } from "./collections";
import { AccountLoadingSkeleton } from "./accounts";
import { AdminReviewsSkeletonLoader } from "./reviews";
import { DashboardSkeleton } from "./dashboard";

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-white">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-secondary-500"></div>

        <div className="absolute">
          <Image
            src="https://res.cloudinary.com/enobasse/image/upload/v1756506781/logo_gvieez.png"
            alt="Logo"
            width={32}
            height={32}
            priority
          />
        </div>
      </div>
    </div>
  );
}


export {
  AdminBlogSkeletonLoader,
  BlogSectionSkeletonLoader,
  BlogPostDetailLoader,
  CollectionListLoader,
  ProductListLoader,
  ProductsPageLoader,
  WishlistLoader,
  CartLoader,
  ProductDetailPageLoader,
  OrderHistoryLoader,
  AdminCollectionsSkeletonLoader,
  AdminProductsSkeletonLoader,
  AccountLoadingSkeleton,
  AdminReviewsSkeletonLoader,
  DashboardSkeleton,
  PageLoader,
};
