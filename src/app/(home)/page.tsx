import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  BentoGrid,
  Carousel,
  CTASection,
  HeroSection,
  SectionHeading,
  SectionContainer,
  RingCustomizationCTASection,
} from "@/components";
import { AboutSection } from "./_components/about-section";
import { BlogHeader } from "./_components/blog-header";
import { BlogContent } from "./_components/blog-content";
import { HelpSection } from "./_components/help-section";
import { ServicesSection } from "./_components/services-section";
import { getPublishedBlogPosts } from "@/lib/api/blog-posts";

export default async function HomePage() {
  const queryClient = new QueryClient();
  const page = 1;
  const perPage = 6;

  await queryClient.prefetchQuery({
    queryKey: ["publishedBlogPosts", page, perPage],
    queryFn: () => getPublishedBlogPosts(page, perPage),
  });

  const carouselItems = [
    {
      image:
        "https://res.cloudinary.com/enobasse/image/upload/v1756512330/rings_yahtc5.webp",
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
      image:
        "https://res.cloudinary.com/enobasse/image/upload/v1756512323/earrings_rw9wkx.webp",
      alt: "White gold diamond earrings",
      title: "Earrings",
      href: "/collections/earrings",
    },
    {
      image:
        "https://res.cloudinary.com/enobasse/image/upload/v1756512325/pendants_icgsmi.webp",
      alt: "White gold diamond cross pendant",
      title: "Pendants",
      href: "/collections/pendants",
    },
    {
      image:
        "https://res.cloudinary.com/enobasse/image/upload/v1756512323/necklaces_igeblg.webp",
      alt: "White gold diamond necklace",
      title: "Necklace",
      href: "/collections/necklace",
    },
    {
      image:
        "https://res.cloudinary.com/enobasse/image/upload/v1756512321/bangles_lka5bf.webp",
      alt: "White gold diamond bangle",
      title: "Bangles",
      href: "/collections/bangles",
    },
    {
      image:
        "https://res.cloudinary.com/enobasse/image/upload/v1756512322/bracelets_g5lb4h.webp",
      alt: "White gold diamond bracelets",
      title: "Bracelets",
      href: "/collections/bracelets",
    },
  ];

  const bentoItems = [
    {
      id: "bamboo-collection",
      title: "Bamboo Collection",
      href: "/collections/bamboo-collection",
      image: {
        src: "https://res.cloudinary.com/enobasse/image/upload/v1756745737/bamboo-collection_suocdq.webp",
        alt: "Bamboo Collection",
      },
    },
    {
      id: "amora-collection",
      title: "Amora Collection",
      href: "/collection/amora-collection",
      image: {
        src: "https://res.cloudinary.com/enobasse/image/upload/v1756745735/amora-collection_sqjo2h.webp",
        alt: "Amora Collection",
      },
    },
    {
      id: "new-arrivals",
      title: "New Arrivals",
      href: "/collections/new-arrivals",
      image: {
        src: "https://res.cloudinary.com/enobasse/image/upload/v1756512496/collection-03_puyvz5.webp",
        alt: "New Arrivals",
      },
    },
    {
      id: "pearls",
      title: "Pearls",
      href: "/collections/pearls-collection",
      image: {
        src: "https://res.cloudinary.com/enobasse/image/upload/v1756745733/pearls-collection_brrv3h.webp",
        alt: "Pearls Collection",
      },
    },
  ];

  return (
    <main>
      <HeroSection
        title="You Deserve The Most Unique Jewelry"
        description="We create antique jewellery that can be passed down through
            generations - timeless pieces designed to become family heirlooms."
        image={{
          src: "https://res.cloudinary.com/enobasse/image/upload/v1756506784/hero_iobwnd.webp",
          alt: "Woman wearing a necklace, ring, and bracelet from Eno Bassé",
        }}
        buttons={[
          { text: "See Collections", href: "/collections" },
          { text: "See Products", href: "/products" },
        ]}
      />

      <SectionContainer id="categories">
        <SectionHeading
          id="categories-heading"
          title="Explore Eno Bassé"
          description="Our craftsmen work with the finest materials with the sole aim of attaining perfection in every jewellery piece."
        />
        <div className="md:hidden">
          <Carousel itemsPerPage={2} items={carouselItems} />
        </div>
        <div className="hidden md:block">
          <Carousel items={carouselItems} />
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
        <SectionContainer
          id="blog"
          className="bg-[#D1A559] bg-opacity-20 px-4 lg:px-8 py-8 lg:py-16"
        >
          <BlogHeader />
          <BlogContent />
        </SectionContainer>
      </HydrationBoundary>

      <HelpSection
        title="Need Help?"
        body={[
          "Selecting the perfect stone and jewellery design is not the easiest task which is why the Eno Bassé team is here to assist you every step of the way. We offer consultation services to assist clients in finding the right gemstones to suit their needs.",
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
          "Eno Bassé was founded with the vision of procuring gemstones to create gorgeous, one-of-a-kind jewellery. Each piece is a true work of art made with the world's finest and most precious gems. We have access to over 1.5 million GIA certified diamonds, which are embodied in our stunning creations.",
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
        videoSrc="https://res.cloudinary.com/enobasse/video/upload/v1756511716/maintenance_gfxt92.mp4"
      />

      <CTASection
        heading="Want to design your own? Calm, we can do it!"
        image={{
          src: "https://res.cloudinary.com/enobasse/image/upload/v1756506782/call-to-action_ea4ylx.webp",
          alt: "Ruby ring with gold metal in a box.",
        }}
        button={{ text: "Contact Us", href: "/custom-design" }}
      />
    </main>
  );
}
