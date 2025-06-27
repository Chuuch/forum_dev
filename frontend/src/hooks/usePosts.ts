import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const usePostSingle = (id?: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) throw new Error("No post id provided");
      const { data } = await axiosInstance.get(`/posts/${id}`);
      return data;
    },
    enabled: !!id,
  });
}; 

interface UsePostsParams {
  category?: string;
  sort?: string;
  search?: string;
}

export const usePosts = ({ category, sort, search }: UsePostsParams = {}) => {
  return useQuery({
    queryKey: ["posts", { category, sort, search }],
    queryFn: async () => {
      const params: Record<string, string | undefined> = {};
      if (category) params.category = category;
      if (sort) params.sort = sort;
      if (search) params.search = search;
      const { data } = await axiosInstance.get("/posts", { params });
      return data;
    },
  });
}; 

interface CreatePostInput {
  title: string;
  content: string;
  category: string;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (post: CreatePostInput) => {
      const { data } = await axiosInstance.post("/posts", post);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return mutation;
};

interface EditPostInput extends CreatePostInput {
  id: string;
}

export const useEditPost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id, ...updates }: EditPostInput) => {
      const { data } = await axiosInstance.put(`/posts/${id}`, updates);
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
      }
    },
  });

  return mutation;
}; 

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/posts/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return mutation;
}; 
