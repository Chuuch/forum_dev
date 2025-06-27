import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  username?: string;
  role: "USER" | "ADMIN";
  photo?: string;
  city?: string;
  profession?: string;
  lastActive?: Date;
  memberSince?: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      setUser: (user) => set({ user }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),

      login: async (email, password) => {
        set({ loading: true });
        try {
          const { data } = await axiosInstance.post(
            "/auth/login",
            { email, password },
            { withCredentials: true }
          );
          set({ user: data.user, isAuthenticated: true });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error(error);
        }
      },

      register: async (data) => {
        set({ loading: true });
        try {
          const res = await axiosInstance.post("/auth/register", data, {
            withCredentials: true,
          });
          set({ user: res.data.user, isAuthenticated: true });
        } catch (error) {
          console.error(error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      uploadAvatar: async (file) => {
        set({ loading: true });
        try {
          const formData = new FormData();
          formData.append("file", file);
          const { data } = await axiosInstance.post("/upload/avatar", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });

          if (data?.user) {
            get().setUser(data.user);
          }
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
