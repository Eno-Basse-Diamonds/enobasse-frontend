import { notFound, redirect } from "next/navigation";
import { API_URL } from "../utils/constants";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface HttpOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
}

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

export class Http {
  private static baseUrl: string = API_URL;

  static setBaseUrl(url: string): void {
    Http.baseUrl = url;
  }

  private static async request<T = void>(
    method: HttpMethod,
    endpoint: string,
    data?: unknown,
    options: HttpOptions = {}
  ): Promise<T> {
    const { headers = {}, params, cache, next } = options;
    const url = new URL(`${Http.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const config: RequestInit = {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      cache,
      next,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url.toString(), config);

    if (!response.ok) {
      await Http.handleError(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    try {
      return (await response.json()) as T;
    } catch (error) {
      throw new ApiError("Failed to parse JSON response", 500);
    }
  }

  private static async handleError(response: Response): Promise<void> {
    switch (response.status) {
      case 401:
        redirect("/auth/login");
        break;
      case 404:
        notFound();
        break;
      default:
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }));
        throw new ApiError(
          errorData.message || "An unexpected error occurred",
          response.status,
          errorData.errors
        );
    }
  }

  static get<T = unknown>(endpoint: string, options?: HttpOptions): Promise<T> {
    return Http.request("GET", endpoint, undefined, options);
  }

  static post<T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    options?: HttpOptions
  ): Promise<T> {
    return Http.request("POST", endpoint, data, options);
  }

  static put<T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    options?: HttpOptions
  ): Promise<T> {
    return Http.request("PUT", endpoint, data, options);
  }

  static patch<T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    options?: HttpOptions
  ): Promise<T> {
    return Http.request("PATCH", endpoint, data, options);
  }

  static delete<T = unknown>(
    endpoint: string,
    options?: HttpOptions
  ): Promise<T> {
    return Http.request("DELETE", endpoint, undefined, options);
  }
}
