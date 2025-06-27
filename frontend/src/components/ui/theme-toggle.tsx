import { Moon } from "lucide-react";
import { FaRegLightbulb } from "react-icons/fa";


import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useTheme } from "../../context/ThemeContext";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="transition-colors">
          <FaRegLightbulb className="!h-5 !w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute !h-5 !w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" dark:bg-transparent backdrop-blur-lg space-y-2 text-gray-300">
        <DropdownMenuItem
          className="cursor-pointer hover:bg-primary dark:hover:bg-gray-800/50!"
          onClick={() => setTheme("light")}
        >
          Светла
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer hover:primary dark:hover:bg-gray-800/50!"
        >
          Тъмна
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer hover:bg-primary dark:hover:bg-gray-800/50!"
        >
          Системна
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
