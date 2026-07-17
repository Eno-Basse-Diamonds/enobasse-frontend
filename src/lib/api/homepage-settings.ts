import { api } from "../utils/api";

export interface HomepageSettings {
  id: string;
  heroVideoUrl: string | null;
  featuredCollectionSlugs: string[] | null;
  updatedAt: string;
}

export interface UpdateHomepageSettingsPayload {
  heroVideoUrl?: string | null;
  featuredCollectionSlugs?: string[] | null;
}

export const getHomepageSettings = async (): Promise<HomepageSettings> => {
  return api.get("/homepage-settings");
};

export const updateHomepageSettings = async (
  data: UpdateHomepageSettingsPayload
): Promise<HomepageSettings> => {
  return api.patch("/homepage-settings", data);
};
