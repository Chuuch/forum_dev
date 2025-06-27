// hooks/useLogin.ts
import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await axiosInstance.post("/auth/login", data, {
        withCredentials: true,
      });
      return res.data.user;
    },
    onSuccess: (user) => {
      setUser(user);
      setAuthenticated(true);
    },
  });
  return mutation;
};
