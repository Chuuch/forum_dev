// hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import axiosInstance from "@/lib/axios";

export const useLogout = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const mutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    },
    onSuccess: () => {
      setUser(null);
      setAuthenticated(false);
    },
  });
  return {
    logout: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
};
