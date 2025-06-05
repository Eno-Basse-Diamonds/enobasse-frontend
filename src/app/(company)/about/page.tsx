import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import "./styles.scss";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the legacy of Eno Basse - artisan-crafted fine jewelry blending traditional techniques with contemporary design.",
  keywords: ["Eno Basse history", "About Eno Basse"],
  openGraph: {
    title: "About Us - Eno Basse Diamonds",
    description:
      "Eno Basse has created quality jewelry using time-honored techniques and exceptional gemstones.",
    url: "https://www.enobasse.com/about",
  },
  twitter: {
    title: "About Us - Eno Basse Diamonds",
    description: "Meet the artisan behind our quality creations.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/about",
  },
};

export default function AboutUsPage() {
  return (
    <div className="about-page">
      <div className="about-page__container">
        {/* Hero Section */}
        <div className="about-page__header">
          <h1 className="about-page__title">About Us</h1>
          <div className="about-page__hero">
            <Image
              src="/images/about/package-box.webp"
              alt="Eno Basse packaging box"
              height={1000}
              width={500}
              className="about-page__hero-image"
              quality={100}
            />
          </div>
          <div className="about-page__content">
            <p>
              Eno Basse Gemstones and Allied Services is a registered company
              founded in 2021 by Eyakenoabasi Bob. We are a jewellery design
              company where unique and timeless pieces are created. Eno Basse
              was founded with the vision of procuring gemstones to create
              gorgeous, one-of-a-kind jewellery. Each piece is a true work of
              art made with the world's finest and most precious gems. We have
              access to over 1.5 million GIA certified diamonds, which are
              embodied in our stunning creations.
            </p>
            <p>
              We are devoted to creating unique, innovative and quality
              jewellery pieces.
            </p>
            <ul className="about-page__section-list">
              <li>
                To bestow that bride-to-be with the perfect engagement ring;
              </li>
              <li>
                To create the ideal wedding rings for couples that'll signify
                their love;
              </li>
              <li>To craft the perfect jewellery gifts;</li>
              <li>To design antique jewellery that'll last a lifetime and</li>
              <li>To create jewellery pieces that match your lifestyle.</li>
            </ul>
          </div>
        </div>

        {/* Founder Section */}
        <div className="about-page__founder">
          <div className="about-page__founder-container">
            <div className="about-page__founder-image">
              <Image
                src="/images/about/founder.webp"
                alt="Eno Basse founder profile picture"
                height={1000}
                width={500}
                quality={100}
              />
            </div>

            <div className="about-page__founder-info">
              <h2 className="about-page__founder-info-title">
                Founder's Profile
              </h2>
              <div className="about-page__founder-info-content">
                <p>
                  Eyakenoabasi Bob is Nigerian Jewellery Designer born on August
                  27. Like her birthstones, Peridot, Spinel and Sardonyx, she is
                  vibrant and unique in her creativity and ability to transform
                  rough crystals into precious, stunning gemstones. Engineer,
                  Gemologist, Jeweler and Goldsmith, Eyak has had a keen
                  interest in gemstones since she was a little girl watching her
                  mother sell jewellery.
                </p>
                <p>
                  She has an eye for spotting beautiful gemstones and
                  transforming them into innovative designs. After obtaining her
                  Bachelors' Degree in Civil Engineering at Swansea University,
                  Wales and her Masters' degree in Project Management at Keele
                  University, England, Eyak pursued her passion for gemstones by
                  getting certified as a Goldsmith at Alchimia Contemporary
                  Jewellery School, Italy and a Gemologist (Gemstones, Pearls
                  and Diamonds) at the Gemological Institute of America (GIA),
                  California.
                </p>
                <p>
                  Eyak channels her expertise and creativity into sourcing for
                  excellent and rare gemstones to create astonishing jewellery.
                  Asides her passion for designing one-of-a-kind fine jewellery,
                  she is also keen on educating the youth and women on
                  gemstones, precious stones and metals. Unimpressed with the
                  lack of awareness about the mass potentials of the mining
                  sector in Nigeria, Eyak seeks to enlighten as many youths and
                  women as possible on Africa's Gemstones, Precious stones &
                  metals and the value added services associated with them
                  through an initiative she founded called "Dirt to Wealth."
                </p>
                <p>
                  She has partnered with the Ministry of Mines and the National
                  Directorate of Employment to ensure that structures are put in
                  place and training centers are established for the Dirt to
                  Wealth Initiative. Eyak is very ambitious and she possesses
                  the zeal, talent and qualifications required to grow her brand
                  successfully
                </p>
                <div className="about-page__founder-info-signature">
                  <Image
                    src="/images/about/signature.webp"
                    alt="Eno Basse founder name signature"
                    height={100}
                    width={200}
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sourcing Section */}
        <div className="about-page__section">
          <div className="about-page__section-container">
            <div className="about-page__section-content">
              <h2 className="about-page__section-title">
                Sourcing for Gemstones
              </h2>
              <div className="about-page__section-text">
                <p>
                  Gemstones are a luxury with so much value which is why the Eno
                  Basse team prioritizes ethical mining and sourcing of
                  gemstones from local artisanal miners. After the gemstones are
                  extracted, they are cut and transformed into timeless and
                  colorful pieces used for jewellery designs.
                </p>
                <p>
                  Contact the Eno Basse team today and let us create a
                  masterpiece together.
                </p>
              </div>
            </div>
            <div className="about-page__section-image">
              <Image
                src="/images/about/sourcing-gemstone.webp"
                alt="Eno Basse gemstones collection"
                height={600}
                width={800}
                quality={100}
              />
            </div>
          </div>
        </div>

        {/* Making Jewellery Section */}
        <div className="about-page__section">
          <div className="about-page__section-container">
            <div className="about-page__section-image">
              <Image
                src="/images/about/making-the-jewlery.webp"
                alt="Eno Basse jewellery making process"
                height={600}
                width={800}
                quality={100}
              />
            </div>
            <div className="about-page__section-content">
              <h2 className="about-page__section-title">
                Making the Jewellery
              </h2>
              <div className="about-page__section-text">
                <p>
                  You know the saying that goes, "Diamonds are a girl's best
                  friend"? Well, it's absolutely true! When perfectly cut and
                  transformed into a piece of jewellery, diamonds undoubtedly
                  add a touch of uniqueness and glamour to one's style.
                </p>
                <p>
                  Here at Eno Basse, we work with our clients to turn the
                  designs they have envisioned into reality.
                </p>
                <p>
                  Our craftsmen work with the finest materials with the sole aim
                  of attaining perfection in every jewellery piece.
                </p>
                <p>
                  Cutting gemstones require expertise that our craftsmen possess
                  which gives us the opportunity to create excellent cut gems.
                </p>
                <p>
                  Creativity, Uniqueness and Quality are the core of our
                  company's existence. We create antique jewellery that can be
                  passed down many generations, something sort of a family
                  heirloom.
                </p>
                <p>
                  Eno Basse is definitely your guaranteed plug for Jewellery
                  design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Section */}
        <div className="about-page__section">
          <div className="about-page__section-container">
            <div className="about-page__section-content">
              <h2 className="about-page__section-title text-center">
                Consultation
              </h2>
              <div className="about-page__section-cards">
                <div className="about-page__section-card">
                  <h3 className="about-page__section-card-title">
                    Jewellery Design
                  </h3>
                  <div className="about-page__section-card-content">
                    <p>
                      Selecting the perfect stone and jewellery design is not
                      the easiest task which is why the Eno Basse team is here
                      to assist you every step of the way. We offer consultation
                      services to assist clients in finding the right gemstones
                      to suit their needs.
                    </p>
                    <p>
                      Every piece of jewellery tells a story... From glittering
                      necklaces to radiant rings, we lead you to the perfect
                      jewellery to tell your story, the best expression of you.
                    </p>
                    <p>
                      Our team consists of artisans with over 50 years of
                      experience and a wide range of expertise who are eager to
                      help you find and design the perfect piece.
                    </p>
                  </div>
                </div>

                <div className="about-page__section-card">
                  <h3 className="about-page__section-card-title">
                    Gemstones and Diamonds
                  </h3>
                  <div className="about-page__section-card-content">
                    <p>
                      Gemstones are highly prized for beauty, durability, and
                      rarity. They are categorized into precious and
                      semi-precious.
                    </p>
                    <p>
                      Diamond is a solid form of pure carbon with its atoms
                      arranged in a crystal, one of nature's most precious and
                      beautiful creations.
                    </p>
                    <p>
                      Eno Basse offers consultation services, providing detailed
                      pricing and value information for evaluating gemstones and
                      diamonds.
                    </p>
                    <p>
                      All you need to know about these stones and how they can
                      become profitable for you.
                    </p>
                  </div>
                </div>

                <div className="about-page__section-card">
                  <h3 className="about-page__section-card-title">
                    Precious Metals
                  </h3>
                  <div className="about-page__section-card-content">
                    <p>
                      Precious metals are rare, naturally occurring chemical
                      element that have high economic value and are chemically
                      resistant. The best known precious metals are Gold and
                      Silver.
                    </p>
                    <p>
                      At Eno Basse, our team provides all the information our
                      clients may require about these precious metals and offer
                      advice that they seek.
                    </p>
                  </div>
                </div>

                <div className="about-page__section-card">
                  <h3 className="about-page__section-card-title">
                    Allied Services
                  </h3>
                  <div className="about-page__section-card-content">
                    <p>
                      Eno Basse offers consultation services on all allied
                      services associated with Gemstones such as identification,
                      sourcing, cutting, marketing and exportation of gemstones,
                      precious stones and metals.
                    </p>
                  </div>
                </div>

                <div className="about-page__section-card">
                  <h3 className="about-page__section-card-title">
                    Lapidary Workshops
                  </h3>
                  <div className="about-page__section-card-content">
                    <p>
                      A lapidary workshop is a center for cutting or polishing
                      of stones and gems. Our team offers advice on
                      establishments of these workshops, the requirements and
                      also respond to other enquiries our clients may have.
                    </p>
                  </div>
                </div>

                <div className="about-page__section-card">
                  <h3 className="about-page__section-card-title">
                    Gold Refinery Factories
                  </h3>
                  <div className="about-page__section-card-content">
                    <p>
                      Before you melt down gold for jewellery making, you have
                      to consider your gold refining options carefully.
                    </p>
                    <p>
                      You want to ensure that your gold is being handled with
                      absolute care and by the right people.
                    </p>
                    <p>
                      Eno Basse offers consultation services on Gold refineries.
                    </p>
                  </div>
                </div>

                <div className="about-page__section-card">
                  <h3 className="about-page__section-card-title">
                    Gold Purification
                  </h3>
                  <div className="about-page__section-card-content">
                    <p>The value of gold depends on its purity.</p>
                    <p>
                      Gold purification is a tactical and complex process which
                      requires expertise in order to be carried out excellently.
                    </p>
                    <p>
                      Our highly experienced team offer sound advice on gold
                      purification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dirt to Wealth Section */}
        <div className="about-page__section">
          <div className="about-page__section-container">
            <div className="about-page__section-image">
              <Image
                src="/images/about/dirt-to-wealth.webp"
                alt="Eno Basse Dirt to Wealth initiative"
                height={600}
                width={800}
                quality={100}
              />
            </div>
            <div className="about-page__section-content">
              <h2 className="about-page__section-title">Dirt to Wealth</h2>
              <div className="about-page__section-text">
                <p>
                  Eno Basse offers a training programme on the identification of
                  African gems, how to source for them, how to cut them and how
                  to market them. The training also covers exportation, trading
                  and other value added services associated with these
                  gemstones.
                </p>
                <p>
                  Dirt to Wealth is an initiative founded by Eyakenoabasi Bob
                  with the aim of training and educating the youths and women on
                  gemstones, precious stones & metals.
                </p>
                <p>
                  The mining industry is an underappreciated sector in Nigeria
                  and many people do not know the value of these gemstones.
                </p>
                <p>
                  The Dirt to Wealth initiative serves to highlight the mass
                  potentials in the mining sector and also benefit the economy
                  by creating job opportunities and reducing the dependence on
                  the oil and gas sector to generate national income.
                </p>
                <p>
                  She is partnering with the Ministry of Mines and the National
                  Directorate of Employment to establish structures and training
                  centers for the Dirt to Wealth Initiative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
