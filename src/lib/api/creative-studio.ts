import { api } from "../utils/api";

export const sendCreativeStudioRequest = async (data: unknown) => {
  return api.post("/creative-studio", data);
};
