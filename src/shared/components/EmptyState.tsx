import { Button } from "@/shared/components/Button";

interface EmptyStateAction {
  text: string;
  href: string;
}

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: EmptyStateAction;
  children?: React.ReactNode;
}

/**
 * Empty state placeholder.
 *
 * @description Displays a centered layout with an icon, title, description, and
 * optional call-to-action button. Used when a page or section has no data to
 * show, such as an empty cart or wishlist.
 *
 * @param title - Primary heading text.
 * @param description - Supporting text below the title.
 * @param icon - Decorative icon rendered above the title.
 * @param action - Optional button config with text and href for navigation.
 * @param children - Additional content rendered below the description.
 * @returns A centered empty-state layout.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-[#502B3A]">
      <div className="mb-4 text-[#502B3A]">{icon}</div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="mb-6 text-[#502B3A]/80">{description}</p>

      {action && <Button href={action.href}>{action.text}</Button>}

      {children}
    </div>
  );
};
