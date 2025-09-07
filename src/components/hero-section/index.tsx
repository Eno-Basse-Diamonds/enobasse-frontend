"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSlide {
  id: number;
  layout: string;
  eyebrow?: string;
  title: string;
  eyebrow2?: string;
  title2?: string;
  description?: string;
  buttonText: string;
  theme: string;
  image?: string;
  leftImage?: string;
  rightImage?: string;
  buttonText2?: string;
  buttonLink?: string;
  buttonLink2?: string;
}

interface HeroSectionProps {
  slides?: HeroSlide[];
  autoPlay?: boolean;
  slideDuration?: number;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    layout: "text-left-image-right",
    title: "You Deserve The Most Unique Jewelry",
    description:
      "We create antique jewellery that can be passed down through generations - timeless pieces designed to become family heirlooms.",
    buttonText: "See Collections",
    buttonText2: "See Products",
    buttonLink: "/collections",
    buttonLink2: "/products",
    theme: "light",
    image:
      "https://res.cloudinary.com/enobasse/image/upload/v1757184427/hero-image-01_qupz55.webp",
  },
  {
    id: 2,
    layout: "dual-background",
    eyebrow: "Beyond The Ordinary",
    title: "Find Your Signature",
    eyebrow2: "Beyond The Expected",
    title2: "Define Your Style",
    buttonText: "See Collections",
    buttonText2: "See Products",
    buttonLink: "/collections",
    buttonLink2: "/products",
    theme: "dark",
    leftImage:
      "https://res.cloudinary.com/enobasse/image/upload/v1757188224/hero-image-02_ktnpsc.webp",
    rightImage:
      "https://res.cloudinary.com/enobasse/image/upload/v1757190090/hero-image-04_zkzyln.webp",
  },
  {
    id: 3,
    layout: "triple-background",
    title: "Timeless Symbols of Eternal Love",
    description:
      "Discover our exquisite collection of engagement rings, where exceptional craftsmanship meets rare gemstones to celebrate your unique love story.",
    buttonText: "View Engagement Rings",
    buttonLink: "/collections/engagement-rings",
    theme: "light",
    leftImage:
      "https://res.cloudinary.com/enobasse/image/upload/v1757188225/hero-image-03_xuzb7k.webp",
    rightImage:
      "https://res.cloudinary.com/enobasse/image/upload/v1757190090/heero-image-05_gn3tvn.webp",
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  slides = defaultSlides,
  autoPlay = true,
  slideDuration = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    if (autoPlay) {
      startRotation();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay]);

  useEffect(() => {
    if (!autoPlay) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextSlide();
          return 0;
        }
        return prev + 100 / (slideDuration / 50);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentSlide, autoPlay, slideDuration]);

  const startRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        goToNextSlide();
      }, slideDuration);
    }
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startRotation();
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startRotation();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startRotation();
  };

  const CircularProgress = ({
    progress,
    index,
    isActive,
  }: {
    progress: number;
    index: number;
    isActive: boolean;
  }) => {
    const radius = 15;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div
        className="relative w-6 h-6 cursor-pointer flex items-center justify-center"
        onClick={() => goToSlide(index)}
      >
        <svg className="w-full h-full" viewBox="0 0 40 40">
          <circle
            className="progress-ring text-white"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={isActive ? strokeDashoffset : circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="20"
            cy="20"
          />
        </svg>

        <div
          className={`absolute w-3 h-3 rounded-full ${
            isActive ? "bg-white" : "bg-gray-400"
          }`}
        />
      </div>
    );
  };

  const renderSlide = (slide: HeroSlide) => {
    switch (slide.layout) {
      case "text-left-image-right":
        return (
          <>
            <div className="lg:hidden relative h-full w-full bg-gray-100">
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image || ""}
                  alt={slide.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={currentSlide === 0}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
                <h2
                  className={`slide-up-element font-primary font-semibold text-3xl md:text-4xl mb-6 text-white ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.title}
                </h2>
                <h3
                  className={`slide-up-element font-light md:text-xl mb-8 text-white ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.3s" }}
                >
                  {slide.description}
                </h3>
                <div className="flex flex-col items-center gap-y-4 w-full max-w-md">
                  <Link
                    href={slide.buttonLink || "#"}
                    className={`slide-up-element bg-white w-full text-primary-500 px-8 py-3 hover:bg-opacity-90 transition transform ${isVisible ? "animate-slide-up" : ""}`}
                    style={{ animationDelay: "0.4s" }}
                  >
                    {slide.buttonText}
                  </Link>
                  {slide.buttonText2 && (
                    <Link
                      href={slide.buttonLink2 || "#"}
                      className={`slide-up-element bg-white  w-full text-primary-500 px-8 py-3 hover:bg-opacity-90 transition transform ${isVisible ? "animate-slide-up" : ""}`}
                      style={{ animationDelay: "0.5s" }}
                    >
                      {slide.buttonText2}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-col md:flex-row h-full w-full">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 bg-gradient-to-tl from-[#EEDEC3] via-[#EEDEC3]/40 via-[50%] to-[#EEDEC3]/10">
                <h2
                  className={`slide-up-element font-primary font-semibold text-3xl md:text-4xl mb-6 text-primary-500 ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.title}
                </h2>
                <h3
                  className={`slide-up-element font-light md:text-xl mb-8 text-primary-500 ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.3s" }}
                >
                  {slide.description}
                </h3>
                <div className="flex items-center gap-x-4">
                  <Link
                    href={slide.buttonLink || "#"}
                    className={`slide-up-element bg-primary-500 text-white px-8 py-3 hover:bg-opacity-90 transition transform ${isVisible ? "animate-slide-up" : ""}`}
                    style={{ animationDelay: "0.4s" }}
                  >
                    {slide.buttonText}
                  </Link>
                  {slide.buttonText2 && (
                    <Link
                      href={slide.buttonLink2 || "#"}
                      className={`slide-up-element bg-primary-500 text-white px-8 py-3 hover:bg-opacity-90 transition transform ${isVisible ? "animate-slide-up" : ""}`}
                      style={{ animationDelay: "0.4s" }}
                    >
                      {slide.buttonText2}
                    </Link>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                <Image
                  src={slide.image || ""}
                  alt={slide.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={currentSlide === 0}
                />
              </div>
            </div>
          </>
        );

      case "dual-background":
        return (
          <>
            <div className="lg:hidden relative h-full w-full bg-gray-100">
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.leftImage || ""}
                  alt={slide.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
                <p
                  className={`slide-up-element text-sm mb-1 uppercase tracking-wider text-white ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.1s" }}
                >
                  {slide.eyebrow}
                </p>
                <h2
                  className={`slide-up-element font-primary font-semibold text-3xl md:text-4xl mb-8 text-white text-shadow ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.title}
                </h2>
                <Link
                  href={slide.buttonLink || "#"}
                  className={`slide-up-element bg-white w-full md:w-auto max-w-sm text-primary-500 px-6 py-2 font-medium hover:bg-opacity-90 transition ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.3s" }}
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col md:flex-row h-full w-full">
              <div className="w-full md:w-1/2 relative flex items-end p-8 md:p-12 md:pb-28 bg-gray-100">
                <Image
                  src={slide.leftImage || ""}
                  alt={slide.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="bg-gradient-to-t from-primary-500 via-primary-500/90 via-[40%] to-transparent absolute inset-0"></div>
                <div className="relative z-10 text-white flex flex-col items-center text-center w-full">
                  <p
                    className={`slide-up-element text-sm mb-1 uppercase tracking-wider ${isVisible ? "animate-slide-up" : ""}`}
                    style={{ animationDelay: "0.1s" }}
                  >
                    {slide.eyebrow}
                  </p>
                  <h2
                    className={`slide-up-element font-primary font-semibold text-3xl md:text-4xl mb-8 text-shadow ${isVisible ? "animate-slide-up" : ""}`}
                    style={{ animationDelay: "0.2s" }}
                  >
                    {slide.title}
                  </h2>
                  <Link
                    href={slide.buttonLink || "#"}
                    className={`slide-up-element bg-white text-primary-500 px-6 py-2 font-medium hover:bg-opacity-90 transition ${isVisible ? "animate-slide-up" : ""}`}
                    style={{ animationDelay: "0.3s" }}
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative flex items-end p-8 md:p-12 md:pb-28 bg-gray-100">
                <Image
                  src={slide.rightImage || ""}
                  alt={slide.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="bg-gradient-to-t from-black via-black/80 via-[40%] to-transparent absolute inset-0"></div>
                <div className="relative z-10 text-white flex flex-col items-center text-center w-full">
                  <p
                    className={`slide-up-element text-sm mb-1 uppercase tracking-wider ${isVisible ? "animate-slide-up" : ""}`}
                    style={{ animationDelay: "0.1s" }}
                  >
                    {slide.eyebrow2}
                  </p>
                  <h2
                    className={`slide-up-element font-primary font-semibold text-3xl md:text-4xl mb-8 text-shadow ${isVisible ? "animate-slide-up" : ""}`}
                    style={{ animationDelay: "0.2s" }}
                  >
                    {slide.title2}
                  </h2>
                  <Link
                    href={slide.buttonLink2 || "#"}
                    className={`slide-up-element bg-white text-primary-500 px-6 py-2 font-medium hover:bg-opacity-90 transition ${isVisible ? "animate-slide-up" : ""}`}
                    style={{ animationDelay: "0.3s" }}
                  >
                    {slide.buttonText2}
                  </Link>
                </div>
              </div>
            </div>
          </>
        );

      case "triple-background":
        return (
          <>
            <div className="lg:hidden relative h-full w-full">
              <div className="absolute inset-0 z-0 bg-gray-100">
                <Image
                  src={slide.leftImage || ""}
                  alt={slide.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
                <h2
                  className={`slide-up-element font-primary font-semibold text-3xl md:text-4xl mb-6 text-white ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.title}
                </h2>
                <p
                  className={`slide-up-element font-light mb-8 text-white max-w-md ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.3s" }}
                >
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink || "#"}
                  className={`slide-up-element bg-white text-primary-500 px-8 py-3 w-full md:w-auto hover:bg-opacity-90 transition transform ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.4s" }}
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col md:flex-row h-full w-full">
              <div className="w-full md:w-1/3 h-48 md:h-auto relative bg-gray-100">
                <Image
                  src={slide.leftImage || ""}
                  alt="Left decoration"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-8 text-center bg-gradient-to-tl from-[#EEDEC3] via-[#EEDEC3]/40 via-[50%] to-[#EEDEC3]/10">
                <h2
                  className={`slide-up-element font-primary font-semibold text-3xl md:text-4xl mb-6 text-primary-500 ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.title}
                </h2>
                <p
                  className={`slide-up-element font-light mb-8 text-primary-500 max-w-md ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.3s" }}
                >
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink || "#"}
                  className={`slide-up-element bg-primary-500 text-white px-8 py-3 hover:bg-opacity-90 transition transform ${isVisible ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "0.4s" }}
                >
                  {slide.buttonText}
                </Link>
              </div>
              <div className="w-full md:w-1/3 h-48 md:h-auto relative bg-gray-100">
                <Image
                  src={slide.rightImage || ""}
                  alt="Right decoration"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </>
        );

      default:
        return <div>Slide layout not defined</div>;
    }
  };

  return (
    <div ref={heroRef} className="relative h-[93dvh] lg:h-[88dvh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {renderSlide(slide)}
        </div>
      ))}

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-10">
        <button
          className="text-primary-500 bg-white bg-opacity-50 p-1 rounded-full hover:bg-opacity-80 transition"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="flex">
          {slides.map((_, index) => (
            <CircularProgress
              key={index}
              progress={index === currentSlide ? progress : 0}
              index={index}
              isActive={index === currentSlide}
            />
          ))}
        </div>

        <button
          className="text-primary-500 bg-white bg-opacity-50 p-1 rounded-full hover:bg-opacity-80 transition"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
