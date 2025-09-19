import { Metadata } from "next";
import Image from "next/image";
import { blurDataURL } from "@/lib/utils/constants/blur-data-url";

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
    <div className="min-h-screen pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-10 md:mb-16">
          <h1 className="text-center font-primary text-3xl md:text-4xl font-semibold text-primary-500 mb-6">
            About Us
          </h1>
          <div className="relative -mx-4 md:mx-auto mb-10 md:mb-16">
            <Image
              src="https://res.cloudinary.com/enobasse/image/upload/v1756510665/package-box_faeatt.webp"
              alt="Eno Bassé packaging box"
              width={1200}
              height={600}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="w-full h-80 lg:h-96 object-cover bg-gray-100"
              priority
              loading="eager"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
          <div className="max-w-4xl mx-auto text-primary-400 leading-relaxed space-y-4">
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
            <ul className="list-disc list-outside space-y-2 text-primary-400 px-4">
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
        <div className="py-6 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="-mx-4 md:mx-auto flex justify-center lg:justify-start bg-gray-100">
              <Image
                src="https://res.cloudinary.com/enobasse/image/upload/v1756510664/founder_jcgqhh.webp"
                alt="Eno Bassé founder profile picture"
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>

            <div className="space-y-6">
              <h2 className="font-primary text-2xl md:text-3xl font-semibold text-primary-500 mb-8">
                Founder's Profile
              </h2>
              <div className="space-y-6 text-primary-400 leading-relaxed">
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
                <div className="mx-auto md:mx-0 mt-8 max-w-[200px] h-auto">
                  <Image
                    src="https://res.cloudinary.com/enobasse/image/upload/v1756510657/signature_vh5lg6.webp"
                    alt="Eno Bassé founder name signature"
                    width={200}
                    height={80}
                    sizes="(max-width: 768px) 50vw, 200px"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sourcing Section */}
        <div className="py-6 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 space-y-6">
              <h2 className="font-primary text-2xl md:text-3xl font-semibold text-primary-500 mb-8">
                Sourcing for Gemstones
              </h2>
              <div className="text-primary-400 leading-relaxed space-y-4">
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
            <div className="-mx-4 md:mx-auto flex justify-center lg:justify-start bg-gray-100 md:order-2">
              <Image
                src="https://res.cloudinary.com/enobasse/image/upload/v1756510665/sourcing-gemstone_iahzmq.webp"
                alt="Eno Bassé gemstones collection"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
          </div>
        </div>

        {/* Making Jewellery Section */}
        <div className="py-6 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="-mx-4 md:mx-auto flex justify-center lg:justify-start bg-gray-100">
              <Image
                src="https://res.cloudinary.com/enobasse/image/upload/v1756510665/making-the-jewlery_qeun0d.webp"
                alt="Eno Bassé jewellery making process"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-primary text-2xl md:text-3xl font-semibold text-primary-500 mb-8">
                Making the Jewellery
              </h2>
              <div className="text-primary-400 leading-relaxed space-y-4">
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
        <div className="py-6 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 space-y-6">
              <h2 className="font-primary text-2xl md:text-3xl font-semibold text-primary-500 mb-8">
                Dirt to Wealth
              </h2>
              <div className="text-primary-400 leading-relaxed space-y-4">
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
            <div className="-mx-4 md:mx-auto flex justify-center lg:justify-start bg-gray-100 md:order-2">
              <Image
                src="https://res.cloudinary.com/enobasse/image/upload/v1756510665/dirt-to-wealth_bx89m5.webp"
                alt="Eno Bassé Dirt to Wealth initiative"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
