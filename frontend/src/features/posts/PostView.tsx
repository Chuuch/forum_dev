import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePostSingle } from "@/hooks/usePosts";
import { Flag, ThumbsDown, ThumbsUp } from "lucide-react";
import { useParams } from "react-router-dom";
import Post from "./Post";

export default function PostView() {
  const { id } = useParams();
  const { data: post } = usePostSingle(id);
  // Placeholder post and comments
  const comments = [
    { id: 1, author: "0xMazen", content: "Страхотен пост!", avatar: "https://ui-avatars.com/api/?name=Alice", date: "преди 1 час", upvotes: 3, downvotes: 0 },
    { id: 2, author: "TrashkovXYZ", content: "Съгласен съм.", avatar: "https://ui-avatars.com/api/?name=Bob", date: "преди 30 минути", upvotes: 2, downvotes: 0 },
  ];

  if (!post) {
    return <div className="text-center text-gray-400 mt-8">Loading...</div>;
  }

  return (
    <div className="w-2/5 mx-auto px-4 py-8 bg-transparent backdrop-blur-lg rounded-lg p-6 h-full">
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
                <div className="text-gray-700 dark:text-gray-300 text-sm mb-2 mt-6">{comment.content}</div>
                <div className="flex flex-row gap-2 items-center justify-start">
                  <Button variant="ghost" size="sm" className="gap-1 hover:bg-gray-100! dark:hover:bg-gray-800!">
                    <ThumbsUp className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{comment.upvotes} харесвания</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 hover:bg-gray-100! dark:hover:bg-gray-800!">
                    <ThumbsDown className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{comment.downvotes} не харесвания</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 hover:bg-gray-100! dark:hover:bg-gray-800!">
                    <Flag className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Докладвай</span>
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
