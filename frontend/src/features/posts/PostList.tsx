import { usePosts } from "@/hooks/usePosts";
import { motion } from "framer-motion";
import Post, { PostProps } from "./Post";

interface PostListProps {
    category: string;
    sort: string;
    search: string;
}

export default function PostList({ category, sort, search }: PostListProps) {
    const { data: posts, isLoading } = usePosts({ category, sort, search });

    if (isLoading) {
      return (
        <div className="space-y-4 mt-4">
          {[1, 2, 3].map((id) => (
            <div key={id} className="animate-pulse bg-gray-200 dark:bg-gray-800 h-52 rounded-xl" />
          ))}
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return <div className="text-center text-gray-400 mt-8">Няма постове.</div>;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 mt-4"
      >
        {posts.map((post: PostProps) => (
          <Post key={post.id} {...post} />
        ))}
      </motion.div>
    );
}