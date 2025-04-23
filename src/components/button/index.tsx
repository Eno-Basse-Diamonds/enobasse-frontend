"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "../icons";
import "./styles.scss";

export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      className="back-button"
      aria-label="Go back to previous page"
      onClick={handleBack}
    >
      <ArrowLeftIcon className="back-button__icon" />
    </button>
  );
};
