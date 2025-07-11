import { Metadata } from "next";
import Image from "next/image";
import "./styles.scss";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the legacy of Eno Bassé - artisan-crafted fine jewelry blending traditional techniques with contemporary design.",
  keywords: ["Eno Bassé history", "About Eno Bassé"],
  openGraph: {
    title: "About Us - Eno Bassé Diamonds",
    description:
      "Eno Bassé has created quality jewelry using time-honored techniques and exceptional gemstones.",
    url: "https://www.enobasse.com/about",
  },
  twitter: {
    title: "About Us - Eno Bassé Diamonds",
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
              alt="Eno Bassé packaging box"
              height={800}
              width={800}
              className="about-page__hero-image bg-gray-100"
              quality={100}
            />
          </div>
          <div className="about-page__content">
            <p>
              Eno Bassé Gemstones and Allied Services is a registered company
              founded in 2021 by Eyakenoabasi Bob. We are a jewellery design
              company where unique and timeless pieces are created. Eno Bassé
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
                alt="Eno Bassé founder profile picture"
                height={1500}
                width={1500}
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
                    alt="Eno Bassé founder name signature"
                    height={1500}
                    width={1500}
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
            <div className="about-page__section-content order-2">
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
                  Contact the Eno Bassé team today and let us create a
                  masterpiece together.
                </p>
              </div>
            </div>
            <div className="about-page__section-image md:order-2">
              <Image
                src="/images/about/sourcing-gemstone.webp"
                alt="Eno Bassé gemstones collection"
                height={1500}
                width={1500}
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
                alt="Eno Bassé jewellery making process"
                height={1500}
                width={1500}
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
                  Here at Eno Bassé, we work with our clients to turn the
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
                  Eno Bassé is definitely your guaranteed plug for Jewellery
                  design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dirt to Wealth Section */}
        <div className="about-page__section">
          <div className="about-page__section-container">
            <div className="about-page__section-content order-2">
              <h2 className="about-page__section-title">Dirt to Wealth</h2>
              <div className="about-page__section-text">
                <p>
                  Eno Bassé offers a training programme on the identification of
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
            <div className="about-page__section-image  md:order-2">
              <Image
                src="/images/about/dirt-to-wealth.webp"
                alt="Eno Bassé Dirt to Wealth initiative"
                height={1500}
                width={1500}
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
