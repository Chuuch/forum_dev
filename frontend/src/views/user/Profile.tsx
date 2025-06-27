import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AvatarUpload from "@/features/upload/AvatarUpload";
import { UpdateProps, useUpdate } from "@/hooks/useUpdate";
import { useAuthStore } from "@/store/useAuthStore";
import { formatDistanceToNow } from "date-fns";
import { bg } from "date-fns/locale";
import {
  BriefcaseBusiness,
  CalendarRange,
  Clock9,
  KeyRound,
  Mail,
  MapPin,
  MessagesSquare,
  Save,
  Shield,
  UserPen,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Profile() {
  const { user } = useAuthStore();
  const [username, setUsername] = useState<string | null>(user?.username ?? "");
  const [email] = useState(user?.email ?? "");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [profession, setProfession] = useState<string>(user?.profession || "");
  const [city, setCity] = useState<string | undefined>(user?.city || "");
  const { mutate: updateProfile } = useUpdate();

  const profileData = [
    {
      icon: <CalendarRange className="text-primary" size={18} />,
      label: "Член от:",
      value: user?.memberSince ? new Date(user.memberSince).toLocaleDateString("bg-BG") : "Няма",
    },
    {
      icon: <Shield className="text-primary" size={18} />,
      label: "Права:",
      value: user?.role === "USER" ? "Потребител" : "Админ",
      isNested: true,
    },
    {
      icon: <MessagesSquare className="text-primary" size={18} />,
      label: "Постове:",
      value: "0",
    },
    {
      icon: <BriefcaseBusiness className="text-primary" size={18} />,
      label: "Професия:",
      value: user?.profession || "Няма",
    },
    {
      icon: <MapPin className="text-primary" size={18} />,
      label: "Град:",
      value: city?.trim() || "Няма",
    },
    {
      icon: <Clock9 className="text-primary" size={18} />,
      label: "Последно активен:",
      value: user?.lastActive ? formatDistanceToNow(new Date(user.lastActive), { addSuffix: true, locale: bg }) : "Няма",
    },
  ];

  const handleSave = (formData: UpdateProps) => {
    if (password && password !== confirmPassword) {
      toast.error("Паролите не съвпадат.");
      return;
    }
    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Профилът е обновен успешно");
        setPassword("");
        setConfirmPassword("");
      },
      onError: () => {
        toast.error("Възникна грешка при обновяване на профила");
      },
    });
  };

  return (
    <>
      <title>TDB | Моят профил</title>
      <div
        className="w-full max-w-6xl mx-auto px-4 py-12"
      >
        <Card className="dark:bg-transparent backdrop-blur-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary gap-2">
              Моят профил
              <UserPen className="text-primary" />
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex gap-3">
              {/** Avatar Upload */}
              <AvatarUpload />

              {/**User details */}
              <div className="flex flex-col gap-3 items-start justify-start text-muted-foreground">
                {profileData.map(({ icon, label, value, isNested }, idx) => (
                  <p key={idx} className="flex flex-row gap-1 items-center">
                    {icon}
                    {label}
                    {isNested ? (
                      <span className="ml-2 dark:text-gray-300">{value}</span>
                    ) : (
                      <span className="ml-1 dark:text-gray-300">{String(value)}</span>
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/**Email (readonly) */}
            <div>
              <Label htmlFor="email" className="gap-1">
                <Mail size={16} className="text-primary" />
                Имейл адрес
              </Label>
              <Input
                id="email"
                value={email}
                disabled
                className="opacity-70 cursor-not-allowed mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Имейл адресът не може да бъде променен.
              </p>
            </div>

            {/** Username */}
            <div>
              <Label htmlFor="username" className="gap-1">
                <UserRound size={16} className="text-primary" />
                Потребителско име
              </Label>
              <Input
                id="username"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Въведете ново потребителско име"
                className="mt-1"
              />
            </div>

            {/** New Password */}
            <div>
              <Label htmlFor="password" className="gap-1">
                <KeyRound size={16} className="text-primary" />
                Парола
              </Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Въведете нова парола"
                className="mt-1"
              />
            </div>

            {/** Confirm New Password */}
            <div>
              <Label htmlFor="confirmPassword" className="gap-1">
                <KeyRound size={16} className="text-primary" />
                Потвърдете паролата
              </Label>
              <Input
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Потвърдете новата парола"
                className="mt-1"
              />
            </div>

            {/** Profession */}
            <div>
              <Label htmlFor="profession" className="gap-1">
                <BriefcaseBusiness size={16} className="text-primary" />
                Професия
              </Label>
              <Input
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder={user?.profession || "Въведете професия."}
                className="mt-1"
              />
            </div>

            {/* City */}
            <div>
              <Label htmlFor="city" className="gap-1">
                <MapPin size={16} className="text-primary" />
                Град
              </Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Въведете град"
                className="mt-1"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              className="text-gray-800"
              onClick={() =>
                handleSave({
                  username: username?.trim(),
                  password: password?.trim() || undefined,
                  city: city?.trim() || undefined,
                  profession: profession?.trim() || undefined,
                })
              }
            >
              Запази промените
              <Save />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
