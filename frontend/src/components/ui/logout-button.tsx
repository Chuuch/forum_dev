import { useLogout } from "@/hooks/useLogout";
import { Button } from "./button";
import toast from "react-hot-toast";
import { Spinner } from "./spinner";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Успешно излязохте от профила.");
      },
      onError: () => {
        toast.error("Възникна грешка при излизане.");
      },
    });
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant="ghost"
      className="w-3/4 h-8"
    >
      {isPending ? (
        <>
          <Spinner />
        </>
      ) : (
        "Изход"
      )}
      <LogOut className="ml-2 text-white" />
    </Button>
  );
}
