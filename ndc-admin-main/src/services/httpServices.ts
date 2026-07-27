import httpCommon from "./http.common";
import type { AxiosRequestConfig } from "axios";

/**
 * Global HTTP wrapper functions. All backend API calls should be routed
 * through these so interceptor behavior (auth header, 401 redirect,
 * response.data unwrapping) stays consistent — same pattern as NCET's
 * admin (src/services/httpServices.js).
 */

export const getRequest = async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
  return await httpCommon.get(url, config);
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

export const patchRequest = async <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
  return await httpCommon.patch(url, data, config);
};
