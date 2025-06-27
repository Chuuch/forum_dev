import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Flag, 
  Search, 
  CheckCircle, 
  XCircle, 
  Eye, 
  AlertTriangle,
  User,
  Ban,
} from "lucide-react";
import { useState } from "react";

interface Report {
  id: string;
  postId: string;
  postTitle: string;
  postContent: string;
  reporter: {
    id: string;
    username: string;
  };
  reportedUser: {
    id: string;
    username: string;
  };
  reason: string;
  description: string;
  status: "PENDING" | "RESOLVED" | "DISMISSED";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: {
    id: string;
    username: string;
  };
  reportCount: number;
}

export default function ReportsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  // Mock data - replace with actual API calls
  const reports: Report[] = [
    {
      id: "1",
      postId: "1",
      postTitle: "Спам пост - изтрийте ме",
      postContent: "Това е спам съдържание...",
      reporter: {
        id: "1",
        username: "moderator_user"
      },
      reportedUser: {
        id: "3",
        username: "spam_user"
      },
      reason: "SPAM",
      description: "Постът съдържа нежелано спам съдържание",
      status: "PENDING",
      severity: "HIGH",
      createdAt: "2024-01-15T10:30:00Z",
      reportCount: 5
    },
    {
      id: "2",
      postId: "2",
      postTitle: "Обиден коментар",
      postContent: "Този коментар е обиден...",
      reporter: {
        id: "2",
        username: "john_doe"
      },
      reportedUser: {
        id: "4",
        username: "troll_user"
      },
      reason: "HARASSMENT",
      description: "Коментарът съдържа обидни думи",
      status: "RESOLVED",
      severity: "MEDIUM",
      createdAt: "2024-01-14T15:20:00Z",
      resolvedAt: "2024-01-15T09:00:00Z",
      resolvedBy: {
        id: "1",
        username: "admin_user"
      },
      reportCount: 2
    },
    {
      id: "3",
      postId: "3",
      postTitle: "Неподходящо съдържание",
      postContent: "Това съдържание не е подходящо...",
      reporter: {
        id: "3",
        username: "community_member"
      },
      reportedUser: {
        id: "5",
        username: "inappropriate_user"
      },
      reason: "INAPPROPRIATE_CONTENT",
      description: "Съдържанието не е подходящо за форума",
      status: "DISMISSED",
      severity: "LOW",
      createdAt: "2024-01-13T12:45:00Z",
      resolvedAt: "2024-01-14T10:30:00Z",
      resolvedBy: {
        id: "1",
        username: "admin_user"
      },
      reportCount: 1
    },
    {
      id: "4",
      postId: "4",
      postTitle: "Критична сигурност",
      postContent: "Този пост съдържа критична информация...",
      reporter: {
        id: "4",
        username: "security_expert"
      },
      reportedUser: {
        id: "6",
        username: "malicious_user"
      },
      reason: "SECURITY_ISSUE",
      description: "Постът съдържа критична сигурностна информация",
      status: "PENDING",
      severity: "CRITICAL",
      createdAt: "2024-01-15T08:15:00Z",
      reportCount: 3
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reporter.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedUser.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus;
    const matchesSeverity = selectedSeverity === "all" || report.severity === selectedSeverity;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const handleResolveReport = (reportId: string) => {
    // TODO: Implement resolve report functionality
    console.log("Resolve report:", reportId);
  };

  const handleDismissReport = (reportId: string) => {
    // TODO: Implement dismiss report functionality
    console.log("Dismiss report:", reportId);
  };

  const handleBanUser = (userId: string) => {
    // TODO: Implement ban user functionality
    console.log("Ban user:", userId);
  };

  const handleViewPost = (postId: string) => {
    // TODO: Navigate to post view
    console.log("View post:", postId);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "text-red-500 bg-red-500/20";
      case "HIGH": return "text-orange-500 bg-orange-500/20";
      case "MEDIUM": return "text-yellow-500 bg-yellow-500/20";
      case "LOW": return "text-blue-500 bg-blue-500/20";
      default: return "text-gray-500 bg-gray-500/20";
    }
  };

  const getReasonText = (reason: string) => {
    switch (reason) {
      case "SPAM": return "Спам";
      case "HARASSMENT": return "Преследване";
      case "INAPPROPRIATE_CONTENT": return "Неподходящо съдържание";
      case "SECURITY_ISSUE": return "Сигурностна проблема";
      default: return reason;
    }
  };

  const stats = [
    {
      title: "Общо сигнали",
      value: reports.length.toString(),
      icon: <Flag className="h-4 w-4 text-primary" />
    },
    {
      title: "Чакащи разглеждане",
      value: reports.filter(r => r.status === "PENDING").length.toString(),
      icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />
    },
    {
      title: "Разрешени",
      value: reports.filter(r => r.status === "RESOLVED").length.toString(),
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    },
    {
      title: "Критични сигнали",
      value: reports.filter(r => r.severity === "CRITICAL").length.toString(),
      icon: <Ban className="h-4 w-4 text-red-500" />
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="bg-transparent backdrop-blur-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-300">Управление на сигнали</h1>
          <p className="text-gray-400 mt-2">
            Разглеждайте и управлявайте сигналите за неподходящо съдържание.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Flag className="h-4 w-4" />
          <span>Сигнали</span>
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
                  placeholder="Търсете по заглавие, докладващ или докладван потребител..."
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
                <option value="PENDING">Чакащи</option>
                <option value="RESOLVED">Разрешени</option>
                <option value="DISMISSED">Отхвърлени</option>
              </select>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
              >
                <option value="all">Всички нива</option>
                <option value="CRITICAL">Критично</option>
                <option value="HIGH">Високо</option>
                <option value="MEDIUM">Средно</option>
                <option value="LOW">Ниско</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="bg-transparent backdrop-blur-2xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-300">Списък със сигнали</CardTitle>
          <CardDescription>
            Разглеждайте и управлявайте сигналите за неподходящо съдържание
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-gray-400 font-medium">Пост</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Докладващ</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Докладван</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Причина</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Ниво</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Статус</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Дата</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-800 hover:bg-gray-800/20">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-300 line-clamp-1">{report.postTitle}</p>
                        <p className="text-sm text-gray-400 line-clamp-2 mt-1">{report.postContent}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {report.reportCount} сигнала
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{report.reporter.username}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{report.reportedUser.username}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <Badge variant="outline" className="text-xs">
                          {getReasonText(report.reason)}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {report.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge 
                        className={`text-xs ${getSeverityColor(report.severity)}`}
                      >
                        {report.severity === "CRITICAL" ? "Критично" :
                         report.severity === "HIGH" ? "Високо" :
                         report.severity === "MEDIUM" ? "Средно" : "Ниско"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={
                          report.status === "RESOLVED" ? "default" : 
                          report.status === "PENDING" ? "secondary" : "destructive"
                        }
                        className={
                          report.status === "RESOLVED" ? "bg-green-500/20 text-green-300" :
                          report.status === "PENDING" ? "bg-yellow-500/20 text-yellow-300" :
                          "bg-red-500/20 text-red-300"
                        }
                      >
                        {report.status === "RESOLVED" ? "Разрешен" :
                         report.status === "PENDING" ? "Чакащ" : "Отхвърлен"}
                      </Badge>
                      {report.resolvedBy && (
                        <p className="text-xs text-gray-400 mt-1">
                          от {report.resolvedBy.username}
                        </p>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {new Date(report.createdAt).toLocaleDateString('bg-BG')}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPost(report.postId)}
                          className="text-blue-400 border-blue-400 hover:bg-blue-400/20"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Преглед
                        </Button>
                        {report.status === "PENDING" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleResolveReport(report.id)}
                              className="text-green-400 border-green-400 hover:bg-green-400/20"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Разреши
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDismissReport(report.id)}
                              className="text-gray-400 border-gray-400 hover:bg-gray-400/20"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Отхвърли
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleBanUser(report.reportedUser.id)}
                              className="text-red-400 border-red-400 hover:bg-red-400/20"
                            >
                              <Ban className="h-3 w-3 mr-1" />
                              Спри потребител
                            </Button>
                          </>
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