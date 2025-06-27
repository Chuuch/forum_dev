import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Ban, 
  CheckCircle, 
  Search, 
  Shield, 
  Users, 
  UserCheck, 
  UserX,
  Mail,
  MapPin
} from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  photo?: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  lastActive?: string;
  memberSince?: string;
  city?: string;
  profession?: string;
}

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  // Mock data - replace with actual API calls
  const users: User[] = [
    {
      id: "1",
      username: "admin_user",
      email: "admin@example.com",
      photo: "admin-avatar.jpg",
      role: "ADMIN",
      isActive: true,
      lastActive: "2024-01-15T10:30:00Z",
      memberSince: "2023-01-01T00:00:00Z",
      city: "София",
      profession: "Администратор"
    },
    {
      id: "2",
      username: "john_doe",
      email: "john@example.com",
      photo: "john-avatar.jpg",
      role: "USER",
      isActive: true,
      lastActive: "2024-01-15T09:15:00Z",
      memberSince: "2023-06-15T00:00:00Z",
      city: "Пловдив",
      profession: "Програмист"
    },
    {
      id: "3",
      username: "spam_user",
      email: "spam@example.com",
      photo: "spam-avatar.jpg",
      role: "USER",
      isActive: false,
      lastActive: "2024-01-10T14:20:00Z",
      memberSince: "2023-12-01T00:00:00Z",
      city: "Варна",
      profession: "Дизайнер"
    },
    {
      id: "4",
      username: "moderator_user",
      email: "mod@example.com",
      photo: "mod-avatar.jpg",
      role: "ADMIN",
      isActive: true,
      lastActive: "2024-01-15T11:45:00Z",
      memberSince: "2023-03-20T00:00:00Z",
      city: "Бургас",
      profession: "Модератор"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleBanUser = (userId: string) => {
    // TODO: Implement ban user functionality
    console.log("Ban user:", userId);
  };

  const handleUnbanUser = (userId: string) => {
    // TODO: Implement unban user functionality
    console.log("Unban user:", userId);
  };

  const handlePromoteToAdmin = (userId: string) => {
    // TODO: Implement promote to admin functionality
    console.log("Promote user to admin:", userId);
  };

  const stats = [
    {
      title: "Общо потребители",
      value: users.length.toString(),
      icon: <Users className="h-4 w-4 text-primary" />
    },
    {
      title: "Активни потребители",
      value: users.filter(u => u.isActive).length.toString(),
      icon: <UserCheck className="h-4 w-4 text-green-500" />
    },
    {
      title: "Спряни потребители",
      value: users.filter(u => !u.isActive).length.toString(),
      icon: <UserX className="h-4 w-4 text-red-500" />
    },
    {
      title: "Администратори",
      value: users.filter(u => u.role === "ADMIN").length.toString(),
      icon: <Shield className="h-4 w-4 text-blue-500" />
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="bg-transparent backdrop-blur-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-300">Управление на потребители</h1>
          <p className="text-gray-400 mt-2">
            Управлявайте потребителите на форума, техните права и статус.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Users className="h-4 w-4" />
          <span>Потребители</span>
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Търсете по потребителско име или имейл..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-transparent border-gray-600"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedRole === "all" ? "default" : "outline"}
                onClick={() => setSelectedRole("all")}
                className="bg-transparent"
              >
                Всички
              </Button>
              <Button
                variant={selectedRole === "USER" ? "default" : "outline"}
                onClick={() => setSelectedRole("USER")}
                className="bg-transparent"
              >
                Потребители
              </Button>
              <Button
                variant={selectedRole === "ADMIN" ? "default" : "outline"}
                onClick={() => setSelectedRole("ADMIN")}
                className="bg-transparent"
              >
                Администратори
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-300">Списък с потребители</CardTitle>
          <CardDescription>
            Управлявайте потребителите и техните права
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-gray-400 font-medium">Потребител</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Роля</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Статус</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Последна активност</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/20">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage 
                            src={user.photo ? `${import.meta.env.VITE_SERVER_URL}/uploads/${user.photo}` : undefined} 
                            alt={user.username} 
                          />
                          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-300">{user.username}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          {user.city && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="h-3 w-3" />
                              {user.city}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={user.role === "ADMIN" ? "default" : "secondary"}
                        className={user.role === "ADMIN" ? "bg-blue-500/20 text-blue-300" : "bg-gray-500/20 text-gray-300"}
                      >
                        {user.role === "ADMIN" ? "Администратор" : "Потребител"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.isActive ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Ban className="h-4 w-4 text-red-500" />
                        )}
                        <span className={user.isActive ? "text-green-400" : "text-red-400"}>
                          {user.isActive ? "Активен" : "Спрян"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {user.lastActive ? new Date(user.lastActive).toLocaleString('bg-BG') : "Никога"}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {user.isActive ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBanUser(user.id)}
                            className="text-red-400 border-red-400 hover:bg-red-400/20"
                          >
                            <Ban className="h-3 w-3 mr-1" />
                            Спри
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnbanUser(user.id)}
                            className="text-green-400 border-green-400 hover:bg-green-400/20"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Активирай
                          </Button>
                        )}
                        {user.role === "USER" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePromoteToAdmin(user.id)}
                            className="text-blue-400 border-blue-400 hover:bg-blue-400/20"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            Направи админ
                          </Button>
                        )}
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