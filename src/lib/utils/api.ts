import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import {
  setupCache,
  type CacheOptions,
  type CacheRequestConfig,
} from "axios-cache-interceptor";
import { notFound, redirect } from "next/navigation";
import { API_URL } from "./constants";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  cache?: boolean | CacheOptions;
}

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
      }),
      {
        ttl: 60 * 1000,
        methods: ["get"],
        cachePredicate: {
          statusCheck: (status) => status >= 200 && status < 300,
        },
        cacheTakeover: false,
      }
    );

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors() {
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
                errorData.errors
              );
          }
        }
        throw error;
      }
    );
  }

  private buildCacheConfig(
    cacheDuration?: number,
    cacheOptions?: CacheOptions
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

  public async get<T>(
    url: string,
    config?: ApiRequestConfig & { cacheDuration?: number }
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined
    );

    const finalConfig = { ...axiosConfig, ...cacheConfig };

    const response = await this.axiosInstance.get<T>(url, finalConfig);
    return response.data;
  }

  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: ApiRequestConfig & { cacheDuration?: number }
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined
    );

    const finalConfig = { ...axiosConfig, ...cacheConfig };

    const response = await this.axiosInstance.post<T>(url, data, finalConfig);
    return response.data;
  }

  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: ApiRequestConfig & { cacheDuration?: number }
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined
    );

    const finalConfig = {...axiosConfig,  ...cacheConfig };

    const response = await this.axiosInstance.put<T>(url, data, finalConfig);
    return response.data;
  }

  public async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: ApiRequestConfig & { cacheDuration?: number }
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined
    );

    const finalConfig = { ...axiosConfig, ...cacheConfig };

    const response = await this.axiosInstance.patch<T>(url, data, finalConfig);
    return response.data;
  }

  public async delete<T>(
    url: string,
    config?: ApiRequestConfig & { cacheDuration?: number }
  ): Promise<T> {
    const { cacheDuration, ...axiosConfig } = config || {};

    const cacheConfig = this.buildCacheConfig(
      cacheDuration,
      typeof axiosConfig?.cache === "object" ? axiosConfig.cache : undefined
    );

    const finalConfig = { ...axiosConfig, ...cacheConfig };

    const response = await this.axiosInstance.delete<T>(url, finalConfig);
    return response.data;
  }
}

export const api = ApiClient.getInstance();
