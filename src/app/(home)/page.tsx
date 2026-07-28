import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { BentoGrid } from "@/app/(home)/_components/BentoGrid";
import { CTASection, RingCustomizationCTASection } from "@/app/(home)/_components/CTASection";
import { HeroSection } from "@/app/(home)/_components/HeroSection";
import { getPublishedBlogPosts } from "@/modules/blog/api";
import { getCollections } from "@/modules/collections/api";
import { getHomepageSettings } from "@/modules/home/api";
import { Carousel } from "@/shared/components/Carousel";
import { SectionContainer } from "@/shared/components/SectionContainer";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";

import { AboutSection } from "./_components/AboutSection";
import { BlogContent } from "./_components/BlogContent";
import { BlogHeader } from "./_components/BlogHeader";
import { HelpSection } from "./_components/HelpSection";
import { ServicesSection } from "./_components/ServicesSection";

const defaultCarouselItems = [
  {
    image: "https://res.cloudinary.com/enobasse/image/upload/v1762268753/rings_gppaxg.webp",
    alt: "White gold diamond ring",
    title: "Rings",
    href: "/collections/rings",
  },
  {
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1756512325/engagement-rings_fptggu.webp",
    alt: "White gold diamond engagement ring",
    title: "Engagement Rings",
    href: "/collections/engagement-rings",
  },
  {
    image: "https://res.cloudinary.com/enobasse/image/upload/v1756512323/earrings_rw9wkx.webp",
    alt: "White gold diamond earrings",
    title: "Earrings",
    href: "/collections/earrings",
  },
  {
    image: "https://res.cloudinary.com/enobasse/image/upload/v1756512325/pendants_icgsmi.webp",
    alt: "White gold diamond cross pendant",
    title: "Pendants",
    href: "/collections/pendants",
  },
  {
    image: "https://res.cloudinary.com/enobasse/image/upload/v1756512323/necklaces_igeblg.webp",
    alt: "White gold diamond necklace",
    title: "Necklace",
    href: "/collections/necklace",
  },
  {
    image: "https://res.cloudinary.com/enobasse/image/upload/v1756512322/bracelets_g5lb4h.webp",
    alt: "White gold diamond bracelets",
    title: "Bracelets",
    href: "/collections/bracelets",
  },
];

const defaultBentoItems = [
  {
    id: "bamboo-collection",
    title: "Bamboo Collection",
    href: "/collections/bamboo-collection",
    image: {
      src: "https://res.cloudinary.com/enobasse/image/upload/v1765203101/bamboo-collection_g8qmxp.webp",
      alt: "Bamboo Collection",
    },
  },
  {
    id: "amora-collection",
    title: "Amora Collection",
    href: "/collections/amora-collection",
    image: {
      src: "https://res.cloudinary.com/enobasse/image/upload/v1765203100/amora-collection_a5qkxs.webp",
      alt: "Amora Collection",
    },
  },
  {
    id: "new-arrivals",
    title: "New Arrivals",
    href: "/collections/new-arrivals",
    image: {
      src: "https://res.cloudinary.com/enobasse/image/upload/v1765203098/new-arrivals_uudlw9.webp",
      alt: "New Arrivals",
    },
  },
  {
    id: "pearls",
    title: "Pearls",
    href: "/collections/pearls-collection",
    image: {
      src: "https://res.cloudinary.com/enobasse/image/upload/v1765203100/pearls-collection_ml5yhe.webp",
      alt: "Pearls Collection",
    },
  },
];

