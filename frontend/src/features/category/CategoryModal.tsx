import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddCategory, useEditCategory } from "@/hooks/useCategories";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface CategoryModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    editingCategory?: {
        id: string;
        name: string;
    };
}

export default function CategoryModal({ open, setOpen, editingCategory }: CategoryModalProps) {
    const [name, setName] = useState(editingCategory?.name || "");
    const addCategory = useAddCategory();
    const editCategory = useEditCategory(editingCategory?.id);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (editingCategory) {
            editCategory.mutate(
                { categoryId: editingCategory.id, name },
                {
                    onSuccess: () => {
                        setOpen(false);
                        setName("");
                        toast.success("Категорията е редактирана успешно");
                    },
                    onError: () => {
                        toast.error("Възникна грешка при редактиране на категорията");
                    }
                }
            );
        } else {
            addCategory.mutate(name, {
                onSuccess: () => {
                    setOpen(false);
                    setName("");
                    toast.success("Категорията е добавена успешно");
                },
                onError: () => {
                    toast.error("Възникна грешка при добавяне на категорията");
                }
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-transparent backdrop-blur-lg rounded-lg p-6">
                <DialogHeader>
                    <DialogTitle>
                        {editingCategory ? "Редактирай категория" : "Създай нова категория"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            placeholder="Име на категорията"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            className="text-gray-800"
                            type="submit"
                            disabled={!name || addCategory.isPending || editCategory.isPending}
                        >
                            {addCategory.isPending || editCategory.isPending
                                ? "Зареждане..."
                                : editingCategory
                                ? "Запази промените"
                                : "Създай категория"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
