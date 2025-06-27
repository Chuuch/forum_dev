import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePostSingle } from "@/hooks/usePosts";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useParams } from "react-router-dom";
import Post from "./Post";

export default function PostView() {
  const { id } = useParams();
  const { data: post } = usePostSingle(id);
  // Placeholder post and comments
  const comments = [
    { id: 1, author: "Alice", content: "Great post!", avatar: "https://ui-avatars.com/api/?name=Alice", date: "1 hour ago", upvotes: 3, downvotes: 0 },
    { id: 2, author: "Bob", content: "I agree with this.", avatar: "https://ui-avatars.com/api/?name=Bob", date: "30 minutes ago", upvotes: 1, downvotes: 1 },
  ];

  if (!post) {
    return <div className="text-center text-gray-400 mt-8">Loading...</div>;
  }

  return (
    <div className="w-2/3 mx-auto px-4 py-8 bg-transparent backdrop-blur-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Подробноси за поста</h1>
      <Post {...post} isDetailView />
      
      <div className="mb-4 font-semibold text-primary text-lg mt-8">Коментари</div>
      <div className="space-y-4 mb-8">
        {comments.map((comment) => (
          <Card key={comment.id} className="dark:bg-slate-900">
            <CardContent className="flex items-start gap-3 py-3">
              <img
                src={comment.avatar}
                alt="Comment avatar"
                className="w-7 h-7 rounded-md object-cover border"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-sm">{comment.author}</div>
                  <div className="text-xs text-gray-400">{comment.date}</div>
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-sm mb-2">{comment.content}</div>
                <div className="flex gap-2 items-center">
                  <Button variant="ghost" size="icon" className="gap-1 hover:bg-gray-100! dark:hover:bg-gray-800!">
                    <ThumbsUp className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{comment.upvotes}</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="gap-1 hover:bg-gray-100! dark:hover:bg-gray-800!">
                    <ThumbsDown className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{comment.downvotes}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <form className="flex gap-2 items-center">
        <Input placeholder="Добави коментар..." className="flex-1 dark:bg-slate-900 bg-white h-12" />
        <Button type="submit" className="text-gray-800">Публикувай</Button>
      </form>
    </div>
  );
}
