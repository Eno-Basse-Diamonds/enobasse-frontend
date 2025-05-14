import * as motion from "motion/react-client";
import { DiamondIcon } from "@/components/icons";

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

interface GemstonesProps {
  gemstones: FilterOption[];
  selectedFilters: FilterOption[];
  toggleFilter: (metal: FilterOption) => void;
}

export const Gemstones: React.FC<GemstonesProps> = ({
  gemstones,
  selectedFilters,
  toggleFilter,
}) => {
  return (
    <div className="product-filter-panel__filter-section product-filter-panel__filter-section--last">
      <h3 className="product-filter-panel__title">Gemstones</h3>
      <div className="product-filter-panel__options">
        {gemstones.map((gemstone) => (
          <motion.label
            key={gemstone.name}
            whileHover="hover"
            variants={hoverVariants}
            className={`product-filter-panel__option ${
              selectedFilters.some((f) => f.name === gemstone.name)
                ? "bg-gray-100"
                : ""
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedFilters.some((f) => f.name === gemstone.name)}
              onChange={() => toggleFilter(gemstone)}
            />
            <motion.div
              whileHover={{ rotate: 10 }}
              className="product-filter-panel__icon product-filter-panel__icon--gemstone"
            >
              <DiamondIcon className={`w-10 h-10 ${gemstone.color}`} />
            </motion.div>
            <span className="product-filter-panel__label">{gemstone.name}</span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};
