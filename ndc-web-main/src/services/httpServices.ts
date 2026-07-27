import httpCommon, { resolveBaseUrl } from "./http.common";
import type { AxiosRequestConfig } from "axios";

/**
 * Global HTTP wrapper functions — same convention as the admin panel's
 * httpServices.ts. Every page/component should call through these (never
 * import http.common/axios directly), so the "no base URL configured"
 * kill switch stays centralized: if NEXT_PUBLIC_API_BASE_URL (or the
 * server-only API_BASE_URL) is unset, every call resolves to `null` instead
 * of hitting the network.
 */

export const getRequest = async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T | null> => {
  if (!resolveBaseUrl()) return null;
  try {
    return await httpCommon.get(url, config);
  } catch {
    return null;
  }
};

export const postRequest = async <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
  return await httpCommon.post(url, data, config);
};

export const putRequest = async <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
  return await httpCommon.put(url, data, config);
};

export const deleteRequest = async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
  return await httpCommon.delete(url, config);
};
