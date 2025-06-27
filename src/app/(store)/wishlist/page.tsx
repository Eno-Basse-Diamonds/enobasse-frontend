import { SectionContainer, PageHeading } from "@/components";
import { getWishlistItems } from "@/lib/api/wishlist";
import { EmptyState } from "@/components";
import { HeartIcon } from "@/components/icons";
import { WishlistHeader } from "./_components/wishlist-header";
import { WishlistItem } from "./_components/wishlist-item";
import "./styles.scss";

export default async function WishlistPage() {
  const wishlistItems = await getWishlistItems();

  return (
    <div className="wishlist-page">
      <PageHeading title="Wishlist" />
      <SectionContainer id="wishlist">
        <div className="wishlist-page__container">
          {wishlistItems.length === 0 ? (
            <EmptyState
              icon={<HeartIcon className="empty-state-icon" />}
              title="Your wishlist is empty"
              description="Start adding items you love to your wishlist"
              // action={{ text: "Browse Products", href: "/products" }}
            />
          ) : (
            <>
              <WishlistHeader itemCount={wishlistItems.length} />
              <div className="wishlist-page__list-container">
                <ul role="list" className="wishlist-page__list">
                  {wishlistItems.map((item) => (
                    <WishlistItem key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </SectionContainer>
    </div>
  );
}
