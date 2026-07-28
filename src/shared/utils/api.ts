import { getSession } from "next-auth/react";
import { notFound, redirect } from "next/navigation";

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { type CacheOptions, type CacheRequestConfig, setupCache } from "axios-cache-interceptor";

import { API_URL } from "@/shared/constants/url";

/**
 * Custom error class for API errors.
 *
 * @description Carries the HTTP status code and optional field-level validation
 * errors alongside the error message.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  cache?: boolean | CacheOptions;
}

/**
 * Singleton API client wrapping axios with caching, auth interceptors,
 * and standardised error handling.
 *
 * @description Automatically attaches Bearer tokens from the current session
 * and handles 401/404 responses with Next.js redirect/notFound.
 */
class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = setupCache(
      axios.create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
        paramsSerializer: (params) => {
          return Object.entries(params)
            .map(([key, value]) => {
              if (value === undefined || value === null) return "";
              if (Array.isArray(value)) {
                return value
                  .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
                  .join("&");
              }
              return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
            })
            .filter(Boolean)
            .join("&");
        },
      }),
      {
        ttl: 60 * 1000,
        methods: ["get"],
        cachePredicate: {
          statusCheck: (status) => status >= 200 && status < 300,
        },
        cacheTakeover: false,
      },
    );

    this.setupInterceptors();
  }

  /** Returns the singleton ApiClient instance, creating it on first call. */
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Attaches request/response interceptors to the axios instance.
   *
   * Request – Injects the Bearer token from the client session (via
   * `getSession`) or the server session (via `getServerSession`).
   *
   * Response – Intercepts 401 to redirect to sign-in, 404 to show a
   * not-found page, and wraps other errors in an `ApiError`.
   */
  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(async (config) => {
      if (typeof window !== "undefined") {
        const session = await getSession();
        if (session?.accessToken) {
          config.headers.set("Authorization", `Bearer ${session.accessToken}`);
        }
      } else {
        try {
          const { getServerSession } = await import("next-auth");
          const { authOptions } = await import("@/modules/auth/lib");
          const session = await getServerSession(authOptions);
          if (session?.accessToken) {
            config.headers.set("Authorization", `Bearer ${session.accessToken}`);
          }
        } catch {
          // Gracefully fallback on the server if session cannot be retrieved
        }
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              redirect("/sign-in");
              break;
            case 404:
              notFound();
              break;
            default:
              const errorData = error.response.data as any;
              throw new ApiError(
                errorData.message || "An unexpected error occurred",
                error.response.status,
                errorData.errors,
              );
          }
        }
        throw error;
      },
    );
  }

  /** Builds an axios-cache-interceptor config from optional duration and options. */
  private buildCacheConfig(
    cacheDuration?: number,
    cacheOptions?: CacheOptions,
  ): CacheRequestConfig {
    const cacheConfig: CacheRequestConfig = {};

    if (cacheDuration !== undefined) {
      cacheConfig.cache = {
        ttl: cacheDuration,
        ...cacheOptions,
      };
    } else if (cacheOptions !== undefined) {
      cacheConfig.cache = cacheOptions;
    }

    return cacheConfig;
  }

  /**
   * Sends a GET request.
   *
   * @description Sends a GET request with optional caching and returns the
   * typed response data.
   *
   * @param url - The endpoint path (relative to the API base URL).
   * @param config - Optional request config with cache duration support.
   * @returns The response data typed as `T`.
   */
  public async get<T>(
    url: string,
    config?: ApiRequestConfig & { cacheDuration?: number },
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined,
    );

    const finalConfig = { ...axiosConfig, ...cacheConfig };

    const response = await this.axiosInstance.get<T>(url, finalConfig);
    return response.data;
  }

  /**
   * Sends a POST request.
   *
   * @description Sends a POST request with a request body and optional caching.
   *
   * @param url - The endpoint path (relative to the API base URL).
   * @param data - The request body payload.
   * @param config - Optional request config with cache duration support.
   * @returns The response data typed as `T`.
   */
  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: ApiRequestConfig & { cacheDuration?: number },
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined,
    );

    const finalConfig = { ...axiosConfig, ...cacheConfig };

    const response = await this.axiosInstance.post<T>(url, data, finalConfig);
    return response.data;
  }

  /**
   * Sends a PUT request.
   *
   * @description Sends a PUT request to update a resource.
   *
   * @param url - The endpoint path (relative to the API base URL).
   * @param data - The request body payload.
   * @param config - Optional request config with cache duration support.
   * @returns The response data typed as `T`.
   */
  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: ApiRequestConfig & { cacheDuration?: number },
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined,
    );

    const finalConfig = { ...axiosConfig, ...cacheConfig };

    const response = await this.axiosInstance.put<T>(url, data, finalConfig);
    return response.data;
  }

  /**
   * Sends a PATCH request.
   *
   * @description Sends a PATCH request to partially update a resource.
   *
   * @param url - The endpoint path (relative to the API base URL).
   * @param data - The request body payload.
   * @param config - Optional request config with cache duration support.
   * @returns The response data typed as `T`.
   */
  public async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: ApiRequestConfig & { cacheDuration?: number },
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined,
    );

    const finalConfig = { ...axiosConfig, ...cacheConfig };

    const response = await this.axiosInstance.patch<T>(url, data, finalConfig);
    return response.data;
  }

  /**
   * Sends a DELETE request.
   *
   * @description Sends a DELETE request to remove a resource.
   *
   * @param url - The endpoint path (relative to the API base URL).
   * @param config - Optional request config with cache duration support.
   * @returns The response data typed as `T`.
   */
  public async delete<T>(
    url: string,
    config?: ApiRequestConfig & { cacheDuration?: number },
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined,
    );

    const finalConfig = { ...axiosConfig, ...cacheConfig };

    const response = await this.axiosInstance.delete<T>(url, finalConfig);
    return response.data;
  }
}

/**
 * Pre-configured singleton API client.
 *
 * @description Use this throughout the app instead of raw axios to get
 * automatic auth tokens, caching, and consistent error handling.
 *
 * @example
 * const products = await api.get<Product[]>("/products");
 * const order = await api.post<Order>("/orders", { items: [...] });
 */
export const api = ApiClient.getInstance();
