"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { getCurrencySymbol } from "@/lib/utils/money";

import {
  Accordion,
  Button,
  PageHeading,
  ProductList,
  Rating,
  SectionContainer,
  ShareDropdown,
  RingSizeSelector,
  MetalTypeSelector,
  GemstoneSelector,
  Divider,
} from "@/components";
import { WishlistIcon } from "@/components/icons";
import { useProduct, useRelatedProducts } from "@/lib/hooks/use-products";
import { Engraving } from "./_components/engraving";
import { ImageGallery } from "./_components/image-gallery";
import { ProductDetails } from "./_components/product-details";
import { Reviews } from "./_components/reviews";
import { ProductVariant, Metal, Gemstone } from "@/lib/types/products";
import { calculateAverageRating } from "@/lib/utils/reviews";
import { data } from "motion/react-client";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product } = useProduct(slug);
  const { data: relatedProductsData } = useRelatedProducts(slug, 4);
  const relatedProducts = relatedProductsData || [];

  const [selectedMetal, setSelectedMetal] = useState<Metal | undefined>(
    product?.metals?.[0] || product?.variants[0]?.metals[0]
  );
  const [selectedGemstone, setSelectedGemstone] = useState<
    Gemstone | undefined
  >(product?.gemstones?.[0] || product?.variants[0]?.gemstones[0]);

  const initialVariant = product?.variants.find((v) => {
    const metal = v.metals[0];
    const gemstone = v.gemstones[0];
    const hasMetal = metal.type === selectedMetal?.type;
    const hasGemstone = gemstone.type === selectedGemstone?.type;
    if (hasMetal && hasGemstone) return v;
  });

  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(initialVariant);

  useEffect(() => {
    if (!product?.variants) return;
    const matchingVariant = product.variants.find(
      (v) =>
        v.metals.some((m) => m.type === selectedMetal?.type) &&
        v.gemstones.some((g) => g.type === selectedGemstone?.type)
    );
    if (matchingVariant) setSelectedVariant(matchingVariant);
  }, [selectedMetal, selectedGemstone, product]);

  if (!product || !selectedVariant) {
    return notFound();
  }

  const hasMultipleVariants = product.variants.length > 1;
  const uniqueGemstones = Array.from(
    new Set(product.gemstones?.map((gemstone) => gemstone.type) || [])
  );
  const isRing = product.category === "rings";

  const { metals, gemstones } = selectedVariant;

  const productDetails = [
    { label: "SKU", value: selectedVariant.sku },
    { label: "Metal", value: `${metals[0].purity} ${metals[0].type}` },
    { label: `${metals[0].type} Weight`, value: metals[0].weight },
    { label: `${gemstones[0].type} Weight`, value: gemstones[0].weight },
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
    <div className="product-page">
      <div className="-mb-6 md:mb-auto">
        <PageHeading breadcrumb={{ items: breadcrumbItems }} />
      </div>
      <SectionContainer id="product-details">
        <div className="product-page__grid">
          <div className="product-page__gallery">
            <div className="flex w-full justify-end">
              <ShareDropdown
                url={typeof window !== "undefined" ? window.location.href : ""}
              />
            </div>
            <ImageGallery images={selectedVariant.images} />
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

          <div className="product-page__info">
            <div className="product-page__sticky-container">
              <div className="space-y-6 md:space-y-7">
                <h1 className="product-page__title">{selectedVariant.title}</h1>
                <div className="product-page__rating-container">
                  <Rating
                    rating={calculateAverageRating(
                      product.ratingDistribution ?? []
                    )}
                    count={product.reviews?.length || 0}
                    showCount={true}
                  />
                  <button>
                    <WishlistIcon />
                  </button>
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

                <div className="flex flex-row gap-x-4 md:gap-x-14 ml-[1px]">
                  <Engraving />
                  {isRing && <RingSizeSelector />}
                </div>
                <p className="product-page__price">
                  Price:{" "}
                  <span>
                    {getCurrencySymbol(product.priceRange.currency)}
                    {selectedVariant.price.toLocaleString(undefined)}
                  </span>
                </p>
                <div className="product-page__actions hidden md:flex">
                  <Button size="xl">Add to Cart</Button>
                  <Button variant="outline" size="xl">
                    Buy Now
                  </Button>
                </div>
                <div className="product-page__actions flex md:hidden">
                  <Button>Add to Cart</Button>
                  <Button variant="outline">Buy Now</Button>
                </div>
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
            />
          </div>
        </SectionContainer>
      )}

      <SectionContainer id="offerings">
        <div className="md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start overflow-y-hidden">
          <div className="flex justify-start">
            <div className="w-full">
              <Image
                src="/images/packaged-ring.png"
                alt="Packaged jewellery from Eno Basse"
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

      <SectionContainer id="related-products">
        <div className="mb-8 max-w-7xl mx-auto">
          <Divider
            label="Might as well interest you"
            className="px-4 bg-white md:text-xl text-[#502B3A] font-primary"
          />
        </div>
        <div>
          <ProductList products={relatedProducts} />
        </div>
      </SectionContainer>
    </div>
  );
}
