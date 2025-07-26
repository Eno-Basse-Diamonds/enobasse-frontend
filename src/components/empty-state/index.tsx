import { Button } from "../button";

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