export default async function HomePage() {
  const queryClient = new QueryClient();
  const page = 1;
  const perPage = 6;

  await queryClient.prefetchQuery({
    queryKey: ["publishedBlogPosts", page, perPage],
    queryFn: () => getPublishedBlogPosts(page, perPage),
  });

  const [homepageSettings, dbCollections] = await Promise.all([
    getHomepageSettings().catch(() => null),
    getCollections().catch(() => []),
  ]);

  const heroVideoMp4Url = homepageSettings?.heroVideoMp4Url ?? null;
  const heroVideoWebmUrl = homepageSettings?.heroVideoWebmUrl ?? null;
  const heroVideoPosterUrl = homepageSettings?.heroVideoPosterUrl ?? null;

  let bentoItems = defaultBentoItems;

  const featuredSlugs = homepageSettings?.featuredCollectionSlugs;

  if (featuredSlugs && featuredSlugs.length > 0 && dbCollections.length > 0) {
    const orderedItems = featuredSlugs.flatMap((slug) => {
      const collection = dbCollections.find((c) => c.slug === slug);
      if (!collection) return [];
      return [
        {
          id: collection.slug,
          title: collection.name,
          href: `/collections/${collection.slug}`,
          image: {
            src:
              collection.image?.url ||
              defaultBentoItems.find((d) => d.id === slug)?.image.src ||
              "",
            alt: collection.name,
          },
        },
      ];
    });

    if (orderedItems.length > 0) {
      bentoItems = orderedItems;
    }
  } else if (dbCollections.length > 0) {
    bentoItems = defaultBentoItems.map((item) => {
      const match = dbCollections.find(
        (c) =>
          c.slug === item.id ||
          (item.id === "pearls" && c.slug === "pearls-collection") ||
          c.slug === item.href.split("/").pop(),
      );
      if (match) {
        return {
          id: match.slug,
          title: match.name,
          href: `/collections/${match.slug}`,
          image: {
            src: match.image?.url || item.image.src,
            alt: match.name,
          },
        };
      }
      return item;
    });
  }

  return (
    <main>
      <BreadcrumbSchema items={[{ name: "Home", item: "https://enobasse.com" }]} />
      <HeroSection
        videoMp4Url={heroVideoMp4Url}
        videoWebmUrl={heroVideoWebmUrl}
        posterUrl={heroVideoPosterUrl}
      />

      <SectionContainer id="categories">
        <SectionHeading
          id="categories-heading"
          title="Explore Eno Bassé"
          description="Our craftsmen work with the finest materials with the sole aim of attaining perfection in every jewellery piece."
        />
        <div className="md:hidden">
          <Carousel itemsPerPage={2} items={defaultCarouselItems} />
        </div>
        <div className="hidden md:block">
          <Carousel items={defaultCarouselItems} />
        </div>
      </SectionContainer>

      <SectionContainer id="collections">
        <SectionHeading
          id="collections-heading"
          title="Our Collection"
          description="When perfectly cut and transformed into a piece of jewellery, diamonds undoubtedly add a touch of uniqueness and glamour to one's style."
        />
        <BentoGrid items={bentoItems} />
      </SectionContainer>

      <RingCustomizationCTASection />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <SectionContainer id="blog" className="bg-[#D1A559]/20 px-4 lg:px-8 py-8 lg:py-16">
          <BlogHeader />
          <BlogContent />
        </SectionContainer>
      </HydrationBoundary>

      <HelpSection
        title="Need Help?"
        body={[
          "Selecting the perfect stone and jewellery design is not the easiest task which is why the Eno Bassé team is here to assist you every step of the way. We offer consultation services to assist clients in finding the right GEMSTONES to suit their needs.",
          "Every piece of jewellery tells a story… From glittering necklaces to radiant rings, we lead you to the perfect jewellery to tell your story, the best expression of you. Our team consists of artisans with over 50 years of experience and a wide range of expertise who are eager to help you find and design the perfect piece.",
        ]}
        button={{ text: "Contact Us", href: "/contact" }}
        image={{
          src: "https://res.cloudinary.com/enobasse/image/upload/v1756506786/need-help_ef4rer.webp",
          alt: "White gold diamond earrings",
        }}
      />

      <AboutSection
        title="Company Profile"
        description={[
          "Eno Bassé was founded with the vision of procuring GEMSTONES to create gorgeous, one-of-a-kind jewellery. Each piece is a true work of art made with the world's finest and most precious gems. We have access to over 1.5 million GIA certified diamonds, which are embodied in our stunning creations.",
        ]}
        button={{ text: "About Us", href: "/about" }}
        image={{
          src: "https://res.cloudinary.com/enobasse/image/upload/v1756506784/founder_kkigdd.webp",
          alt: "Eno Bassé founder",
        }}
      />

      <ServicesSection
        title="Maintenance & Repairs"
        description={[
          "A lapidary workshop is a center for cutting, polishing of stones and maintenance of jewellery. Our team offers advice on establishments of these workshops, the requirements and also respond to other enquiries our clients may have.",
        ]}
        button={{
          text: "Contact Us",
          href: "/maintenance-repairs",
        }}
        videoSrcMP4="/videos/maintenance/maintenance.mp4"
        videoSrcWEBM="/videos/maintenance/maintenance.webm"
      />

      <CTASection
        heading="Want to design your own? You are in the right place!"
        image={{
          src: "https://res.cloudinary.com/enobasse/image/upload/v1756506782/call-to-action_ea4ylx.webp",
          alt: "Ruby ring with gold metal in a box.",
        }}
        button={{ text: "Contact Us", href: "/custom-design" }}
      />
    </main>
  );
}
