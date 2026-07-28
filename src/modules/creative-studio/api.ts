import { api } from "@/shared/utils/api";

/**
 * Sends a creative studio request.
 *
 * @description Sends a creative studio request with custom design
 * configuration.
 * @param data - The creative studio configuration data
 * @returns The API response
 */
export const sendCreativeStudioRequest = async (data: unknown) => {
  return api.post("/creative-studio", data);
};
