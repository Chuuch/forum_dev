import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost } from "@/hooks/usePosts";
import { Milestone } from "lucide-react";
import { FormEvent } from "react";
import toast from "react-hot-toast";

interface Category {
    id: string;
    name: string;
}

interface AddPostModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    postTitle: string;
    setPostTitle: (title: string) => void;
    postContent: string;
    setPostContent: (content: string) => void;
    postCategory: string;
    setPostCategory: (category: string) => void;
    categories: Category[];
}

export default function AddPostModal({ 
    open, 
    setOpen, 
    postTitle, 
    setPostTitle, 
    postContent, 
    setPostContent, 
    postCategory, 
    setPostCategory, 
    categories 
}: AddPostModalProps) {
    const { mutate, isPending } = useCreatePost();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate(
            { title: postTitle, content: postContent, category: postCategory },
            {
                onSuccess: () => {
                    setPostTitle("");
                    setPostContent("");
                    setPostCategory("");
                    setOpen(false);
                },
                onError: (error: any) => {
                    console.log(error);
                    toast.error("Възникна грешка при публикуване на поста");
                }
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg w-full dark:bg-transparent backdrop-blur-lg rounded-lg p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Milestone className="w-6 h-6 text-primary" />
                        Създай нов пост</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                        placeholder="Заглавие на поста"
                        value={postTitle}
                        onChange={e => setPostTitle(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-800"
                    />
                    <Textarea
                        placeholder="Съдържание..."
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                        rows={5}
                        className="bg-gray-100 dark:bg-gray-800"
                        />
                    <Select value={postCategory} onValueChange={setPostCategory}>
                        <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-800">
                            <SelectValue placeholder="Избери категория" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-900">
                            {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <Button className="text-gray-800" type="submit" disabled={postTitle === "" || postContent === "" || postCategory === "" || isPending}>
                            {isPending ? "Публикуване..." : "Публикувай"}
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="cursor-pointer">Затвори</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}