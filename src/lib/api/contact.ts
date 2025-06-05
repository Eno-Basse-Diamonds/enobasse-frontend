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
