import Image from "next/image";
import { notFound } from "next/navigation";
import * as motion from "motion/react-client";
import { getCollectionWithProducts } from "@/lib/api/collections";
import {
  PageHeading,
  SectionContainer,
  ProductList,
  FilterPanelMobile,
  FilterPanelDesktop,
} from "@/components";
import { ChevronDownIcon } from "@/components/icons";
import "./styles.scss";

type CollectionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const imageHoverVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default async function CollectionDetailPage({
  params,
}: CollectionDetailPageProps) {
  const { slug } = await params;

  const collection = getCollectionWithProducts(slug);
  if (!collection) return notFound();
  const products = collection.products;

  const breadcrumbItems = [
    { label: "Collections", href: "/collections" },
    { label: collection.name, href: "#" },
  ];

  const metalOptions = [
    {
      name: "Platinum",
      type: "metal" as const,
      image: { src: "/images/metal-options/platinum.webp", alt: "Platinum" },
    },
    {
      name: "Rose Gold",
      type: "metal" as const,
      image: { src: "/images/metal-options/rose-gold.avif", alt: "Rose Gold" },
    },
    {
      name: "White Gold",
      type: "metal" as const,
      image: {
        src: "/images/metal-options/white-gold.avif",
        alt: "White Gold",
      },
    },
    {
      name: "Yellow Gold",
      type: "metal" as const,
      image: {
        src: "/images/metal-options/yellow-gold.avif",
        alt: "Yellow Gold",
      },
    },
  ];

  const gemstones = [
    { name: "Diamond", type: "gemstone" as const, color: "text-gray-400" },
    { name: "Ruby", type: "gemstone" as const, color: "text-red-500" },
    { name: "Sapphire", type: "gemstone" as const, color: "text-blue-600" },
    { name: "Emerald", type: "gemstone" as const, color: "text-green-500" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="collection-detail"
    >
      <PageHeading breadcrumb={{ items: breadcrumbItems }} />
      <SectionContainer id="collection-products">
        <motion.header
          variants={itemVariants}
          className="collection-detail__header"
        >
          <div className="collection-detail__header--mobile">
            <div className="collection-detail__image-container">
              <Image
                src={collection.image.src}
                alt={collection.image.alt}
                fill
                sizes="100%"
                className="collection-detail__image"
                priority
                quality={100}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="collection-detail__info-panel"
            >
              <h1 className="collection-detail__title">{collection.name}</h1>
              <p className="collection-detail__description">
                {collection.description}
              </p>
            </motion.div>
          </div>
          <div className="collection-detail__header--desktop">
            <motion.div
              whileHover="hover"
              variants={imageHoverVariants}
              className="collection-detail__image-container--desktop"
            >
              <Image
                src={collection.image.src}
                alt={collection.image.alt}
                fill
                sizes="100%"
                priority
                className="collection-detail__image"
              />
            </motion.div>
            <div className="collection-detail__info-panel--desktop">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="collection-detail__info-panel-content"
              >
                <h1 className="collection-detail__title collection-detail__title--desktop">
                  {collection.name}
                </h1>
                <p className="collection-detail__description collection-detail__description--desktop">
                  {collection.description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <motion.div
          variants={containerVariants}
          className="collection-detail__content"
        >
          <motion.aside
            variants={itemVariants}
            className="collection-detail__sidebar hidden lg:block"
          >
            <FilterPanelDesktop
              metalOptions={metalOptions}
              gemstones={gemstones}
            />
          </motion.aside>

          {products && (
            <motion.div
              variants={itemVariants}
              className="collection-detail__products-container"
            >
              <div className="lg:hidden">
                <FilterPanelMobile
                  metalOptions={metalOptions}
                  gemstones={gemstones}
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="collection-detail__products-header"
              >
                <p className="collection-detail__products-count">
                  {products.length}{" "}
                  {products.length === 1 ? "product" : "products"}
                </p>
                <div className="relative">
                  <select className="collection-detail__sort-select">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                  <ChevronDownIcon className="collection-detail__sort-icon" />
                </div>
              </motion.div>

              <ProductList products={products} />
            </motion.div>
          )}
        </motion.div>
      </SectionContainer>
    </motion.div>
  );
}
