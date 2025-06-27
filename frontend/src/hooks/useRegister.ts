import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export const useRegister = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const mutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await axiosInstance.post("/auth/register", data, {
        withCredentials: true,
      });
      return res.data.user;
    },
    onSuccess: (user) => {
      setUser(user);
      setAuthenticated(true);
    },
  });
  return mutation; // returns the whole mutation object, including `mutate`
};
