import React from "react";
import { getAllPosts } from "@/lib/api/blog-posts";
import {
  BentoGrid,
  BlogSection,
  Carousel,
  CTASection,
  HeroSection,
  SectionHeading,
  SectionContainer,
} from "@/components";
import { AboutSection } from "./_components/about-section";
import { BlogHeader } from "./_components/blog-header";
import { HelpSection } from "./_components/help-section";
import { ServicesSection } from "./_components/services-section";
import "./home.scss";

export default async function Home() {
  const carouselItems = [
    {
      image: "/images/categories/rings.png",
      alt: "Gold diamond ring",
      title: "Rings",
      href: "/collections/rings",
    },
    {
      image: "/images/categories/pendants.png",
      alt: "Platinum diamond pendant",
      title: "Pendants",
      href: "/collections/pendants",
    },
    {
      image: "/images/categories/engagement-rings.png",
      alt: "Platinum diamond engagement ring",
      title: "Engagement Rings",
      href: "/collections/engagement-rings",
    },
    {
      image: "/images/categories/necklaces.png",
      alt: "Platinum diamond necklace",
      title: "Necklace",
      href: "/collections/necklace",
    },
    {
      image: "/images/categories/bangles.png",
      alt: "Platinum diamond bangle",
      title: "Bangles",
      href: "/collections/bangles",
    },
    {
      image: "/images/categories/earrings.png",
      alt: "Platinum diamond earring",
      title: "Earrings",
      href: "/collections/earrings",
    },
    {
      image: "/images/categories/multi-gemstone-rings.png",
      alt: "Platinum emerald ring",
      title: "Multi-gemstone Rings",
      href: "/collections/multi-gemstone-rings",
    },
  ];

  const bentoItems = [
    {
      id: "best-sellers",
      title: "Best Sellers",
      href: "/collections/best-sellers",
      image: {
        src: "/images/collections/collection-01.png",
        alt: "Eno Basse maroon colored ribbon with gold metal",
      },
    },
    {
      id: "valentine",
      title: "Valentine's Day Gifts",
      href: "/collection/valentine-gifts",
      image: {
        src: "/images/collections/collection-02.png",
        alt: "Eno Basse maroon colored box with diamond necklace",
      },
    },
    {
      id: "new-arrivals",
      title: "New Arrivals",
      href: "/collections/new-arrivals",
      image: {
        src: "/images/collections/collection-03.png",
        alt: "Eno Basse Gold pendant with red ribbon",
      },
    },
    {
      id: "trending-now",
      title: "Trending Now",
      href: "/collections/trending",
      image: {
        src: "/images/collections/collection-04.png",
        alt: "Male with engagement band from Eno Basse",
      },
    },
  ];

  const blogPosts = await getAllPosts();

  return (
    <main>
      <HeroSection
        title="You Deserve The Most Unique Jewelry"
        description="We create antique jewellery that can be passed down through
            generations - timeless pieces designed to become family heirlooms."
        image={{
          src: "/images/hero.png",
          alt: "Woman wearing a necklace, ring, and bracelet from Eno Basse",
        }}
        buttons={[
          { text: "See Collections", href: "/collections" },
          { text: "Shop Engagement", href: "/collections/engagement-rings" },
        ]}
      />

      <SectionContainer id="categories">
        <SectionHeading
          id="categories-heading"
          title="Explore Eno Basse"
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

      <HelpSection
        title="Need Help?"
        body={[
          "Selecting the perfect stone and jewellery design is not the easiest task which is why the Eno Basse team is here to assist you every step of the way.",
          "We offer consultation services to assist clients in finding the right gemstones to suit their needs.",
          "Every piece of jewellery tells a story… From glittering necklaces to radiant rings, we lead you to the perfect jewellery to tell your story, the best expression of you.",
          "Our team consists of artisans with over 50 years of experience and a wide range of expertise who are eager to help you find and design the perfect piece.",
        ]}
        button={{ text: "Contact Us", href: "/contact" }}
        image={{
          src: "/images/need-help.png",
          alt: "Customer consulting with Eno Basse jewellery expert online",
        }}
      />

      <SectionContainer
        id="blog"
        className="bg-[#D1A559] bg-opacity-20 px-4 py-8 lg:px-8 lg:py-16 mt-10 md:mt-20"
      >
        <BlogHeader />
        <BlogSection posts={blogPosts} />
      </SectionContainer>

      <AboutSection
        title="Company Profile"
        description={[
          "Eno Basse was founded with the vision of procuring gemstones to create gorgeous, one-of-a-kind jewellery.",
          "Each piece is a true work of art made with the world's finest and most precious gems. We have access to over 1.5 million GIA certified diamonds, which are embodied in our stunning creations.",
        ]}
        button={{ text: "About Us", href: "/about" }}
        image={{
          src: "/images/founder.png",
          alt: "Eno Basse master jeweler at work",
        }}
      />

      <ServicesSection
        title="Maintenance & Repairs"
        description={[
          "A lapidary workshop is a center for cutting, polishing of stones and maintenance of jewellery.",
          "Our team offers advice on establishments of these workshops, the requirements and also respond to other enquiries our clients may have.",
        ]}
        button={{
          text: "Contact Us",
          href: "/contact",
        }}
        videoSrc="/videos/maintenance.mp4"
      />

      <CTASection
        heading="Want to design your own? Calm, we can do it!"
        image={{
          src: "/images/call-to-action.png",
          alt: "Ruby ring with gold metal in a box.",
        }}
        button={{ text: "Shop Now", href: "/collections" }}
      />
    </main>
  );
}
