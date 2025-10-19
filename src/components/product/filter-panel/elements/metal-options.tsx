import Image from "next/image";
import * as motion from "motion/react-client";
import { easeOut } from "motion/react";

const metalHoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: easeOut },
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
  toggleFilter,
}) => {
  return (
    <div className="pb-4 lg:pb-8">
      <h3 className="text-base font-semibold mb-4">Metal Options</h3>
      <div className="grid grid-cols-4 lg:grid-cols-3 gap-3">
        {metalOptions.map((metal) => (
          <motion.label
            key={metal.name}
            whileHover="hover"
            variants={metalHoverVariants}
            className={`flex flex-col items-center gap-2 p-3 transition text-center cursor-pointer hover:bg-gray-50 ${
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
              className="w-12 h-12 flex items-center justify-center"
            >
              <Image
                src={metal.image!.src}
                alt={metal.image!.alt}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </motion.div>
            <span className="text-xs font-medium">{metal.name}</span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};
