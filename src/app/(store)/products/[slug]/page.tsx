"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { getCurrencySymbol } from "@/lib/utils/money";
import { useProduct, useRelatedProducts } from "@/lib/hooks/use-products";
import { ImageGallery } from "./_components/image-gallery";
import { ProductDetails } from "./_components/product-details";
import { Reviews } from "./_components/reviews";
import { Heart } from "lucide-react";
import { ProductVariant, Metal, Gemstone } from "@/lib/types/products";
import { calculateAverageRating } from "@/lib/utils/reviews";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { useAccountStore } from "@/lib/store/account";
import { Accordion } from "@/components/accordion/index.";
import { Alert } from "@/components/alert";
import { useAlertStore } from "@/lib/store/alert";
import { Button } from "@/components/button";
import { MetalTypeSelector, GemstoneSelector } from "@/components/checkbox";
import { Divider } from "@/components/divider";
import { ShareDropdown } from "@/components/dropdown";
import { WishlistIcon } from "@/components/icons/wishlist";
import { ProductDetailPageLoader } from "@/components/loaders/products";
import { Engraving } from "@/components/modal";
import { PageHeading } from "@/components/page-heading";
import { ProductList } from "@/components/product/list";
import { Rating } from "@/components/rating";
import { SectionContainer } from "@/components/section-container";
import { RingSizeSelector } from "@/components/select-menu";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ProductSchema } from "@/components/seo/ProductSchema";

import { RequestQuoteModal } from "./_components/request-quote-modal";
import {
  LetterSelection,
  MOCK_AVAILABILITY,
} from "./_components/letter-selection";
import {
  trackAddToCart,
  trackViewItem,
  trackAddToWishlist,
} from "@/lib/analytics/gtag";

