import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

export const useUploadAvatar = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axiosInstance.post("/upload/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log("Upload response:", data);
      return data.user;
    },
    onSuccess: (user) => {
      console.log("Setting user in store:", user);
      setUser(user);
    },
  });
};
