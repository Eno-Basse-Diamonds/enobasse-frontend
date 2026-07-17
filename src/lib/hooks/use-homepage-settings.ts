import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getHomepageSettings,
  updateHomepageSettings,
  UpdateHomepageSettingsPayload,
} from "../api/homepage-settings";

const QUERY_KEY = ["homepageSettings"];

export function useHomepageSettings() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getHomepageSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
