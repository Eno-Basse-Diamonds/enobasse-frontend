import Image from "next/image";
import { getProduct, getProducts } from "@/lib/api/product";
import { notFound } from "next/navigation";
import {
  SectionContainer,
  PageHeading,
  ShareDropdown,
  Accordion,
  Divider,
  Rating,
  ProductList,
  RingSizeSelector,
  MetalTypeSelector,
  GemstoneSelector,
} from "@/components";
import { WishlistIcon, VehicleIcon, BoxIcon } from "@/components/icons";
import { ImageGallery } from "./_components/image-gallery";
import { ProductDetails } from "./_components/product-details";
import { Engraving } from "./_components/engraving";
import { Reviews } from "./_components/reviews";
import "./styles.scss";
import * as motion from "motion/react-client";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct();
  const relatedProducts = getProducts().slice(0, 4);

  if (!product) return notFound();

  const productVariant = product.variants[0];
  const { metal, gemstone } = productVariant;

  const productDetails = [
    { label: "SKU", value: productVariant.sku },
    { label: "Metal", value: `${metal.purity} ${metal.name}` },
    { label: `${metal.name} Weight`, value: metal.weight },
    { label: `${gemstone.name} Weight`, value: metal.weight },
  ];

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.name, href: "#" },
  ];

  const gemstones = [
    { name: "Diamond", weight: "0.3" },
    { name: "Diamond", weight: "0.8" },
    { name: "Sapphire", weight: "0.3" },
    { name: "Ruby", weight: "0.3" },
    { name: "Emerald", weight: "0.3" },
  ];

  const shippingInfo = [
    {
      id: "shipping-item-1",
      title: "Your Order Includes",
      content: (
        <>
          <ul className="mt-2 space-y-5 mb-3">
            <li className="flex flex-row items-start gap-x-4">
              <div className="bg-[#D1A559]/20 p-3 rounded-full">
                <VehicleIcon />
              </div>
              <div className="space-y-1">
                <h2 className="text-[#502B3A] text-sm">Free Delivery</h2>
                <p className="text-[#502B3A] text-sm font-light">
                  We&#39;re committed to making your entire experience a
                  pleasant one, from shopping to delivery
                </p>
              </div>
            </li>
            <li className="flex flex-row items-center gap-x-4">
              <div className="bg-[#D1A559]/20 p-3 rounded-full">
                <BoxIcon />
              </div>
              <div className="space-y-1">
                <h2 className="text-[#502B3A] text-sm">Free Returns</h2>
                <p className="text-[#502B3A] text-sm font-light">
                  Our commitment to you doesn&#39;t end at delivery. We offer
                  free returns to make your experience as easy as possible
                </p>
              </div>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "shipping-item-2",
      title: "Product Details",
      content: (
        <>
          Capture your lasting love with this stunning 14k white gold engagement
          ring that showcases an elegant drape of pavé-set diamonds around your
          center stone and along the twisting shank for a captivating look.
        </>
      ),
    },
    {
      id: "shipping-item-3",
      title: "Secure Shopping",
      content: (
        <>
          We want to make sure your shopping experience exceeds your
          expectations, so we have taken measures to guarantee your orders will
          be safe and secure, from our door to yours.
        </>
      ),
    },
    {
      id: "shipping-item-4",
      title: "Lifetime Product Warranty",
      content: (
        <>
          We stand behind our products and warrant that all items will be free
          from manufacturing defects for the life of the products.
        </>
      ),
    },
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
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="product-page"
    >
      <PageHeading breadcrumb={{ items: breadcrumbItems }} />
      <SectionContainer id="product-details">
        <div className="product-page__grid">
          <motion.div variants={slideInFromLeft} className="product-page__gallery">
            <div className="flex w-full justify-end">
              <ShareDropdown url="https://example.com/products/1" />
            </div>
            <ImageGallery images={productVariant.images} />
            <ProductDetails details={productDetails} />
          </motion.div>

          <motion.div variants={slideInFromRight} className="product-page__info">
            <div className="product-page__sticky-container">
              <div className="space-y-6 md:space-y-7">
                <motion.h1
                  variants={itemVariants}
                  className="product-page__title"
                >
                  {productVariant.name}
                </motion.h1>
                <motion.div
                  variants={itemVariants}
                  className="product-page__rating-container"
                >
                  <Rating rating={4.5} count={321} />
                  <button>
                    <WishlistIcon />
                  </button>
                </motion.div>
                {product.metals && (
                  <motion.div variants={itemVariants}>
                    <MetalTypeSelector metalOptions={product.metals} />
                  </motion.div>
                )}
                <motion.div variants={itemVariants}>
                  <GemstoneSelector gemstoneOptions={gemstones} />
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex flex-row gap-x-4 md:gap-x-14 ml-[1px]"
                >
                  <Engraving />
                  <RingSizeSelector />
                </motion.div>
                <motion.p
                  variants={itemVariants}
                  className="product-page__price"
                >
                  Price:{" "}
                  <span>
                    {product.currency}{" "}
                    {productVariant.price.toLocaleString(undefined)}
                  </span>
                </motion.p>
                <motion.div
                  variants={containerVariants}
                  className="product-page__actions"
                >
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="product-page__add-to-cart"
                  >
                    Add to Cart
                  </motion.button>
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="product-page__buy-now"
                  >
                    Buy Now
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>

      <SectionContainer id="product-reviews">
        <Reviews
          reviews={[
            {
              id: 1,
              rating: 5,
              title: "Beautiful Ring",
              content:
                "The ring is absolutely stunning. The quality is exceptional and it looks even better in person.",
              customer: {
                name: "Sarah Johnson",
                image: {
                  src: "/images/avatars/user-1.jpg",
                  alt: "Sarah Johnson's profile picture"
                }
              },
              date: "2024-02-15",
            },
            // ... other reviews
          ]}
          ratingDistribution={[
            { stars: 5, percentage: 62 },
            { stars: 4, percentage: 25 },
            { stars: 3, percentage: 9 },
            { stars: 2, percentage: 2 },
            { stars: 1, percentage: 1 }
          ]}
        />
      </SectionContainer>

      {product.reviews && product.ratingDistribution && (
        <SectionContainer id="product-reviews">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Reviews
              reviews={product.reviews}
              ratingDistribution={product.ratingDistribution}
            />
          </motion.div>
        </SectionContainer>
      )}

      <SectionContainer id="offerings">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start overflow-y-hidden"
        >
          <motion.div variants={slideInFromLeft} className="flex justify-start">
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
          </motion.div>

          <motion.div variants={slideInFromRight} className="space-y-6">
            <div className="space-y-4">
              <motion.h2
                variants={itemVariants}
                className="text-2xl md:text-4xl font-normal text-[#502B3A] leading-tight font-primary"
              >
                We&#39;re committed to making your entire experience a pleasant
                one, from shopping to delivery
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-[#502B3A] text-sm md:text-base font-light leading-relaxed"
              >
                Every item we send comes in our signature EnoBasse packaging.
                Engagement rings arrive in a deluxe ring box within an elegant
                presentation box ready for your proposal. The presentation box
                also secures your appraisal certificate and diamond grading
                report. Loose diamonds are presented in a velvet-lined diamond
                case that securely holds the stone.
              </motion.p>
            </div>
            <motion.div variants={fadeIn} className="mt-8">
              <Accordion items={deliveryOfferings} />
            </motion.div>
          </motion.div>
        </motion.div>
      </SectionContainer>

      <SectionContainer id="related-products">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-8 max-w-7xl mx-auto"
        >
          <Divider
            label="Might as well interest you"
            className="px-4 bg-white md:text-xl text-[#502B3A] font-primary"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <ProductList products={relatedProducts} />
        </motion.div>
      </SectionContainer>
    </motion.div>
  );
}
