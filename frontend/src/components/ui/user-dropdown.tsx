import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { IconContext } from "react-icons/lib";
import { TbUserHexagon } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function UserDropdown() {
  const { logout } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Излязохте успешно!");
    } catch (error) {
      toast.error("Oпа! Неуспешно излизане!");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="rounded-full h-10 w-10 bg-transparent outline-none hover:bg-transparent hover:outline-none hover:border-none cursor-pointer"
        >
          <IconContext.Provider
            value={{ className: "text-teal-500 !h-6 !w-6" }}
          >
            <TbUserHexagon />
          </IconContext.Provider>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex flex-col items-center bg-transparent! backdrop-blur-lg! space-y-2"
        align="end"
      >
        <DropdownMenuItem className="cursor-pointer hover:bg-teal-600 dark:hover:bg-teal-600">
          <Link to="/profile:id">Моят профил</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-teal-600 dark:hover:bg-teal-600">
          <Link to="/settings">Настройки</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem> */}
        <Button
          onClick={handleSignOut}
          className="flex mx-auto mb-2 cursor-pointer bg-transparent hover:bg-teal-500 dark:hover:bg-teal-600 dark:bg-transparent text-gray-800 dark:text-white  outline-none border-none hover:border-none ring-0 hover:ring-0"
        >
          Изход
        </Button>
        {/* </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
