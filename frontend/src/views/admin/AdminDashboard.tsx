import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, FileText, Flag, Settings, Shield, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from your API
  const stats = [
    {
      title: "Потребители",
      value: "1,234",
      description: "Активни потребители за месеца",
      icon: <Users className="h-4 w-4 text-primary" />,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Постове",
      value: "567",
      description: "Постове създадени за месеца",
      icon: <FileText className="h-4 w-4 text-primary" />,
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Докладвани постове",
      value: "23",
      description: "Сигнализирани постове за разглеждане",
      icon: <Flag className="h-4 w-4 text-primary" />,
      change: "-5%",
      changeType: "negative"
    },
    {
      title: "Онлайн потребители",
      value: "89",
      description: "Онлайн потребители към момента",
      icon: <Activity className="h-4 w-4 text-primary" />,
      change: "+15%",
      changeType: "positive"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="bg-transparent backdrop-blur-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-300">Потребление на форума</h1>
          <p className="text-gray-400 mt-2">
            Добре дошли в админ панела! Тук можете да видите статистиката на форума.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Shield className="h-4 w-4" />
          <span>Админ панел</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow bg-transparent backdrop-blur-2xl rounded-lg p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-300">
                {stat.value}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {stat.description}
              </p>
              <div className={`flex items-center text-xs mt-2 ${
                stat.changeType === 'positive' 
                  ? 'text-green-600' 
                  : 'text-orange-300'
              }`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} от последния месец
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-300">Управление</CardTitle>
            <CardDescription>
              Бързи действия за управление на форума
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant='outline' 
                className="flex items-center justify-center rounded-lg hover:bg-gray-900/50 hover:border-primary! transition-colors"
                onClick={() => navigate('/dashboard/users')}
              >
                <Users className="h-5 w-5 mr-2 text-primary" />
                Управление на потребители
              </Button>
              <Button 
                variant='outline' 
                className="flex items-center justify-center rounded-lg hover:bg-gray-900/50 hover:border-primary! transition-colors"
                onClick={() => navigate('/dashboard/posts')}
              >
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Преглед на постове
              </Button>
              <Button 
                variant='outline' 
                className="flex items-center justify-center rounded-lg hover:bg-gray-900/50 hover:border-primary! transition-colors"
                onClick={() => navigate('/dashboard/reports')}
              >
                <Flag className="h-5 w-5 mr-2 text-primary" />
                Сигнали
              </Button>
              <Button 
                variant='outline' 
                className="flex items-center justify-center rounded-lg hover:bg-gray-900/50 hover:border-primary! transition-colors"
                onClick={() => navigate('/dashboard/settings')}
              >
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Настройки
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
          <CardHeader>
            <CardTitle>Скорошна активност</CardTitle>
            <CardDescription>
              Последни административни действия
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Нов регистриран потребител</p>
                  <p className="text-xs text-gray-500">преди 2 минути</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Докладван пост</p>
                  <p className="text-xs text-gray-500">преди 15 минути</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Потребителски акаунт спрян</p>
                  <p className="text-xs text-gray-500">преди 1 час</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Настройки обновени</p>
                  <p className="text-xs text-gray-500">преди 2 часа</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
