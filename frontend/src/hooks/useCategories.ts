import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await axiosInstance.get("/categories");
            return data;
        }
    });
}

export const useAddCategory = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (name: string) => {
            const { data } = await axiosInstance.post("/categories", { name });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });
    return mutation;
}

export const useEditCategory = (categoryId?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ categoryId, name }: { categoryId: string, name: string }) => {
            const { data } = await axiosInstance.put(`/categories/${categoryId}`, { name });
            return data;
        },
        onSuccess: () => {
            if (categoryId) {
                queryClient.invalidateQueries({ queryKey: ["categories"] });
            }
        }
    });
    return mutation;
}

export const useDeleteCategory = (categoryId?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (categoryId) => {
            await axiosInstance.delete(`/categories/${categoryId}`);
        },
        onSuccess: () => {
            if (categoryId) {
                queryClient.invalidateQueries({ queryKey: ["categories"] });
            }
        }
    })
    return mutation;
}