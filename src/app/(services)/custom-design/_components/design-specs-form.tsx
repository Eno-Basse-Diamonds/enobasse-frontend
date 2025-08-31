import { Star, ChevronDown } from "lucide-react";

interface DesignSpecs {
  jewelryType: string;
  metalType: string;
  metalPurity: string;
  gemstone: string;
  size: string;
  budget: string;
  occasion: string;
  engraving: string;
}

interface FormErrors {
  jewelryType?: string;
  metalType?: string;
  metalPurity?: string;
  gemstone?: string;
  budget?: string;
  occasion?: string;
}

interface DesignSpecsFormProps {
  designSpecs: DesignSpecs;
  errors: FormErrors;
  onInputChange: (field: keyof DesignSpecs, value: string) => void;
}

export const DesignSpecsForm = ({
  designSpecs,
  errors,
  onInputChange,
}: DesignSpecsFormProps) => {
  const jewelryTypes = [
    "Ring",
    "Necklace",
    "Earrings",
    "Bracelet",
    "Pendant",
    "Bangles",
  ];

  const metalTypes = [
    "Yellow Gold",
    "White Gold",
    "Rose Gold",
    "Platinum",
    "None",
  ];

  const metalPurities = ["18K", "14K", "10K", "None"];

  const gemstones = ["Diamond", "Sapphire", "Ruby", "Emerald", "Pearl", "None"];

  const budgetRanges = [
    "Lower than $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
  ];

  const occasions = [
    "Engagement",
    "Wedding",
    "Anniversary",
    "Birthday",
    "Gift",
    "Personal Collection",
    "Other",
  ];

  return (
    <div className="bg-white border border-primary-100 shadow-md p-4 py-8 md:p-8 mb-8">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <h2 className="font-primary font-semibold text-center text-2xl text-primary-500">
          Design Specifications
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Jewelry Type *
          </label>
          <div className="relative">
            <select
              value={designSpecs.jewelryType}
              onChange={(e) => onInputChange("jewelryType", e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.jewelryType ? "border-red-500" : "border-slate-300"
              } appearance-none bg-white`}
              required
            >
              <option value="">Select jewelry type</option>
              {jewelryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          {errors.jewelryType && (
            <p className="mt-1 text-sm text-red-500">{errors.jewelryType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Metal Type *
          </label>
          <div className="relative">
            <select
              value={designSpecs.metalType}
              onChange={(e) => onInputChange("metalType", e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.metalType ? "border-red-500" : "border-slate-300"
              } appearance-none bg-white`}
              required
            >
              <option value="">Select metal type</option>
              {metalTypes.map((metal) => (
                <option key={metal} value={metal}>
                  {metal}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          {errors.metalType && (
            <p className="mt-1 text-sm text-red-500">{errors.metalType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Metal Purity *
          </label>
          <div className="relative">
            <select
              value={designSpecs.metalPurity}
              onChange={(e) => onInputChange("metalPurity", e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.metalPurity ? "border-red-500" : "border-slate-300"
              } appearance-none bg-white`}
              required
            >
              <option value="">Select metal purity</option>
              {metalPurities.map((purity) => (
                <option key={purity} value={purity}>
                  {purity}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          {errors.metalPurity && (
            <p className="mt-1 text-sm text-red-500">{errors.metalPurity}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Primary Gemstone (Optional)
          </label>
          <div className="relative">
            <select
              value={designSpecs.gemstone}
              onChange={(e) => onInputChange("gemstone", e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.gemstone ? "border-red-500" : "border-slate-300"
              } appearance-none bg-white`}
            >
              <option value="">Select gemstone</option>
              {gemstones.map((gem) => (
                <option key={gem} value={gem}>
                  {gem}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          {errors.gemstone && (
            <p className="mt-1 text-sm text-red-500">{errors.gemstone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Size (Optional)
          </label>
          <input
            type="text"
            value={designSpecs.size}
            onChange={(e) => onInputChange("size", e.target.value)}
            placeholder="e.g., Ring size 7, 18 inches"
            className="w-full px-4 py-3 border border-slate-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Budget Range *
          </label>
          <div className="relative">
            <select
              value={designSpecs.budget}
              onChange={(e) => onInputChange("budget", e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.budget ? "border-red-500" : "border-slate-300"
              } appearance-none bg-white`}
              required
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          {errors.budget && (
            <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Occasion *
          </label>
          <div className="relative">
            <select
              value={designSpecs.occasion}
              onChange={(e) => onInputChange("occasion", e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.occasion ? "border-red-500" : "border-slate-300"
              } appearance-none bg-white`}
              required
            >
              <option value="">Select occasion</option>
              {occasions.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          {errors.occasion && (
            <p className="mt-1 text-sm text-red-500">{errors.occasion}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Engraving (Optional)
          </label>
          <input
            type="text"
            value={designSpecs.engraving}
            onChange={(e) => onInputChange("engraving", e.target.value)}
            placeholder="Custom text or symbols"
            className="w-full px-4 py-3 border border-slate-300"
          />
        </div>
      </div>
    </div>
  );
};
