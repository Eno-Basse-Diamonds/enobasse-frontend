interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  children,
}) => {
  return (
    <div className="empty-state flex flex-col items-center justify-center py-16 text-center text-gray-500">
      <div className="mb-4">{icon}</div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      {children}
    </div>
  );
};
