import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface FormData {
  customerInfo: CustomerInfo;
  itemInfo: ItemInfo;
  serviceInfo: ServiceInfo;
}

interface MaintenanceRepairsStore {
  formData: FormData;
  currentStep: number;
  setFormData: (data: Partial<FormData>) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
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

export const useMaintenanceRepairsStore = create<MaintenanceRepairsStore>()(
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
      name: "maintenance-repairs-form",
    },
  ),
);
