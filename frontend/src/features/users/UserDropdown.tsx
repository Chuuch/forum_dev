import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/ui/logout-button";
import Settings from "@/views/user/Settings";
import { CircleUser, UserRoundPen, Wrench } from "lucide-react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


interface UserProps {
  id: string;
  username: string;
  email: string;
  photo: string;
}

export function UserDropdown({ id, username, photo }: UserProps) {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10" size="icon">
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage
              src={`${import.meta.env.VITE_SERVER_URL}/uploads/${photo}`}
              alt="User Image"
            />
            <AvatarFallback>
              <CircleUser className="h-6! w-6!" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-42 bg-transparent! backdrop-blur-lg! space-y-2" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col space-y-1 text-primary">
          <p className="text-sm font-medium leading-none">@{username}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center w-full">
          <Link
            className="flex items-center justify-center gap-2 w-full"
            to={`/profile/${id}`}
          >
            Моят профил
            <UserRoundPen className="text-primary h-5! w-5!" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-center w-full cursor-pointer gap-2" onClick={() => navigate('/dashboard')}>
          Админ панел
          <MdOutlineAdminPanelSettings className="text-primary h-5! w-5!" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-center w-full cursor-pointer gap-2">
          <Settings />
          <Wrench className="text-primary h-5! w-5!" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-center">
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