export default function ProductPage() {
  const router = useRouter();
  const { preferredCurrency, isHydrated } = useAccountStore();

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading: productLoading } = useProduct(
    slug,
    preferredCurrency,
    isHydrated,
  );

  const { data: relatedProducts, isLoading: relatedLoading } =
    useRelatedProducts(slug, 4, preferredCurrency, isHydrated);
  const { data: session } = useSession();

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  const [selectedMetal, setSelectedMetal] = useState<Metal | undefined>(
    Array.isArray(product?.metals) && product.metals.length > 0
      ? product.metals[0]
      : Array.isArray(product?.variants) &&
          product.variants.length > 0 &&
          Array.isArray(product.variants[0].metals) &&
          product.variants[0].metals.length > 0
        ? product.variants[0].metals[0]
        : undefined,
  );
  const [selectedGemstone, setSelectedGemstone] = useState<
    Gemstone | undefined
  >(
    Array.isArray(product?.gemstones) && product.gemstones.length > 0
      ? product.gemstones[0]
      : Array.isArray(product?.variants) &&
          product.variants.length > 0 &&
          Array.isArray(product.variants[0].gemstones) &&
          product.variants[0].gemstones.length > 0
        ? product.variants[0].gemstones[0]
        : undefined,
  );

  const initialVariant =
    product?.variants.find((v) => {
      if (
        !Array.isArray(v.metals) ||
        v.metals.length === 0 ||
        !Array.isArray(v.gemstones) ||
        v.gemstones.length === 0
      ) {
        return false;
      }
      const metal = v.metals[0];
      const gemstone = v.gemstones[0];
      const hasMetal = metal && metal.type === selectedMetal?.type;
      const hasGemstone = gemstone && gemstone.type === selectedGemstone?.type;
      if (hasMetal && hasGemstone) return v;
      return false;
    }) ?? product?.variants[0];

  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(initialVariant);

  const { items, addItem, removeItem, hydrated, hydrate } = useWishlistStore();
  const isInWishlist = (productVariantId: string | number) => {
    return items.some((item) => item.productVariant?.id === productVariantId);
  };

  const [engraving, setEngraving] = useState<
    { text: string; fontStyle: string } | undefined
  >(undefined);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(
    undefined,
  );

  const [selectedLetters, setSelectedLetters] = useState<string[]>(["A"]);
  const [includeChain, setIncludeChain] = useState<boolean>(true);

  const isAmoraCollection = product?.collections?.some(
    (c) => c.slug === "amora-collection",
  );

  const hasOutOfStockSelection = selectedLetters.some(
    (l) => MOCK_AVAILABILITY[l] === false,
  );

  // Calculate Amora collection price
  const letterPrice = product?.priceRange?.min ?? 0;
  const chainPrice = (product?.priceRange?.max ?? 0) - letterPrice;
  const amoraPrice = isAmoraCollection
    ? selectedLetters.length * letterPrice + (includeChain ? chainPrice : 0)
    : null;
  const quantity = 1;

  const handleWishlistToggle = async () => {
    if (!selectedVariant || !hydrated) return;

    if (isInWishlist(selectedVariant.id)) {
      await removeItem(selectedVariant.id, session?.user?.email ?? undefined);
    } else {
      await addItem(
        selectedVariant,
        product?.slug || "",
        product?.category || "",
        session?.user?.email ?? undefined,
        preferredCurrency,
        product?.isCustomDesign,
      );

      trackAddToWishlist(
        selectedVariant,
        product?.slug || "",
        product?.category || "",
        preferredCurrency,
      );
    }
  };

  const { addItem: addCartItem } = useCartStore();
  const addAlert = useAlertStore((state) => state.addAlert);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addCartItem(
      selectedVariant,
      product?.slug || "",
      product?.category || "",
      quantity,
      session?.user?.email ?? undefined,
      selectedSize,
      engraving,
      preferredCurrency,
      isAmoraCollection && amoraPrice !== null
        ? {
            selectedLetters,
            includeChain,
            calculatedPrice: amoraPrice,
          }
        : undefined,
    );

    trackAddToCart(
      selectedVariant,
      product?.slug || "",
      product?.category || "",
      quantity,
      preferredCurrency,
    );

    addAlert({
      type: "success",
      title: "Added to Cart",
      message: `${selectedVariant.title || product?.name} has been added to your cart.`,
      duration: 4000,
      dismissible: true,
    });
  };

  const handleRequestQuote = () => {
    setIsQuoteModalOpen(true);
  };

  useEffect(() => {
    hydrate(session?.user?.email ?? undefined);
  }, [session, hydrate]);

  useEffect(() => {
    if (selectedVariant && product) {
      trackViewItem(
        selectedVariant,
        product.slug,
        product.category || "",
        preferredCurrency,
      );
    }
  }, [selectedVariant?.id]);

  useEffect(() => {
    if (!product?.variants) return;

    const matchingVariant = product.variants.find((v) => {
      const matchMetal =
        !selectedMetal ||
        (Array.isArray(v.metals) &&
          v.metals.some((m) => m.type === selectedMetal.type));
      const matchGemstone =
        !selectedGemstone ||
        (Array.isArray(v.gemstones) &&
          v.gemstones.some((g) => g.type === selectedGemstone.type));

      return matchMetal && matchGemstone;
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    } else if (selectedVariant?.id) {
      // Fallback to ID match if attribute match fails (e.g., during currency update)
      const variantById = product.variants.find(
        (v) => v.id === selectedVariant.id,
      );
      if (variantById) setSelectedVariant(variantById);
    }
  }, [selectedMetal, selectedGemstone, product]);

  if (productLoading && relatedLoading) {
    return <ProductDetailPageLoader />;
  }

  if (!product) {
    return notFound();
  }

  if (!selectedVariant) {
    setSelectedVariant(product.variants[0]);
  }

  const hasMultipleVariants = product.variants.length > 1;
  const uniqueGemstones = Array.from(
    new Set(product.gemstones?.map((gemstone) => gemstone.type) || []),
  );
  const isRing = product.category === "Rings";

  const metals = selectedVariant?.metals ?? [];
  const gemstones = selectedVariant?.gemstones ?? [];

  const productDetails = [
    { label: "SKU", value: selectedVariant?.sku ?? "N/A" },
    {
      label: "Metal",
      value:
        Array.isArray(metals) && metals.length > 0
          ? `${metals[0]?.purity ?? ""} ${metals[0]?.type ?? ""}`
          : "N/A",
    },
    {
      label: `${
        Array.isArray(metals) && metals.length > 0
          ? (metals[0]?.type ?? "Metal")
          : "Metal"
      } Weight`,
      value:
        Array.isArray(metals) && metals.length > 0
          ? (metals[0]?.weightGrams ?? "N/A")
          : "N/A",
    },
    {
      label: `${
        gemstones && gemstones[0]?.type ? gemstones[0].type : "Gemstone"
      } Weight`,
      value:
        gemstones && gemstones[0]?.weightCarat != null
          ? gemstones[0].weightCarat
          : "N/A",
    },
  ];

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.name, href: "#" },
  ];

  const deliveryOfferings = [
    {
      id: "offering-1",
      title: "Discreet Packaging",
      content: "Our shipping box won't give away what's inside.",
    },
    {
      id: "offering-2",
      title: "Secure and Convenient Pickup Option",
      content:
        "You can choose to ship your order to a Hold for Pickup location.",
    },
    {
      id: "offering-3",
      title: "Free Shipping",
      content: "We offer fast and free shipping on every order.",
    },
  ];

  return (
    <div className="my-6 md:my-12">
      {alertState.visible && (
        <Alert
          type={alertState.type}
          dismissible
          onDismiss={dismissAlert}
          duration={5000}
        >
          {alertState.message}
        </Alert>
      )}
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://enobasse.com" },
          { name: "Products", item: "https://enobasse.com/products" },
          {
            name: product.name,
            item: `https://enobasse.com/product/${product.slug}`,
          },
        ]}
      />
      <ProductSchema product={product} />
      <div className="-mb-6 md:mb-auto">
        <PageHeading breadcrumb={{ items: breadcrumbItems }} />
      </div>
      <SectionContainer id="product-details">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-x-4 md:gap-x-12">
          <div className="lg:col-span-3">
            <div className="flex w-full justify-end">
              <ShareDropdown
                url={typeof window !== "undefined" ? window.location.href : ""}
              />
            </div>
            <ImageGallery images={selectedVariant?.images ?? []} />
            <div className="hidden md:block">
              <div className="mt-8 mb-4">
                <h2 className="text-xl text-primary-300 mb-3">Description</h2>
                <p className="text-primary-500 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>
              <ProductDetails details={productDetails} />
            </div>
          </div>

          <div className="lg:col-span-2 mt-4 md:mt-0">
            <div className="sticky top-4 md:top-32 h-auto md:h-[calc(100vh-6rem)] overflow-y-auto pb-8 md:pb-0">
              <div className="space-y-6 md:space-y-7">
                <h1 className="font-primary text-xl md:text-2xl lg:text-3xl text-[#502B3A] mb-3 md:mb-5">
                  {selectedVariant?.title ?? product.name}
                </h1>
                <div className="mb-6 md:mb-10 flex justify-between items-center w-full">
                  <Rating
                    rating={calculateAverageRating(
                      product.ratingDistribution ?? [],
                    )}
                    count={product.reviews?.length || 0}
                    showCount={true}
                  />
                  {!(
                    product.isCustomDesign && selectedVariant?.price === 0
                  ) && (
                    <button
                      onClick={handleWishlistToggle}
                      aria-label={
                        isInWishlist(selectedVariant?.id ?? "")
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      {isInWishlist(selectedVariant?.id ?? "") ? (
                        <Heart
                          fill="#D1A559"
                          className="text-secondary-500 h-5 w-5"
                        />
                      ) : (
                        <WishlistIcon className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>

                {hasMultipleVariants &&
                  product.metals &&
                  product.metals.length > 1 && (
                    <div>
                      <MetalTypeSelector
                        metalOptions={product.metals}
                        selectedMetal={selectedMetal}
                        onSelectMetal={setSelectedMetal}
                      />
                    </div>
                  )}

                {hasMultipleVariants &&
                  product.gemstones &&
                  uniqueGemstones.length > 1 && (
                    <div>
                      <GemstoneSelector
                        gemstoneOptions={gemstones}
                        selectedGemstone={selectedGemstone}
                        onSelectGemstone={setSelectedGemstone}
                      />
                    </div>
                  )}

                {isAmoraCollection && (
                  <div>
                    <LetterSelection
                      selectedLetters={selectedLetters}
                      onChange={setSelectedLetters}
                      availability={MOCK_AVAILABILITY}
                    />

                    {/* Chain option toggle */}
                    <div className="mt-4">
                      <p className="text-sm font-medium text-[#502B3A] mb-2">
                        Add Chain
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIncludeChain(false)}
                          className={`flex-1 py-2.5 px-4 text-sm border rounded-sm transition-colors ${
                            !includeChain
                              ? "bg-[#502B3A] text-white border-[#502B3A]"
                              : "bg-white text-[#502B3A] border-[#502B3A]/20 hover:border-[#502B3A]"
                          }`}
                        >
                          Letters Only
                        </button>
                        <button
                          type="button"
                          onClick={() => setIncludeChain(true)}
                          className={`flex-1 py-2.5 px-4 text-sm border rounded-sm transition-colors ${
                            includeChain
                              ? "bg-[#502B3A] text-white border-[#502B3A]"
                              : "bg-white text-[#502B3A] border-[#502B3A]/20 hover:border-[#502B3A]"
                          }`}
                        >
                          With Chain (+
                          {getCurrencySymbol(product.priceRange.currency)}
                          {chainPrice.toLocaleString()})
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-row gap-x-4 md:gap-x-14 ml-[1px]">
                  <Engraving
                    engraving={engraving}
                    setEngraving={setEngraving}
                  />
                  {isRing && (
                    <RingSizeSelector
                      selectedSize={selectedSize}
                      onSetSelectedSize={setSelectedSize}
                      isDropdown={true}
                    />
                  )}
                </div>
                {product.isCustomDesign && selectedVariant?.price === 0 ? (
                  <div>
                    <p className="text-[#502B3A] text-xl font-semibold">
                      Price available upon request
                    </p>
                    <p className="text-[#502B3A]/60 text-base">
                      You can request a quote using the link below or by calling
                      by phone.
                    </p>
                  </div>
                ) : isAmoraCollection && amoraPrice !== null ? (
                  <p className="text-[#502B3A]/60 text-base md:text-lg">
                    Price:{" "}
                    <span className="font-semibold text-[#502B3A] text-xl md:text-2xl">
                      {getCurrencySymbol(product.priceRange.currency)}
                      {amoraPrice.toLocaleString()}
                    </span>
                  </p>
                ) : (
                  <p className="text-[#502B3A]/60 text-base md:text-lg">
                    Price:{" "}
                    <span className="font-semibold text-[#502B3A] text-xl md:text-2xl">
                      {getCurrencySymbol(product.priceRange.currency)}
                      {selectedVariant?.price != null
                        ? selectedVariant.price.toLocaleString(undefined)
                        : "N/A"}
                    </span>
                  </p>
                )}
                {(!product.isCustomDesign || selectedVariant?.price !== 0) && (
                  <>
                    <div className="flex-col gap-y-3 md:gap-y-4 mt-8 md:mt-12 hidden md:flex">
                      {hasOutOfStockSelection ? (
                        <Button size="xl" onClick={handleRequestQuote}>
                          Request for Item
                        </Button>
                      ) : (
                        <Button size="xl" onClick={handleAddToCart}>
                          Add to Cart
                        </Button>
                      )}
                    </div>
                    <div className="flex-col gap-y-3 md:gap-y-4 mt-8 md:mt-12 flex md:hidden">
                      {hasOutOfStockSelection ? (
                        <Button onClick={handleRequestQuote}>
                          Request for Item
                        </Button>
                      ) : (
                        <Button onClick={handleAddToCart}>Add to Cart</Button>
                      )}
                    </div>
                  </>
                )}
                {product.isCustomDesign && selectedVariant?.price === 0 && (
                  <>
                    <div className="flex-col gap-y-3 md:gap-y-4 mt-8 md:mt-12 hidden md:flex">
                      <Button size="xl" onClick={handleRequestQuote}>
                        Request a Quote
                      </Button>
                    </div>
                    <div className="flex-col gap-y-3 md:gap-y-4 mt-8 md:mt-12 flex md:hidden">
                      <Button onClick={handleRequestQuote}>
                        Request a Quote
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div className="my-4">
              <h2 className="text-xl text-primary-300 mb-3">Description</h2>
              <p className="text-primary-500 font-light leading-relaxed">
                {product.description}
              </p>
            </div>
            <ProductDetails details={productDetails} />
          </div>
        </div>
      </SectionContainer>

      {product.reviews && product.ratingDistribution && (
        <SectionContainer id="product-reviews">
          <div>
            <Reviews
              reviews={product.reviews}
              ratingDistribution={product.ratingDistribution}
              productId={product.id}
              setAlertState={setAlertState}
              dismissAlert={dismissAlert}
            />
          </div>
        </SectionContainer>
      )}

      <SectionContainer id="offerings">
        <div className="md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start overflow-y-hidden">
          <div className="flex justify-start">
            <div className="w-full">
              <Image
                src="https://res.cloudinary.com/enobasse/image/upload/v1756506788/packaged-ring_hspfeo.png"
                alt="Packaged jewellery from Eno Bassé"
                width={400}
                height={400}
                className="w-full h-auto"
                quality={100}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-normal text-[#502B3A] leading-tight font-primary">
                We&#39;re committed to making your entire experience a pleasant
                one, from shopping to delivery
              </h2>
              <p className="text-[#502B3A] text-base font-light leading-relaxed">
                Every item we send comes in our signature EnoBasse packaging.
                Engagement rings arrive in a deluxe ring box within an elegant
                presentation box ready for your proposal. The presentation box
                also secures your appraisal certificate and diamond grading
                report. Loose diamonds are presented in a velvet-lined diamond
                case that securely holds the stone.
              </p>
            </div>
            <div className="mt-8">
              <Accordion items={deliveryOfferings} />
            </div>
          </div>
        </div>
      </SectionContainer>

      {relatedProducts && (
        <SectionContainer id="related-products">
          <div className="mb-8 max-w-7xl mx-auto">
            <Divider
              label="Might as well interest you"
              className="px-4 bg-white md:text-xl text-[#502B3A] font-primary rounded-sm"
            />
          </div>
          <div>
            <ProductList products={relatedProducts} />
          </div>
        </SectionContainer>
      )}

      {product && (
        <RequestQuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          product={product}
          variantImage={selectedVariant?.images?.[0]?.url}
          amoraOptions={
            isAmoraCollection && amoraPrice !== null
              ? {
                  selectedLetters,
                  includeChain,
                  calculatedPrice: amoraPrice,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
