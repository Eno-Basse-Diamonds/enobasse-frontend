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

/**
 * Custom design form store.
 *
 * @description Zustand store that manages the custom design multi-step form
 * data and current step.
 * @returns The custom design store hook
 */
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
    },
  ),
);

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ItemInfo {
  itemType: string;
  brand: string;
  metalType: string;
  karat: string;
  purchaseDate: string;
  purchaseLocation: string;
  description: string;
  serialNumber: string;
  estimatedValue: string;
  images: string[];
}

interface ServiceInfo {
  serviceType: string;
  urgency: string;
  description: string;
  preferredContact: string;
  pickupDelivery: string;
}

interface MaintenanceRepairsFormData {
  customerInfo: CustomerInfo;
  itemInfo: ItemInfo;
  serviceInfo: ServiceInfo;
}

interface MaintenanceRepairsStore {
  formData: MaintenanceRepairsFormData;
  currentStep: number;
  setFormData: (data: Partial<MaintenanceRepairsFormData>) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}

const initialMRFormData: MaintenanceRepairsFormData = {
  customerInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  },
  itemInfo: {
    itemType: "",
    brand: "",
    metalType: "",
    karat: "",
    purchaseDate: "",
    purchaseLocation: "",
    description: "",
    serialNumber: "",
    estimatedValue: "",
    images: [],
  },
  serviceInfo: {
    serviceType: "",
    urgency: "",
    description: "",
    preferredContact: "",
    pickupDelivery: "",
  },
};

/**
 * Maintenance repairs form store.
 *
 * @description Zustand store that manages the maintenance and repairs
 * multi-step form data.
 * @returns The maintenance repairs store hook
 */
export const useMaintenanceRepairsStore = create<MaintenanceRepairsStore>()(
  persist(
    (set) => ({
      formData: initialMRFormData,
      currentStep: 1,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetForm: () => set({ formData: initialMRFormData, currentStep: 1 }),
    }),
    {
      name: "maintenance-repairs-form",
    },
  ),
);

interface RRPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface RRFormData {
  personalInfo: RRPersonalInfo;
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
  formData: RRFormData;
  currentStep: number;
  isSubmitted: boolean;
  setFormData: (data: Partial<RRFormData>) => void;
  setCurrentStep: (step: number) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  resetForm: () => void;
}

const initialRRFormData: RRFormData = {
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

/**
 * Ring resizing form store.
 *
 * @description Zustand store that manages the ring resizing multi-step form
 * data.
 * @returns The ring resizing store hook
 */
export const useRingResizingStore = create<RingResizingStore>()(
  persist(
    (set) => ({
      formData: initialRRFormData,
      currentStep: 1,
      isSubmitted: false,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
      resetForm: () => set({ formData: initialRRFormData, currentStep: 1, isSubmitted: false }),
    }),
    {
      name: "ring-resizing-storage",
    },
  ),
);
