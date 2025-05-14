import "./styles.scss";

interface DividerProps {
  label: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ label, className }) => {
  return (
    <div className="divider">
      <div className="divider__line-container" aria-hidden="true">
        <div className="divider__line"></div>
      </div>
      <div className="divider__text">
        <span className={className ? className : "divider__span"}>{label}</span>
      </div>
    </div>
  );
};
