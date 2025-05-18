// composables/useAxios.ts
import { ref, isRef, unref, watchEffect } from "vue";
import type { AxiosRequestConfig } from "axios";
import { useNuxtApp } from "#app";

const defaultConfig: AxiosRequestConfig = { method: "get" };
const defaultOptions = { immediate: true };

export function useAxios<T = any>(
  url: string | Ref<string>,
  config: AxiosRequestConfig = {},
  options = {} as {
    immediate?: boolean;
    onSuccess?: (res: any) => void;
    onError?: (err: any) => void;
  },
) {
  const { immediate, onSuccess, onError } = { ...defaultOptions, ...options };
  const response = ref<any>(null);
  const data = ref<T | null>(null);
  const error = ref<any>(null);
  const loading = ref(false);

  const { $api } = useNuxtApp();

  const execute = (body?: any) => {
    loading.value = true;
    data.value = null;
    error.value = null;

    $api(unref(url), {
      ...defaultConfig,
      ...config,
      params: unref(config.params as any),
      data: typeof body === "object" ? body : {},
    })
      .then((res) => {
        response.value = res;
        data.value = res.data;
        onSuccess?.(res);
      })
      .catch((err) => {
        error.value = err.response?.data ?? err;
        onError?.(err);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  if (isRef(config.params) || isRef(url)) {
    watchEffect(() => execute());
  } else if (immediate) {
    execute();
  }

  return { response, data, error, loading, execute };
}
