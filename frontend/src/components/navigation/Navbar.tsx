import { Link, useLocation } from "react-router-dom";
// import { UserDropdown } from "../ui/user-dropdown";
import { UserDropdown } from "@/features/users/UserDropdown";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Blocks,
  Home,
  Layers,
  Layers2,
  MessagesSquare,
  Newspaper,
  UsersRound
} from "lucide-react";
import Notification from "../ui/notification";
import { ModeToggle } from "../ui/theme-toggle";

const links = [
  { href: "/", label: "Начало", icon: <Home className="w-4 h-4" /> },
  { href: "/news", label: "Новини", icon: <Newspaper className="w-4 h-4" /> },
  {
    href: "/blockchain",
    label: "Блокчейн",
    icon: <Blocks className="w-4 h-4" />,
  },
  {
    href: "/smart-contracts",
    label: "смарт контракти",
    icon: <Layers2 className="w-4 h-4" />,
  },
  { href: "/forum", label: "форум", icon: <MessagesSquare className="w-4 h-4" /> },
  { href: "/about", label: "за нас", icon: <UsersRound className="w-4 h-4" /> },
];

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuthStore();
  console.log(user);


  return (
    <nav className="w-full flex sticky top-2 z-50 items-center justify-between max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 rounded-xl bg-gray-200/10 dark:bg-transparent border-gray-200 dark:border-gray-800 transition-all backdrop-blur-lg dark:backdrop-blur-lg">
      <Link to="/">
        <Layers className="text-primary h-12 w-12" />
      </Link>
      <div className="flex items-center justify-between space-x-4 ml-10">
        {links.map((link, index) => (
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
      <div className="flex items-center">
        {user ? (
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
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2 items-center mx-auto space-x-2">
            <ModeToggle />
            <Link
              to="/login"
              className={`
    relative px-2 text-sm font-semibold transition-colors duration-300 uppercase
    ${location.pathname === "/login"
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary"
                }
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary
    ${location.pathname === "/login" ? "after:scale-x-100" : "after:scale-x-0"}
    after:origin-left after:transition-transform after:duration-300
  `}
            >
              Вход
            </Link>
            <div className="flex items-center text-primary/90 h-10">|</div>

            <Link
              to="/register"
              className={`
    relative px-2 text-sm font-semibold uppercase transition-colors duration-300
    ${location.pathname === "/register"
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary"
                }
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary
    ${location.pathname === "/register"
                  ? "after:scale-x-100"
                  : "after:scale-x-0"
                }
    after:origin-left after:transition-transform after:duration-300
  `}
            >
              Създай акаунт
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
