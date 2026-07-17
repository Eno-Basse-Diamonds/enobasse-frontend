import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getHomepageSettings,
  updateHomepageSettings,
  uploadHeroVideo,
  UpdateHomepageSettingsPayload,
} from "../api/homepage-settings";

const QUERY_KEY = ["homepageSettings"];

export function useHomepageSettings() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getHomepageSettings,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateHomepageSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateHomepageSettingsPayload) =>
      updateHomepageSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUploadHeroVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      optimize,
    }: {
      file: File;
      optimize?: boolean;
    }) => uploadHeroVideo(file, optimize),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
