import { ReactNode } from "react";
import Link from "next/link";
import "./styles.scss";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: { text: string; href: string };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state__icon-container">{icon}</div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {action && (
        <div className="empty-state__action">
          <Link href={action.href} className="empty-state__button">
            {action.text}
          </Link>
        </div>
      )}
    </div>
  );
};
