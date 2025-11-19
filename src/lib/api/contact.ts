"use server";

import { api } from "../utils/api";

interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface CustomDesignMessage {
  name: string;
  email: string;
  phone: string;
  message: {
    description: string;
    timeline: string;
    contactPreference: "email" | "phone";
    designSpecs: {
      jewelryType: string;
      metalPurity: string;
      metalType: string;
      gemstone: string;
      size: string;
      budget: string;
      occasion: string;
      engraving: string;
    };
    inspirationImages: string[];
  };
}

interface RingResizingMessage {
  name: string;
  email: string;
  phone: string;
  message: {
    ringType: string;
    currentSize: string;
    desiredSize: string;
    urgency: string;
    inscriptionText: string;
    notes: string;
    images: string[];
  };
}

interface MaintenanceRepairsMessage {
  name: string;
  email: string;
  phone: string;
  message: {
    itemType: string;
    metalType: string;
    karat: string;
    serviceType: string;
    urgency: string;
    serviceDescription: string;
    preferredContact: string;
    pickupDelivery: string;
    images: string[];
  };
}

export const sendMessage = async (data: ContactMessage) => {
  return api.post("/contact", data);
};

export const sendCustomDesignMessage = async (data: CustomDesignMessage) => {
  return api.post("/contact/custom-design", data);
};

export const sendRingResizingMessage = async (data: RingResizingMessage) => {
  return api.post("/contact/ring-resizing", data);
};

export const sendMaintenanceRepairsMessage = async (
  data: MaintenanceRepairsMessage,
) => {
  return api.post("/contact/maintenance-repairs", data);
};
