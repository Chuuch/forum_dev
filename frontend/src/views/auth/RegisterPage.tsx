import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Layers, Mail, UserRound, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Spinner } from "../../components/ui/spinner";
import { registerSchema } from "../../lib/zodSchemas";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const mutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  interface FormData {
    email: string;
    password: string;
    username: string;
  }

  const onSubmit = (data: FormData) => {
    setError(null);
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Регистрацията е успешна!");
        navigate("/");
      },
      onError: (error) => {
        setError(error?.message || "Възникна грешка при регистрацията.");
        toast.error(error?.message || "Възникна грешка при регистрацията.");
      },
    });
  };

  return (
    <div className="w-full  mx-auto flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full min-h-screen flex justify-center mx-auto bg-transparent backdrop-blur-xl rounded-lg space-y-4"
      >
        <div className="flex flex-col w-3/5  justify-center p-6 space-y-4">
          <h1 className="flex items-center text-3xl text-primary font-bold gap-2">
            Създай профил
            <UserRoundPlus size={28} />
          </h1>

          {error && <p className="text-primary">{error}</p>}

          <div className="mb-4 space-y-1">
            <Label className="text-sm font-medium text-gray-500 dark:text-gray-300">
              <UserRound className="text-primary" size={16} />
              Потребителско име
            </Label>
            <Input
              {...register("username")}
              type="text"
              required
              placeholder="Сатоши Накамото"
              className="w-full px-3 py-2 dark:border rounded-lg shadow-sm focus:ring-none  outline-none focus:outline-none text-gray-400 dark:border-stone-900"
            />
            {errors.username && (
              <p className="text-primary">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-4 space-y-1">
            <Label className="text-sm font-medium text-gray-500 dark:text-gray-300">
              <Mail className="text-primary" size={16} />
              Имейл
            </Label>
            <Input
              {...register("email")}
              required
              placeholder="dailyblock@example.com"
              className="w-full px-3 py-2 dark:border rounded-lg shadow-sm focus:ring-none  outline-none focus:outline-none text-gray-400 dark:border-stone-900"
            />
            {errors.email && (
              <p className="text-primary">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4 space-y-1">
            <Label className="text-sm font-medium text-gray-500 dark:text-gray-300">
              <KeyRound className="text-primary" size={16} />
              Парола
            </Label>
            <Input
              {...register("password")}
              type="password"
              required
              placeholder="**********"
              className="w-full px-3 py-2 dark:border rounded-lg shadow-sm focus:ring-none  outline-none focus:outline-none text-gray-400 dark:border-stone-900"
            />
            {errors.password && (
              <p className="text-primary">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            className="flex items-center w-full p-2 rounded-md bg-primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                {" "}
                <Spinner />
              </>
            ) : (
              <>
                Създай профил <UserRoundPlus />{" "}
              </>
            )}
          </Button>

          <p className="flex items-center justify-start gap-1 mt-2 text-xs text-gray-400">
            Вече имате регистрация?{" "}
            <Link to="/login" className="hover:underline text-primary">
              Влез в своя профил.
            </Link>
          </p>

          <Separator className="flex-1 w-full max-h-0.5 text-gray-700" />

          <div className=" mt-4 text-xs text-gray-500 text-center rounded-xl">
            Този сайт е защитен от reCAPTCHA и се прилагат{" "}
            <Link
              to="https://policies.google.com/privacy"
              className="text-primary hover:underline"
            >
              Политиката за поверителност{" "}
            </Link>
            и{" "}
            <Link
              to="https://policies.google.com/terms"
              className="text-primary hover:underline"
            >
              Условията за ползване{" "}
            </Link>
            на Google.
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/background2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "revert-layer",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full flex flex-row justify-center items-center hidden lg:flex"
        >
          <Layers className="text-teal-300 h-96 w-96" />
          <h1 className="text-[#f9f9f9] text-8xl font-bold">
            The <br /> Daily <br /> Block
          </h1>
        </div>
      </form>
    </div>
  );
}
