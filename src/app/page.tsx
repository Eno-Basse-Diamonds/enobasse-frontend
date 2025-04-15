import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import {
  BentoGrid,
  BlogSection,
  Carousel,
  CTASection,
  HeroSection,
  SectionHeading,
} from "@/components";
import "./home.scss";

export default function Home() {
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

  const blogPosts = [
    {
      id: "gemstone-education",
      title: "Gemstone Education",
      excerpt:
        "Gemstones are highly prized for beauty, durability, and rarity.",
      href: "/blog/gemstone-education",
      image: {
        src: "/images/blog/post-01.png",
        alt: "Various gemstones displayed on velvet",
      },
      author: "Helen David",
      date: "February 16th, 2025",
      datetime: "2025-02-16",
    },
    {
      id: "jewelry-care",
      title: "Jewelry Care Guide",
      excerpt:
        "Learn how to properly maintain and care for your precious jewelry.",
      href: "/blog/jewelry-care",
      image: {
        src: "/images/blog/post-02.png",
        alt: "Person cleaning a ring with soft cloth",
      },
      author: "Michael Stone",
      date: "March 5th, 2025",
      datetime: "2025-03-05",
    },
    {
      id: "engagement-rings",
      title: "Choosing the Perfect Engagement Ring",
      excerpt:
        "Everything you need to know about selecting the ideal engagement ring.",
      href: "/blog/engagement-rings",
      image: {
        src: "/images/blog/post-03.png",
        alt: "Diamond engagement ring on velvet",
      },
      author: "Sarah Johnson",
      date: "April 12th, 2025",
      datetime: "2025-04-12",
    },
    {
      id: "vintage-jewelry",
      title: "The History of Vintage Jewelry",
      excerpt:
        "Exploring the timeless appeal of vintage jewelry designs through the decades.",
      href: "/blog/vintage-jewelry",
      image: {
        src: "/images/blog/post-04.png",
        alt: "Collection of vintage jewelry pieces",
      },
      author: "Emma Wilson",
      date: "May 8th, 2025",
      datetime: "2025-05-08",
    },
  ];

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

const BlogHeader: React.FC = () => {
  return (
    <header className="blog-header">
      <h2 className="blog-header__title">Our Blog</h2>
      <Link href="/blog" className="blog-header__link">
        View All Posts <ArrowUpRightIcon className="blog-header__link-icon" />
      </Link>
    </header>
  );
};

interface HelpSectionProps {
  title: string;
  body: string[];
  button: { text: string; href: string };
  image: { src: string; alt: string };
}

const HelpSection: React.FC<HelpSectionProps> = ({
  title,
  body,
  button,
  image,
}) => {
  return (
    <section className="help-section">
      <figure className="help-section__image-container">
        <Image
          src={image.src}
          alt={image.alt}
          height={500}
          width={500}
          loading="lazy"
          quality={100}
          className="help-section__image"
        />
      </figure>
      <article className="help-section__content">
        <h2 className="help-section__title">{title}</h2>
        <div className="help-section__body">
          {body.map((paragraph, index) => (
            <p key={index} className="help-section__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="help-section__button-wrapper">
          <Link href={button.href} className="help-section__button">
            {button.text}{" "}
            <ArrowUpRightIcon className="help-section__button-icon" />
          </Link>
        </div>
      </article>
    </section>
  );
};

interface AboutSectionProps {
  title: string;
  description: string[];
  button: { text: string; href: string };
  image: { src: string; alt: string };
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  description,
  button,
  image,
}) => {
  return (
    <section className="about-section">
      <article className="about-section__content">
        <h2 className="about-section__title">{title}</h2>
        <div className="about-section__description">
          {description.map((paragraph, index) => (
            <p key={index} className="about-section__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="about-section__button-wrapper">
          <Link href={button.href} className="about-section__button">
            {button.text}{" "}
            <ArrowUpRightIcon className="about-section__button-icon" />
          </Link>
        </div>
      </article>
      <figure className="about-section__image-container">
        <Image
          src={image.src}
          alt={image.alt}
          height={500}
          width={500}
          loading="lazy"
          quality={100}
          className="about-section__image"
        />
      </figure>
    </section>
  );
};

interface ServicesSectionProps {
  title: string;
  description: string[];
  button: { text: string; href: string };
  videoSrc: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title,
  description,
  button,
  videoSrc,
}) => {
  return (
    <section className="services-section">
      <div className="services-section__video-container">
        <video autoPlay={true} muted loop className="services-section__video">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <article className="services-section__content">
        <h2 className="services-section__title">{title}</h2>
        <div className="services-section__description">
          {description.map((paragraph, index) => (
            <p key={index} className="services-section__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="services-section__button-wrapper">
          <Link href={button.href} className="services-section__button">
            {button.text}{" "}
            <ArrowUpRightIcon className="services-section__button-icon" />
          </Link>
        </div>
      </article>
    </section>
  );
};

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  className = "",
}) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`section-container ${className}`}
    >
      {children}
    </section>
  );
};
