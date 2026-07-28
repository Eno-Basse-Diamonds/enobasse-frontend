import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  UpdateHomepageSettingsPayload,
  getHomepageSettings,
  updateHomepageSettings,
  uploadHeroVideo,
} from "./api";

const QUERY_KEY = ["homepageSettings"];

/**
 * Fetches homepage settings.
 *
 * @description React Query hook to fetch homepage settings.
 * @returns Query result with homepage settings
 */
export function useHomepageSettings() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getHomepageSettings,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Updates homepage settings.
 *
 * @description React Query mutation hook to update homepage settings.
 * @returns Mutation result for homepage settings update
 */
export function useUpdateHomepageSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateHomepageSettingsPayload) => updateHomepageSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

/**
 * Uploads a hero video.
 *
 * @description React Query mutation hook to upload a hero video.
 * @returns Mutation result for video upload
 */
export function useUploadHeroVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, optimize }: { file: File; optimize?: boolean }) =>
      uploadHeroVideo(file, optimize),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
