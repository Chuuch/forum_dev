import axiosInstance from "@/lib/axios";

export type UpdateProfileProps = {
  username?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  photo?: string | null;
  city?: string | null;
  profession?: string | null;
};

export const updateProfile = async (data: UpdateProfileProps) => {
  const response = await axiosInstance.put("/profile", data);
  return response.data.user;
};
