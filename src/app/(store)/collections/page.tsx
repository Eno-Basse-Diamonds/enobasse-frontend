import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import { SectionContainer, PageHeading } from "@/components";
import { getCollections } from "@/lib/api/collections";
import "./styles.scss";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <div className="collections-page">
      <PageHeading title="Collections" />
      <SectionContainer id="collections">
        <motion.div
          className="collections-page__grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {collections.map((collection) => (
            <motion.div key={collection.id} variants={cardVariants}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group collections-page__card"
              >
                <div className="collections-page__card-image-container">
                  <Image
                    src={collection.image.src}
                    alt={collection.image.alt}
                    title={collection.image.alt}
                    width={500}
                    height={500}
                    className="collections-page__card-image"
                    priority={false}
                    quality={100}
                  />
                </div>

                <div className="collections-page__card-content">
                  <h3 className="collections-page__card-title">
                    {collection.name}
                  </h3>
                  <p className="collections-page__card-count">
                    {collection.itemsCount}{" "}
                    {collection.itemsCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </SectionContainer>
    </div>
  );
}
