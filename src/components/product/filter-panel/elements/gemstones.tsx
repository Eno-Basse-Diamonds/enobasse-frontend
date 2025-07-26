import * as motion from "motion/react-client";
import { DiamondIcon } from "@/components/icons";
import { FilterOption } from "@/lib/types/products";

const hoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

interface GemstonesProps {
  selectedFilters: FilterOption[];
  toggleFilter: (metal: FilterOption) => void;
}

export const Gemstones: React.FC<GemstonesProps> = ({
  selectedFilters,
  toggleFilter,
}) => {
  const gemstones: FilterOption[] = [
    { name: "Diamond", type: "gemstone", color: "text-gray-300" },
    { name: "Ruby", type: "gemstone", color: "text-red-600" },
    { name: "Sapphire", type: "gemstone", color: "text-blue-700" },
    { name: "Emerald", type: "gemstone", color: "text-green-600" },
    { name: "Moissanite", type: "gemstone", color: "text-gray-400" },
    { name: "Pearl", type: "gemstone", color: "text-amber-300" },
    { name: "Tourmaline", type: "gemstone", color: "text-pink-500" },
    { name: "Malachite", type: "gemstone", color: "text-green-500" },
    { name: "Tiger's Eye", type: "gemstone", color: "text-amber-600" },
  ];

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
