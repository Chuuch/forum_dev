import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const placeholderAvatar = "https://ui-avatars.com/api/?name=User&background=random";

export interface PostProps {
  id: string;
  title: string;
  content: string;
  category?: {
    name: string;
  };
  author?: string;
  avatar?: string;
  createdAt?: string;
  commentsCount?: number;
  upvotes?: number;
  downvotes?: number;
  isDetailView?: boolean;
}

export default function Post({
  id,
  title,
  content,
  category,
  author,
  avatar,
  createdAt,
  commentsCount = 0,
  upvotes = 0,
  downvotes = 0,
  isDetailView = false,
}: PostProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isDetailView) {
      navigate(`/posts/${id}`);
    }
  };

  return (
    <Card
      className={`dark:bg-slate-900 lg:min-w-2xl ${
        !isDetailView ? "cursor-pointer hover:border-primary transition-all duration-300" : ""
      }`}
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <span className="text-xs bg-primary text-gray-800 px-2 py-1 rounded-full">
          {category?.name || "General"}
        </span>
      </CardHeader>
      <CardContent>
        {/* User avatar, name, and date */}
        <div className="flex items-start flex-col gap-2 text-gray-500 text-sm mb-1">
          <img
            src={author ? `${import.meta.env.VITE_SERVER_URL}/uploads/${avatar}` : placeholderAvatar}
            alt={`${author || "User"}'s avatar`}
            className="w-12 h-12 rounded-md object-cover border"
          />
          <span>
            by {author || "User"} •{" "}
            {createdAt ? new Date(createdAt).toLocaleString() : ""}
          </span>
        </div>
        <div className={`text-gray-700 dark:text-gray-300 mb-2 ${!isDetailView ? "line-clamp-2" : ""}`}>
          {content}
        </div>
        <div className="flex items-center justify-start gap-1 text-xs text-gray-400">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-gray-100! dark:hover:bg-gray-800!">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">{commentsCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-gray-100! dark:hover:bg-gray-800!">
            <ThumbsUp className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">{upvotes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-gray-100! dark:hover:bg-gray-800!">
            <ThumbsDown className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">{downvotes}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 