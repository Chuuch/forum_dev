import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { Plus } from "lucide-react";
import { useState } from "react";
import CategoryModal from "./CategoryModal";

interface Category {
    id: string;
    name: string;
}

export default function CategoryFilter({ selected, onSelect }: { selected: string; onSelect: (cat: string) => void }) {
    const { data: categories, isLoading, error } = useCategories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>();

    // const handleEditClick = (category: Category) => {
    //     setEditingCategory(category);
    //     setIsModalOpen(true);
    // };

    const handleAddClick = () => {
        setEditingCategory(undefined);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="w-[200px] flex gap-2">
                <Button size='icon' variant='outline' className='rounded-lg w-full' onClick={handleAddClick}>
                    <Plus className="text-gray-300" />
                    Добави категория
                </Button>
                <Select value={selected} onValueChange={onSelect}>
                    <SelectTrigger className="">
                        <SelectValue placeholder={isLoading ? "Зарежда категориите..." : error ? "Няма налични категории" : "Избери категория"} />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-transparent dark:backdrop-blur-lg">
                        <SelectItem className=" dark:hover:bg-gray-900/80" value="all">Всички</SelectItem>
                        {categories?.map((category: Category) => (
                            <SelectItem className=" dark:hover:bg-gray-900/80" key={category.id} value={category.id}>
                                <div className="flex items-center justify-between w-full">
                                    <span>{category.name}</span>
                                    {/* <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditClick(category);
                                        }}
                                    >
                                        <Pencil className="h-3 w-3" />
                                    </Button> */}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <CategoryModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                editingCategory={editingCategory}
            />
        </>
    );
}
