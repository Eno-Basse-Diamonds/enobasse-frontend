import type { TabType } from "@/modules/creative-studio/types";

interface SectionContainerProps {
  children: React.ReactNode;
  activeTab: string;
  tabType: TabType;
  title: string;
  className?: string;
}

/**
 * Section visibility container.
 *
 * @description Conditionally shows or hides its children based on whether
 * the active tab matches the section's tab type. On desktop (lg+) the
 * section is always visible; on mobile it only shows when activeTab matches
 * tabType or when activeTab is empty.
 * @param children - Section content.
 * @param activeTab - Currently active mobile tab identifier.
 * @param tabType - The tab type this section belongs to.
 * @param title - Section heading text.
 * @param className - Additional CSS classes.
 * @returns The section wrapper with heading.
 */
export function SectionContainer({
  children,
  activeTab,
  tabType,
  title,
  className = "",
}: SectionContainerProps) {
  const isVisible = activeTab === tabType || !activeTab;

  return (
    <div className={`${isVisible ? "block" : "hidden lg:block"} ${className}`}>
      <h3 className="font-semibold text-lg text-primary-500 font-primary mb-4">{title}</h3>
      {children}
    </div>
  );
}
