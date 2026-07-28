"use client";

import { useRef } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Query provider.
 *
 * @description Provides React Query context to the application with default
 * configuration (5-minute stale time, 2 retries, no refetch on window focus).
 * @param children - The child components to wrap with the query client provider
 * @returns The QueryClientProvider wrapping the children with devtools
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClientRef = useRef<QueryClient>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          retry: 2,
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
