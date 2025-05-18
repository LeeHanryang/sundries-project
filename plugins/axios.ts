// plugins/axios.ts
import axios from "axios";
import type { AxiosInstance } from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const api: AxiosInstance = axios.create({
    baseURL: config.public.apiBase,
  });

  api.interceptors.request.use(
    (config) => {
      if (process.client) {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return {
    provide: {
      api,
    },
  };
});
