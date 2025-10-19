import type { TabType } from '../../../../../lib/types/creative-studio';

interface SectionContainerProps {
  children: React.ReactNode;
  activeTab: string;
  tabType: TabType;
  title: string;
  className?: string;
}

export function SectionContainer({
  children,
  activeTab,
  tabType,
  title,
  className = '',
}: SectionContainerProps) {
  const isVisible = activeTab === tabType || !activeTab;

  return (
    <div className={`${isVisible ? 'block' : 'hidden lg:block'} ${className}`}>
      <h3 className="font-semibold text-lg text-primary-500 font-primary mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}
