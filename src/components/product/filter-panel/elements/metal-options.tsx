import Image from "next/image";
import * as motion from "motion/react-client";

const hoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

interface FilterOption {
  name: string;
  type: "metal" | "gemstone";
  image?: {
    src: string;
    alt: string;
  };
  color?: string;
}

interface MetalOptionProps {
  metalOptions: FilterOption[];
  selectedFilters: FilterOption[];
  toggleFilter: (metal: FilterOption) => void;
}

export const MetalOptions: React.FC<MetalOptionProps> = ({
  metalOptions,
  selectedFilters,
  toggleFilter
}) => {
  return (
    <div className="product-filter-panel__filter-section">
      <h3 className="product-filter-panel__title">Metal Options</h3>
      <div className="product-filter-panel__options">
        {metalOptions.map((metal) => (
          <motion.label
            key={metal.name}
            whileHover="hover"
            variants={hoverVariants}
            className={`product-filter-panel__option ${
              selectedFilters.some((f) => f.name === metal.name)
                ? "bg-gray-100"
                : ""
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedFilters.some((f) => f.name === metal.name)}
              onChange={() => toggleFilter(metal)}
            />
            <motion.div
              whileHover={{ rotate: 5 }}
              className="product-filter-panel__icon"
            >
              <Image
                src={metal.image!.src}
                alt={metal.image!.alt}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </motion.div>
            <span className="product-filter-panel__label">{metal.name}</span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};
