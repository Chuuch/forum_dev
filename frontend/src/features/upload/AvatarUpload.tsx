import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useUploadAvatar } from "@/hooks/useUpload";
import { useAuthStore } from "@/store/useAuthStore";
import { ImageUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function AvatarUpload() {
  const { user, setUser } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadAvatar } = useUploadAvatar();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setPreview(tempUrl);

    try {
      setIsLoading(true);
      const data = await toast.promise(uploadAvatar(file), {
        loading: "Качване на снимка..",
        success: "Снимката е качена успешно!",
        error: "Възникна грешка при качване на снимка.",
      });

      if (data?.photo && user) {
        setUser({
          ...user,
          photo: data.photo,
        });
        setPreview(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const imageSrc =
    preview ||
    (user?.photo
      ? `${import.meta.env.VITE_SERVER_URL}/uploads/${user.photo}`
      : undefined);

  return (
    <div className="space-y-2">
      <div className="flex flex-col items-center justify-start gap-4">
        {isLoading ? (
          <div className="w-52 h-52 rounded-xl bg-gray-300 dark:bg-gray-700 animate-pulse" />
        ) : (
          <img
            src={imageSrc}
            alt="Avatar"
            className="w-52 h-52 rounded-xl object-cover border"
          />
        )}
        <Button
          onClick={() => inputRef.current?.click()}
          className="text-sm text-gray-800"
          variant="default"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              {" "}
              <Spinner />
            </>
          ) : (
            <>
              Смени снимка
              <ImageUp />
            </>
          )}
        </Button>
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
