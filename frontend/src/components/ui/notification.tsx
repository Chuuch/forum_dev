import { Clock } from "lucide-react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";


export default function Notification() {
    return (
        <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="transition-colors">
                        <IoNotificationsOutline className="!w-5 !h-5 dark:hover:text-white!" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-transparent backdrop-blur-lg space-y-2">
                    <h1 className="text-gray-300 text-sm font-semibold text-start p-2">Известия</h1>
                <DropdownMenuItem className="flex flex-col items-start justify-start gap-2 cursor-pointer hover:bg-gray-900/50!">
                    <div className="flex col items-start gap-2">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary border border-gray-700 backdrop-blur-lg rounded-lg">
                            <p className="text-gray-800 text-lg font-bold">СГ</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-gray-300">Севдалин Генов хараса вашият коментар</h1>
                            <p className="text-gray-500 text-xs flex items-center gap-1">
                                <Clock className="w-4! h-4! text-primary" />
                                преди 1 минута
                            </p>
                        </div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="w-9/10 mx-auto flex items-center justify-center"/>
                <DropdownMenuItem className="flex flex-col items-start justify-start gap-2 cursor-pointer hover:bg-gray-900/50!">
                    <div className="flex col items-start gap-2">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary border border-gray-700 backdrop-blur-lg rounded-lg">
                            <p className="text-gray-800 text-lg font-bold">ИИ</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-gray-300">Иван Иванов хараса вашият пост</h1>
                            <p className="text-gray-500 text-xs flex items-center gap-1">
                                <Clock className="w-4! h-4! text-primary" />
                                преди 21 минути
                            </p>
                        </div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="w-9/10 mx-auto flex items-center justify-center"/>
                <DropdownMenuItem className="flex flex-col items-start justify-start gap-2 cursor-pointer hover:bg-gray-900/50!">
                    <div className="flex col items-start gap-2">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary border border-gray-700 backdrop-blur-lg rounded-lg">
                            <p className="text-gray-800 text-lg font-bold">ИИ</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-gray-300">Иван Иванов коментира вашият пост</h1>
                            <p className="text-gray-500 text-xs flex items-center gap-1">
                                <Clock className="w-4! h-4! text-primary" />
                                преди 43 минути
                            </p>
                        </div>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}