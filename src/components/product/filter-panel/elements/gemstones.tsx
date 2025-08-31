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
    <div className="pb-4 lg:pb-8 pt-8">
      <h3 className="text-base font-semibold mb-4">Gemstones</h3>
      <div className="grid grid-cols-4 lg:grid-cols-3 gap-3">
        {gemstones.map((gemstone) => (
          <motion.label
            key={gemstone.name}
            whileHover="hover"
            variants={hoverVariants}
            className={`flex flex-col items-center gap-2 p-3 transition text-center cursor-pointer hover:bg-gray-50 ${
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
              className="w-12 h-12 flex items-center justify-center"
            >
              <DiamondIcon className={`w-10 h-10 ${gemstone.color}`} />
            </motion.div>
            <span className="text-xs font-medium">{gemstone.name}</span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};
