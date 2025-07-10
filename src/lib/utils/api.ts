import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { notFound, redirect } from 'next/navigation';
import { API_URL } from './constants';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
              redirect('/sign-in');
              break;
            case 404:
              notFound();
              break;
            default:
              const errorData = error.response.data as any;
              throw new ApiError(
                errorData.message || 'An unexpected error occurred',
                error.response.status,
                errorData.errors
              );
          }
        }
        throw error;
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

export const api = ApiClient.getInstance();
