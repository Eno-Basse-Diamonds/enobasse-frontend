import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface DesignSpecs {
  jewelryType: string;
  metalPurity: string;
  metalType: string;
  gemstone: string;
  size: string;
  budget: string;
  occasion: string;
  engraving: string;
}

interface FormData {
  personalInfo: PersonalInfo;
  designSpecs: DesignSpecs;
  description: string;
  inspiration: string[];
  timeline: string;
  contactPreference: "email" | "phone";
}

interface CustomDesignStore {
  formData: FormData;
  currentStep: number;
  setFormData: (data: Partial<FormData>) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  designSpecs: {
    jewelryType: "",
    metalPurity: "",
    metalType: "",
    gemstone: "",
    size: "",
    budget: "",
    occasion: "",
    engraving: "",
  },
  description: "",
  inspiration: [],
  timeline: "",
  contactPreference: "email",
};

export const useCustomDesignStore = create<CustomDesignStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      currentStep: 1,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetForm: () => set({ formData: initialFormData, currentStep: 1 }),
    }),
    {
      name: "custom-design-form",
    }
  )
);
