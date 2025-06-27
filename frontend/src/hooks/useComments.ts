import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useComments = (postId?: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      if (!postId) throw new Error("No post id provided");
      const { data } = await axiosInstance.get(`/posts/${postId}/comments`);
      return data;
    },
    enabled: !!postId,
  });
};

export const useAddComment = (postId?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (content: string) => {
      if (!postId) throw new Error("No post id provided");
      const { data } = await axiosInstance.post(`/posts/${postId}/comments`, { content });
      return data;
    },
    onSuccess: () => {
      if (postId) {
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      }
    },
  });
  return mutation;
};

export const useEditComment = (postId?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ commentId, content }: { commentId: string; content: string }) => {
      const { data } = await axiosInstance.put(`/comments/${commentId}`, { content });
      return data;
    },
    onSuccess: () => {
      if (postId) {
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      }
    },
  });
  return mutation;
};

export const useDeleteComment = (postId?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (commentId: string) => {
      await axiosInstance.delete(`/comments/${commentId}`);
    },
    onSuccess: () => {
      if (postId) {
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      }
    },
  });
  return mutation;
}; 