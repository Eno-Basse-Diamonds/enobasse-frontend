"use server";

import { api } from "../utils/api";

interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendMessage = async (data: ContactMessage) => {
  return api.post("/contact", data);
};

export const sendCustomDesignMessage = async (data: ContactMessage) => {
  return api.post("/contact/custom-design", data);
};

export const sendMaintenanceRepairsMessage = async (data: ContactMessage) => {
  return api.post("/contact/maintenance-repairs", data);
};

export const sendAppraisalMessage = async (data: ContactMessage) => {
  return api.post("/contact/appraisal", data);
};
