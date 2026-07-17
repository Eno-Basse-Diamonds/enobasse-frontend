import { api } from "../utils/api";

export interface HomepageSettings {
  id: string;
  heroVideoMp4Url: string | null;
  heroVideoWebmUrl: string | null;
  heroVideoPosterUrl: string | null;
  featuredCollectionSlugs: string[] | null;
  updatedAt: string;
}

export interface UpdateHomepageSettingsPayload {
  heroVideoMp4Url?: string | null;
  heroVideoWebmUrl?: string | null;
  heroVideoPosterUrl?: string | null;
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

/**
 * Uploads a raw video file to the backend processing endpoint.
 * The server converts it to WebM, extracts a poster frame, uploads
 * all three to Cloudinary, and returns the updated settings.
 */
export const uploadHeroVideo = async (
  file: File,
  optimize: boolean = true,
): Promise<HomepageSettings> => {
  const formData = new FormData();
  formData.append("video", file);
  formData.append("optimize", String(optimize));

  // Use fetch directly — axios strips multipart boundaries with the api client
  const { getSession } = await import("next-auth/react");
  const session = await getSession();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const res = await fetch(`${API_URL}/homepage-settings/upload-video`, {
    method: "POST",
    headers: session?.accessToken
      ? { Authorization: `Bearer ${session.accessToken}` }
      : {},
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Video upload failed");
  }

  return res.json();
};
