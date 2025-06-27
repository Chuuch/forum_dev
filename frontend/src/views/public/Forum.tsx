import { Button } from "@/components/ui/button";
import CategoryFilter from "@/features/category/CategoryFilter";
import AddPostModal from "@/features/posts/AddPostModal";
import PostList from "@/features/posts/PostList";
import SearchBar from "@/features/search/SearchBar";
import SortDropdown from "@/features/sort-dropdown/SortDropdown";
import { useCategories } from "@/hooks/useCategories";
import { MessageSquarePlus, Search } from "lucide-react";
import { useState } from "react";

export default function Forum() {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("newest");
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("");

  const { data: categories } = useCategories();

  const handleCreatePost = () => setOpen(true);

  return (
    <>
    <header>
      <title>TDB | Форум</title>
    </header>
    <div className="w-3/4 mx-auto px-4 py-8 h-screen bg-transparent backdrop-blur-lg rounded-lg p-6">
      {/* Floating Create Post Button */}
      <Button
        onClick={handleCreatePost}
        className="fixed top-8 right-8 z-50 rounded-full w-12 h-12 shadow-lg flex items-center justify-center text-gray-300 bg-transparent text-3xl"
        size="icon"
        variant="outline"
      >
        <MessageSquarePlus className="w-6! h-6! text-gray-300!" />
        <span className="sr-only">Създай пост</span>
      </Button>
      <div className="flex items-center justify-center mb-10 gap-2 min-h-[48px]">
        <Search className="w-6 h-6 text-gray-500" />
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center justify-center gap-4 min-h-[56px]">
        <CategoryFilter selected={category} onSelect={setCategory} />
        <SortDropdown selected={sort} onSelect={setSort} />
      </div>
      <PostList category={category} sort={sort} search={search} />
      <AddPostModal
        open={open}
        setOpen={setOpen}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postContent={postContent}
        setPostContent={setPostContent}
        postCategory={postCategory}
        setPostCategory={setPostCategory}
        categories={categories || []}
      />
      </div>
    </>
  );
}