import { UserDropdown } from "@/features/users/UserDropdown";
import { useAuthStore } from "@/store/useAuthStore";
import {
    BarChart3,
    FileText,
    Flag,
    Home,
    Settings,
    Shield,
    Users
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/navigation/Footer";
import Notification from "../components/ui/notification";
import { ModeToggle } from "../components/ui/theme-toggle";

const adminLinks = [
  { href: "/dashboard", label: "Табло", icon: <BarChart3 className="w-4 h-4" /> },
  { href: "/dashboard/users", label: "Потребители", icon: <Users className="w-4 h-4" /> },
  { href: "/dashboard/posts", label: "Постове", icon: <FileText className="w-4 h-4" /> },
  { href: "/dashboard/reports", label: "Сигнали", icon: <Flag className="w-4 h-4" /> },
  { href: "/dashboard/settings", label: "Настройки", icon: <Settings className="w-4 h-4" /> },
];

export default function AdminLayout() {
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <div 
      className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-slate-950" 
      style={{ 
        backgroundImage: "url('/background2.jpg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundBlendMode: "revert-layer",
        backgroundRepeat: "no-repeat" 
      }}
    >
      {/* Admin Navbar */}
      <nav className="w-full flex sticky top-2 z-50 items-center justify-between max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 rounded-xl bg-red-500/10 dark:bg-red-500/5 border-red-200 dark:border-red-800 transition-all backdrop-blur-lg dark:backdrop-blur-lg">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Shield className="text-primary h-8 w-8" />
            <span className="text-lg font-bold text-primary">Админ панел</span>
          </Link>
          
          {/* Admin Navigation Links */}
          <div className="flex items-center justify-between space-x-4 ml-6">
            {adminLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`flex items-center gap-1
                  relative px-2 text-sm font-semibold leading-6 uppercase transition-colors duration-300
                  ${location.pathname === link.href
                    ? "text-primary"
                    : "text-gray-500 hover:text-primary"
                  }
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary
                  ${location.pathname === link.href ? "after:scale-x-100" : "after:scale-x-0"}
                  after:origin-left after:transition-transform after:duration-300
                `}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-semibold text-primary transition-colors"
          >
            <Home className="w-4 h-4 " />
            Обратно в начална
          </Link>
          
          {user && (
            <div className="flex items-center gap-1">
              <ModeToggle />
              <Notification />
              <UserDropdown
                email={user.email}
                photo={user.photo!}
                username={user.username!}
                id={user.id}
              />
            </div>
          )}
        </div>
      </nav>

      {/* Main content area */}
      <main className="flex items-center justify-center p-10">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
} 