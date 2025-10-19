interface MobileConfigurationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MobileConfigurationTabs({
  activeTab,
  setActiveTab,
}: MobileConfigurationTabsProps) {
  return (
    <div className="lg:hidden border-b border-gray-200">
      <nav className="flex -mb-px overflow-x-auto">
        <button
          onClick={() => setActiveTab("diamond")}
          className={`py-4 px-3 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "diamond"
              ? "border-primary-500 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Diamond
        </button>
        <button
          onClick={() => setActiveTab("head")}
          className={`py-4 px-3 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "head"
              ? "border-primary-500 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Head
        </button>
        <button
          onClick={() => setActiveTab("shank")}
          className={`py-4 px-3 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "shank"
              ? "border-primary-500 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Shank
        </button>
        <button
          onClick={() => setActiveTab("metal")}
          className={`py-4 px-3 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "metal"
              ? "border-primary-500 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Metal
        </button>
        <button
          onClick={() => setActiveTab("engraving")}
          className={`py-4 px-3 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "engraving"
              ? "border-primary-500 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Engraving
        </button>
      </nav>
    </div>
  );
}
