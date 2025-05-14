import Image from "next/image";
import * as motion from "motion/react-client";
import {
  PageHeading,
  SectionContainer,
  ProductList,
  FilterPanelMobile,
  FilterPanelDesktop,
} from "@/components";
import { ChevronDownIcon } from "@/components/icons";
import { getProducts } from "@/lib/api/product";
import "./styles.scss";

export default async function ProductsPage() {
  const products = getProducts();

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="products-page">
      <PageHeading title="All Products" />
      <SectionContainer id="all-products">
        <motion.div
          className="products-page__container"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.aside className="products-page__sidebar" variants={item}>
            <FilterPanelDesktop
              metalOptions={metalOptions}
              gemstones={gemstones}
            />
          </motion.aside>

          {products && (
            <motion.div
              className="products-page__products-container"
              variants={item}
            >
              <div className="lg:hidden">
                <FilterPanelMobile
                  metalOptions={metalOptions}
                  gemstones={gemstones}
                />
              </div>
              <motion.div
                className="products-page__products-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="products-page__products-count">
                  {products.length}{" "}
                  {products.length === 1 ? "product" : "products"}
                </p>
                <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                  <select className="products-page__sort-select">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                  <ChevronDownIcon className="products-page__sort-icon" />
                </motion.div>
              </motion.div>

              <ProductList products={products} />
            </motion.div>
          )}
        </motion.div>
      </SectionContainer>
    </div>
  );
}
