export interface Post {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  excerpt: string;
  content: string;
  date: string;
  datetime: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: { src: string; alt: string };
}

export const blogPosts: Post[] = [
  {
    id: "gemstone-education",
    title: "Gemstone Education: Understanding Quality & Value",
    slug: "gemstone-education",
    excerpt:
      "Gemstones are highly prized for their beauty, durability, and rarity. Learn how to evaluate quality factors.",
    content: `
      # Gemstone Education: Understanding Quality & Value

      Gemstones captivate with their vibrant colors and unique characteristics. Whether you’re a collector, jewelry enthusiast, or first-time buyer, understanding the factors that determine quality and value is essential. Below, we break down the key aspects of gemstone evaluation, popular varieties, and tips for care.

      ## The 4 Cs of Gemstone Quality

      Like diamonds, colored gemstones are evaluated based on four critical factors: **color, clarity, cut, and carat weight**. Each plays a significant role in determining a gem’s beauty and rarity.

      1. **Color:**  Color is the most influential factor in a gemstone’s appeal. *[Explore our color grading guide](/color-grading) for a deeper dive.*

      2. **Clarity:** Most gemstones contain natural inclusions (internal flaws). Some gems, like emeralds, are expected to have inclusions, while others, like sapphires, are prized for clarity.

      ![Various gemstones displayed on velvet](/images/blog/content-01.png)

      3. **Cut:** A well-cut gemstone reflects light beautifully.

      4. **Carat Weight:** Larger gemstones are exponentially rarer, especially in high quality. However, color and clarity often matter more than size.

      ## Popular Gemstones & Their Significance

      Here are some of the most sought-after gemstones and their unique traits:

      ### Sapphires (September Birthstone)
      - **Colors**: Blue (most classic), pink, yellow, and "fancy" hues.
      - **Durability**: 9 on the Mohs scale (excellent for everyday wear).
      - *[Discover sapphire varieties](/gemstones/sapphires).*

      ### Rubies (July Birthstone)
      - **Colors**: Vivid red to deep crimson.
      - **Symbolism**: Associated with passion and protection.
      - *[Learn about ruby origins](/gemstones/rubies).*

      ### Emeralds (May Birthstone)
      - **Colors**: Rich green, often with visible inclusions ("jardin").
      - **Care**: Softer (7.5–8 Mohs), requiring gentle handling.
      - *[Explore emerald care tips](/gemstones/emeralds).*

      Other notable gems:
      - **Amethyst** (February birthstone) – Purple quartz, affordable and durable.
      - **Aquamarine** (March birthstone) – Pale blue, symbolizing tranquility.

      ## Gemstone Buying Tips

      1. **Prioritize Color:** Choose gems with vibrant, even coloration. Avoid overly dark or washed-out stones.

      2. **Check for Treatments:** Many gems are heat-treated or oiled to enhance appearance. Always ask for disclosure.

      3. **Consider Durability:** For rings or daily wear, opt for harder stones (e.g., sapphires, rubies). Softer gems (e.g., opals) suit pendants or earrings.

      4. **Verify Certification:** Reputable sellers provide lab reports (e.g., GIA, AGL) for high-value stones.

      ## Caring for Your Gemstones

      - **Cleaning**: Use mild soap and water for most gems. Avoid ultrasonic cleaners for fragile stones.
      - **Storage**: Keep gems separate to prevent scratches.
      - **Maintenance**: Remove jewelry during physical activities.

      ## Explore More

      - [Gemstone Glossary](/glossary) – Key terms explained.
      - [Rare Gemstones](/rare-gemstones) – Discover extraordinary varieties.
      `,
    image: {
      src: "/images/blog/post-01.png",
      alt: "Various gemstones displayed on velvet",
    },
    author: {
      name: "Helen David",
      role: "Head Gemologist",
      avatar: "/images/authors/helen-david.jpg",
    },
    date: "February 16th, 2025",
    datetime: "2025-02-16",
    readingTime: "4 min read",
    tags: ["gemstones", "buying guide", "birthstones"],
  },
  {
    id: "jewelry-care",
    title: "The Complete Jewelry Care Guide",
    slug: "jewelry-care",
    excerpt:
      "Professional tips to maintain your jewelry's brilliance for generations.",
    content: `
      # The Complete Jewelry Care Guide

      Proper jewelry care extends the life of your precious pieces. Follow these expert recommendations from our master jewelers.

      ## Daily Care Essentials

      ### Storage Solutions

      ![Jewelry storage organization](/images/blog/content-01.png "Proper Storage")

      - Keep pieces separated to prevent scratching
      - Use [anti-tarnish strips](/products/anti-tarnish) for silver
      - Store chains fastened to prevent tangling
      - Consider fabric-lined compartments or individual pouches

      ### Wearing Precautions

      - Apply cosmetics and perfume before putting on jewelry
      - Remove jewelry before swimming or exercising
      - Take off rings when doing manual work

      ## Cleaning Techniques

      ### Professional Methods

      ![Ultrasonic jewelry cleaner](/images/blog/content-02.png "Professional Cleaning")

      - [Ultrasonic cleaners](/products/cleaners): Safe only for certain metals/stones
      - Steam cleaning for durable gemstones
      - Professional polishing services

      ### At-Home Care

      - DIY solution: Mild soap + warm water with soft brush
      - Baking soda paste for stubborn dirt (avoid on porous stones)
      - Microfiber cloth for quick shine

      ## Material-Specific Care

      ### Gold Jewelry

      ![Gold jewelry collection](/images/blog/content-01.png "Gold Care")

      - 18k gold requires gentler handling than 14k
      - Avoid exposing to mercury or chlorine
      - Polish with specialized gold cloth

      ### Silver Jewelry

      - Use silver polishing cloth regularly
      - Store with anti-tarnish paper
      - Consider professional dip cleaning

      ## Maintenance Schedule

      ### Annual Checkups

      - Have prongs checked annually
      - Inspect for loose stones
      - Check chain links and clasps

      ### Special Treatments

      - Re-rhodium plating for white gold every 2-3 years
      - Pearl re-stringing every few years
      - Deep cleaning for heavily worn pieces

      ## Emergency Situations

      ### Damage Control

      ![Broken jewelry repair](/images/blog/content-01.png "Repair Example")

      - What to do if a stone falls out
      - Handling broken chains
      - Dealing with bent prongs

      ### Professional Help

      - When to visit a jeweler immediately
      - Insurance claim documentation
      - Restoration options for heirlooms

      ## Final Thoughts

      Proper care preserves both the beauty and value of your jewelry. Book a [professional inspection](/services/inspection) annually for optimal maintenance.
    `,
    image: {
      src: "/images/blog/post-02.png",
      alt: "Person cleaning a ring with soft cloth",
    },
    author: {
      name: "Michael Stone",
      role: "Master Jeweler",
      avatar: "/images/authors/michael-stone.jpg",
    },
    date: "March 5th, 2025",
    datetime: "2025-03-05",
    readingTime: "8 min read",
    tags: ["cleaning", "storage", "repairs", "gold", "silver", "maintenance"],
  },
  {
    id: "engagement-rings",
    title: "Choosing the Perfect Engagement Ring: Ultimate Guide",
    slug: "engagement-rings",
    excerpt:
      "Navigate ring styles, diamond shapes, and metal choices for your proposal.",
    content: `
      # Choosing the Perfect Engagement Ring: Ultimate Guide

      ![Couple trying engagement rings](/images/content-02.png "Ring Shopping Experience")

      Finding the perfect engagement ring involves understanding key factors from diamond quality to personal style preferences. This guide covers everything you need to know.

      ## Diamond Essentials

      ### The 4 Cs Explained

      ![Diamond grading chart](/images/content-01.png "Diamond Quality Chart")

      - **Cut**: Quality of facets and proportions (Excellent/Ideal > Very Good > Good)
      - **Color**: D (colorless) to Z (light color) grading scale
      - **Clarity**: FL (flawless) to I3 (included) clarity grades
      - **Carat**: Weight measurement (1 carat = 0.2 grams)

      ### Shape Comparison

      ![Comparison of diamond shapes](/images/blog/content-01.png "Diamond Shape Guide")

      - **Round Brilliant**: 58 facets maximize sparkle (most popular)
      - **Princess Cut**: Modern square shape with excellent fire
      - **Emerald Cut**: Step cuts show clarity (rectangular facets)
      - **Cushion Cut**: Romantic vintage appeal with large facets

      ## Metal Options

      ### Popular Choices

      ![Metal comparison chart](/images/blog/content-02.png "Metal Options")

      - **Platinum**: Naturally white, hypoallergenic, durable
      - **White Gold**: Rhodium-plated for bright white appearance
      - **Rose Gold**: Copper alloy creates warm pink hue
      - **Yellow Gold**: Classic look (14k or 18k options)

      ### Durability Factors

      - Platinum: Develops patina over time
      - Gold: Softer but easier to polish
      - Maintenance requirements for each type

      ## Ring Styles

      ### Setting Types

      ![Ring setting styles](/images/blog/content-02.png "Setting Options")

      - **Solitaire**: Single stone highlights diamond
      - **Halo**: Center stone surrounded by smaller diamonds
      - **Three-Stone**: Represents past, present, future
      - **Vintage**: Intricate milgrain or filigree details

      ### Band Designs

      - Comfort fit vs. standard bands
      - Matching wedding band considerations
      - Engraving options and ideas

      ## Budget Planning

      ### Cost Factors

      ![Price comparison chart](/images/blog/content-01.png "Budget Guide")

      - Diamond: 40-60% of total cost
      - Metal: 20-30% of total cost
      - Setting: 20-30% of total cost

      ### Smart Saving Tips

      - Consider lab-grown diamonds (30-40% less expensive)
      - Prioritize cut quality over carat size
      - Look for GIA/AGS certified diamonds

      ## Sizing & Comfort

      ### Getting Measured

      ![Ring sizing guide](/images/blog/content-02.png "Size Chart")

      - Professional sizing vs. at-home methods
      - Seasonal finger size fluctuations
      - Wide vs. narrow band comfort

      ### Resizing Considerations

      - Which metals are easiest to resize
      - Limitations for eternity bands
      - Typical resizing costs

      ## Proposal Planning

      ### Ring Insurance

      ![Insurance documentation](/images/blog/content-01.png "Protection Plan")

      - Appraisal requirements
      - Rider policies vs. standalone coverage
      - Typical annual costs (1-2% of value)

      ### Presentation Ideas

      - Classic ring box options
      - Creative proposal displays
      - Travel considerations

      ## After Purchase Care

      ### Maintenance Schedule

      ![Ring cleaning kit](/images/blog/content-01.png "Care Products")

      - Professional cleanings (every 6 months)
      - Prong tightening (annually)
      - Rhodium replating (every 2-3 years for white gold)

      ### Lifestyle Considerations

      - Activities to avoid while wearing
      - Travel safety tips
      - Workplace wearability

      ## Final Checklist

      ![Engagement ring checklist](/images/blog/content-02.png "Buying Guide")

      - [ ] Determine budget range
      - [ ] Research diamond education
      - [ ] Try different shapes and settings
      - [ ] Get proper sizing
      - [ ] Consider insurance options
      - [ ] Plan presentation style

      Ready to start shopping? [Book a consultation](/appointments) with our bridal specialists.
    `,
    image: {
      src: "/images/blog/post-03.png",
      alt: "Diamond engagement ring on velvet",
    },
    author: {
      name: "Sarah Johnson",
      role: "Bridal Specialist",
      avatar: "/images/authors/sarah-johnson.jpg",
    },
    date: "April 12th, 2025",
    datetime: "2025-04-12",
    readingTime: "12 min read",
    tags: [
      "engagement",
      "diamonds",
      "proposal",
      "wedding",
      "ring styles",
      "diamond education",
    ],
  },
  {
    id: "vintage-jewelry",
    title: "The History of Vintage Jewelry: 1920s to Today",
    slug: "vintage-jewelry",
    excerpt:
      "How jewelry design evolved through Art Deco, Retro, and Modern eras.",
    content: `
      # The History of Vintage Jewelry: 1920s to Today

      The evolution of vintage jewelry tells a fascinating story of cultural shifts, technological advancements, and artistic movements. Each decade brought distinct design philosophies that reflected the social climate of its time, creating wearable art that continues to inspire contemporary designers. From the geometric precision of Art Deco to the bold statements of the Retro period, these styles offer collectors a tangible connection to history.

      ## The Art Deco Era (1920s-1930s)

      ![Collection of vintage jewelry pieces](/images/blog/content-02.png "Vintage jewelry timeline display")

      The Art Deco period (1920-1939) emerged as a radical departure from the flowing organic forms of Art Nouveau, embracing instead the machine-age aesthetic of geometric precision. Characterized by symmetrical patterns, stepped forms, and dramatic contrasts, this style was heavily influenced by the 1922 discovery of Tutankhamun's tomb, which sparked an Egyptomania seen in scarab motifs and lotus flower designs. Jewelers like Cartier and Van Cleef & Arpels pioneered the use of platinum settings with calibré-cut colored gemstones, creating the distinctive "pave" look where stones covered nearly every surface. The era's cocktail rings and long sautoir necklaces perfectly complemented the flapper style, while the development of new diamond cutting techniques allowed for unprecedented brilliance.

      ## The Retro Period (1940s-1950s)

      ![Retro rose gold brooch](/images/blog/content-01.png "1940s rose gold floral brooch")

      During the wartime 1940s, jewelry design underwent a dramatic transformation as platinum was declared a strategic metal and rationed. This led to the rise of rose gold and the creation of bold, three-dimensional pieces that often incorporated patriotic motifs like flags and victory symbols. The post-war Retro style (1945-1960) saw an explosion of chunky, sculptural designs featuring oversized curves and nature-inspired elements. Notable characteristics include the prominent use of cabochon-cut gemstones, especially moonstones and aquamarines, and the introduction of flexible "snake" chains that moved with the wearer. Designers like David Webb began incorporating animal motifs with playful sophistication, while the development of new gold alloys allowed for more durable yet expressive pieces.

      ## Mid-Century Modern (1960s-1970s)

      ![Opal and diamond cocktail ring](/images/blog/content-02.png "1970s statement cocktail ring")

      The 1960s and 70s witnessed a rebellion against traditional jewelry conventions, with designers embracing organic asymmetry and mixed materials. This period saw the rise of "cocktail" jewelry - bold, colorful pieces meant to be noticed, often featuring large citrines, amethysts, and other semi-precious stones in unconventional settings. The space race influenced cosmic motifs, while the hippie movement popularized natural materials like turquoise, coral, and wood. Italian designers like Bulgari pioneered the "tremblant" technique where elements moved with the wearer's motion, and the introduction of new diamond cuts like the princess cut in 1979 revolutionized stone shapes. This era also saw the beginning of designer signatures becoming status symbols, with houses like Tiffany & Co. creating instantly recognizable collections.

      ## Collecting Vintage Jewelry Today

      ![Expert examining vintage piece](/images/blog/content-01.png "Jewelry authentication process")

      When collecting vintage jewelry, condition, provenance, and hallmarks significantly affect value. Art Deco pieces with original craftsmanship and scarce materials like rock crystal command premium prices, while signed Retro pieces from renowned houses have seen steady appreciation. The 1970s "studio jewelry" movement, where artists created one-of-a-kind pieces, has recently gained collector interest. Always examine for: original stone settings (look for wear around prongs), consistent patina on metals, and clear manufacturer stamps inside bands or clasps. Our certified appraisers recommend focusing on pieces that speak to your personal style while maintaining investment potential - transitional pieces that show design evolution between eras often offer the best balance.

      [Explore our curated vintage collection](/collections/vintage) featuring authenticated pieces from each historical period, complete with certificates of authenticity and detailed provenance records.
    `,
    image: {
      src: "/images/blog/post-01.png",
      alt: "Collection of vintage jewelry pieces through the decades",
    },
    author: {
      name: "Emma Wilson",
      role: "Vintage Curator",
      avatar: "/images/authors/emma-wilson.jpg",
    },
    date: "May 8th, 2025",
    datetime: "2025-05-08",
    readingTime: "8 min read",
    tags: [
      "vintage",
      "art deco",
      "antique",
      "retro",
      "collecting",
      "jewelry history",
    ],
  },
  {
    id: "victorian-jewelry",
    title: "The Romance of Victorian Jewelry: 1837-1901",
    slug: "victorian-jewelry",
    excerpt:
      "Explore the sentimental symbolism and intricate craftsmanship of jewelry from Queen Victoria's reign.",
    content: `
      # The Romance of Victorian Jewelry: 1837-1901

      ![Victorian parure set with cameos](/images/blog/content-01.png "Gold and cameo parure circa 1860")

      The Victorian era produced some of the most emotionally expressive jewelry in history, with pieces serving as wearable diaries of love, mourning, and personal milestones. Lasting through Queen Victoria's reign (1837-1901), this period saw dramatic stylistic shifts that mirrored the monarch's life stages—from the exuberant Early Victorian years to the somber Mid-Victorian mourning period, culminating in the eclectic Late Victorian aesthetic. These pieces remain highly collectible today for their intricate handcrafted details and poignant symbolism.

      ## Early Victorian/Romantic Period (1837-1860)

      ![Gold serpent bracelet with emerald eyes](/images/blog/content-02.png "Prince Albert's serpent motif bracelet")

      The early Victorian era celebrated nature and romance through delicate filigree work and symbolic motifs. Jewelry from this period often featured:
      - **Serpent designs**: Popularized by Prince Albert's engagement ring to Victoria, symbolizing eternal love
      - **Floral elements**: Handcrafted forget-me-nots and ivy representing fidelity
      - **Cameos**: Intricately carved shell or lava stone portraits in neo-Classical style
      - **Acrostic jewelry**: Hidden messages spelled with gemstone initials (e.g., "DEAREST" using Diamond, Emerald, Amethyst, Ruby, Emerald, Sapphire, Topaz)

      The development of electroplating in 1840 made gold jewelry more accessible, while the discovery of Australian gold fields in 1851 transformed material availability.

      ## Mid-Victorian/Grand Period (1861-1880)

      ![Jet mourning brooch with hairwork](/images/blog/content-01.png "Black jet memorial brooch")

      Following Prince Albert's death in 1861, jewelry took on solemn tones with these distinctive features:
      - **Mourning jewelry**: Black jet, onyx, and vulcanite pieces often incorporating the deceased's hair
      - **Whitby jet**: Carved from fossilized coal, this lightweight material became synonymous with mourning wear
      - **Memorial rings**: Featuring enameled skulls or coffin motifs with birth/death dates
      - **Scottish pebble jewelry**: Agate and quartz pieces set in sterling silver from Queen Victoria's Balmoral estate

      The 1867 discovery of South African diamonds stabilized gemstone supplies, leading to more elaborate stone arrangements in memorial pieces.

      ## Late Victorian/Aesthetic Period (1881-1901)

      ![Multicolored gold bangle with gems](/images/blog/content-01.png "Egyptian Revival bracelet with scarabs")

      As mourning conventions relaxed, jewelry embraced exotic influences and technical innovations:
      - **Egyptian Revival**: Scarabs and lotus motifs following 1882 British occupation of Egypt
      - **Japanese inspiration**: Cherry blossoms and asymmetrical designs after 1853 Japan trade opening
      - **Novelty pieces**: Movable charms, secret compartments, and optical illusion settings
      - **Diamond advancements**: Introduction of the Old European Cut (precursor to modern brilliant cuts)

      The development of the oxyacetylene torch in 1897 allowed more precise platinum work, foreshadowing Edwardian styles.

      ## Collecting Victorian Jewelry Today

      ![Magnified view of hallmarks](/images/blog/content-02.png "18k gold hallmark inspection")

      When acquiring Victorian pieces, consider these factors:
      - **Condition**: Expect some wear but avoid replaced stones or altered settings
      - **Hallmarks**: Look for British duty marks (pre-1890) or purity stamps
      - **Materials**: Authentic jet feels warm to touch and shows wood-like grain
      - **Provenance**: Family pieces with documentation command premium values

      [View our curated Victorian collection](/collections/victorian), each piece professionally authenticated and accompanied by a detailed history report.
    `,
    image: {
      src: "/images/blog/post-02.png",
      alt: "Collage of Victorian rings, brooches and necklaces spanning 1837-1901",
    },
    author: {
      name: "Eleanor Blackwood",
      role: "Antique Jewelry Specialist",
      avatar: "/images/authors/eleanor-blackwood.jpg",
    },
    date: "June 15th, 2025",
    datetime: "2025-06-15",
    readingTime: "9 min read",
    tags: [
      "victorian",
      "antique",
      "mourning jewelry",
      "cameo",
      "history",
      "collecting",
    ],
  },
];
