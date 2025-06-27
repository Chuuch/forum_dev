import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  CheckCircle, 
  Trash2, 
  Eye, 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  User,
  Tag
} from "lucide-react";
import { useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
    photo?: string;
  };
  category?: {
    name: string;
  };
  status: "APPROVED" | "PENDING" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  upvotes: number;
  downvotes: number;
  isReported: boolean;
  reportCount: number;
}

export default function PostsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock data - replace with actual API calls
  const posts: Post[] = [
    {
      id: "1",
      title: "Как да започна с блокчейн разработка?",
      content: "Искам да науча как да разработвам смарт контракти...",
      author: {
        id: "1",
        username: "blockchain_dev",
        photo: "user1.jpg"
      },
      category: { name: "Блокчейн" },
      status: "APPROVED",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      commentsCount: 15,
      upvotes: 42,
      downvotes: 3,
      isReported: false,
      reportCount: 0
    },
    {
      id: "2",
      title: "Споделяне на опит с Solidity",
      content: "Ето няколко полезни съвета за Solidity разработка...",
      author: {
        id: "2",
        username: "solidity_expert",
        photo: "user2.jpg"
      },
      category: { name: "Смарт контракти" },
      status: "PENDING",
      createdAt: "2024-01-15T09:15:00Z",
      updatedAt: "2024-01-15T09:15:00Z",
      commentsCount: 0,
      upvotes: 0,
      downvotes: 0,
      isReported: false,
      reportCount: 0
    },
    {
      id: "3",
      title: "Спам пост - изтрийте ме",
      content: "Това е спам съдържание...",
      author: {
        id: "3",
        username: "spam_user",
        photo: "user3.jpg"
      },
      category: { name: "Общи" },
      status: "REJECTED",
      createdAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-15T08:30:00Z",
      commentsCount: 2,
      upvotes: 1,
      downvotes: 25,
      isReported: true,
      reportCount: 5
    },
    {
      id: "4",
      title: "Нови технологии в DeFi",
      content: "Разглеждаме новите тенденции в децентрализираните финанси...",
      author: {
        id: "4",
        username: "defi_researcher",
        photo: "user4.jpg"
      },
      category: { name: "DeFi" },
      status: "APPROVED",
      createdAt: "2024-01-13T16:45:00Z",
      updatedAt: "2024-01-13T16:45:00Z",
      commentsCount: 8,
      upvotes: 67,
      downvotes: 2,
      isReported: false,
      reportCount: 0
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || post.category?.name === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleApprovePost = (postId: string) => {
    // TODO: Implement approve post functionality
    console.log("Approve post:", postId);
  };

  const handleRejectPost = (postId: string) => {
    // TODO: Implement reject post functionality
    console.log("Reject post:", postId);
  };

  const handleDeletePost = (postId: string) => {
    // TODO: Implement delete post functionality
    console.log("Delete post:", postId);
  };

  const handleViewPost = (postId: string) => {
    // TODO: Navigate to post view
    console.log("View post:", postId);
  };

  const stats = [
    {
      title: "Общо постове",
      value: posts.length.toString(),
      icon: <FileText className="h-4 w-4 text-primary" />
    },
    {
      title: "Одобрени постове",
      value: posts.filter(p => p.status === "APPROVED").length.toString(),
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    },
    {
      title: "Чакащи одобрение",
      value: posts.filter(p => p.status === "PENDING").length.toString(),
      icon: <Eye className="h-4 w-4 text-yellow-500" />
    },
    {
      title: "Докладвани постове",
      value: posts.filter(p => p.isReported).length.toString(),
      icon: <ThumbsDown className="h-4 w-4 text-red-500" />
    }
  ];

  const categories = ["Всички", "Блокчейн", "Смарт контракти", "DeFi", "Общи"];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="bg-transparent backdrop-blur-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-300">Управление на постове</h1>
          <p className="text-gray-400 mt-2">
            Управлявайте постовете на форума, одобрявайте и модераторствайте съдържание.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary">
          <FileText className="h-4 w-4" />
          <span>Постове</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-transparent backdrop-blur-2xl rounded-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-300">{stat.value}</p>
              </div>
              {stat.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Търсете по заглавие или автор..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-transparent border-gray-600"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
              >
                <option value="all">Всички статуси</option>
                <option value="APPROVED">Одобрени</option>
                <option value="PENDING">Чакащи</option>
                <option value="REJECTED">Отхвърлени</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
              >
                {categories.map(category => (
                  <option key={category} value={category === "Всички" ? "all" : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-300">Списък с постове</CardTitle>
          <CardDescription>
            Управлявайте постовете и техния статус
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-gray-400 font-medium">Пост</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Автор</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Категория</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Статус</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Статистика</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Дата</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-800 hover:bg-gray-800/20">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-300 line-clamp-1">{post.title}</p>
                        <p className="text-sm text-gray-400 line-clamp-2 mt-1">{post.content}</p>
                        {post.isReported && (
                          <Badge variant="destructive" className="mt-2 text-xs">
                            Докладван ({post.reportCount}x)
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{post.author.username}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {post.category && (
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{post.category.name}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={
                          post.status === "APPROVED" ? "default" : 
                          post.status === "PENDING" ? "secondary" : "destructive"
                        }
                        className={
                          post.status === "APPROVED" ? "bg-green-500/20 text-green-300" :
                          post.status === "PENDING" ? "bg-yellow-500/20 text-yellow-300" :
                          "bg-red-500/20 text-red-300"
                        }
                      >
                        {post.status === "APPROVED" ? "Одобрен" :
                         post.status === "PENDING" ? "Чакащ" : "Отхвърлен"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {post.commentsCount}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {post.upvotes}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown className="h-3 w-3" />
                          {post.downvotes}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString('bg-BG')}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPost(post.id)}
                          className="text-blue-400 border-blue-400 hover:bg-blue-400/20"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Преглед
                        </Button>
                        {post.status === "PENDING" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprovePost(post.id)}
                              className="text-green-400 border-green-400 hover:bg-green-400/20"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Одобри
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectPost(post.id)}
                              className="text-red-400 border-red-400 hover:bg-red-400/20"
                            >
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              Отхвърли
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-400 border-red-400 hover:bg-red-400/20"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Изтрий
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 