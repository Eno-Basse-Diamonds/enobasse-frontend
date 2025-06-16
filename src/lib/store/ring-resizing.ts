import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormData {
  personalInfo: PersonalInfo;
  ringType: string;
  currentSize: string;
  desiredSize: string;
  urgency: string;
  hasInscription: boolean;
  inscriptionText: string;
  notes: string;
  images: string[];
}

interface RingResizingStore {
  formData: FormData;
  currentStep: number;
  isSubmitted: boolean;
  setFormData: (data: Partial<FormData>) => void;
  setCurrentStep: (step: number) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  ringType: "",
  currentSize: "",
  desiredSize: "",
  urgency: "",
  hasInscription: false,
  inscriptionText: "",
  notes: "",
  images: [],
};

export const useRingResizingStore = create<RingResizingStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      currentStep: 1,
      isSubmitted: false,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
      resetForm: () => set({ formData: initialFormData, currentStep: 1, isSubmitted: false }),
    }),
    {
      name: "ring-resizing-storage",
    }
  )
);
