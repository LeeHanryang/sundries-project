import { defineStore } from "pinia";
import type { User } from "@/types/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: process.client ? (localStorage.getItem("token") as string) : null,
    user: null as User | null,
    loading: false,
  }),
  actions: {
    async loginUser(email: string, password: string) {
      this.loading = true;
      try {
        const { $api } = useNuxtApp();
        const res = await $api.post("/auth/login", { email, password });
        const token = res.data.token;
        if (!token) throw new Error("No token received");
        this.token = token;
        if (process.client) localStorage.setItem("token", token);
        await this.fetchUser();
        return res;
      } finally {
        this.loading = false;
      }
    },
    async handleSocialLogin(provider: string, code: string) {
      this.loading = true;
      try {
        const { $api } = useNuxtApp();
        const res = await $api.get(`/auth/oauth2/${provider}?code=${code}`);
        const token = res.data.token;
        if (!token) throw new Error("No token received");
        this.token = token;
        if (process.client) localStorage.setItem("token", token);
        await this.fetchUser();
        return res;
      } finally {
        this.loading = false;
      }
    },
    async fetchUser() {
      this.loading = true;
      try {
        const { $api } = useNuxtApp();
        const res = await $api.get("/users/me");
        this.user = res.data;
        return res;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      if (process.client) localStorage.removeItem("token");
    },
  },
});
