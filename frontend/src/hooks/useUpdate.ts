import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import axiosInstance from "@/lib/axios";

export type UpdateProps = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  photo?: string;
  city?: string;
  profession?: string;
};

export const useUpdate = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const mutation = useMutation({
    mutationFn: async (data: UpdateProps) => {
      const res = await axiosInstance.put("/users/update", data, {
        withCredentials: true,
      });
      return res.data.user;
    },
    onSuccess: (user) => {
      setUser(user);
    },
  });
  return mutation;
};
