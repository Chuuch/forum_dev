import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fingerprint, KeyRound, Layers, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import GoogleLoginButton from "../../components/ui/google-button";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Spinner } from "../../components/ui/spinner";
import { loginSchema } from "../../lib/zodSchemas";

export default function LoginPage() {
  const mutation = useLogin();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  interface FormData {
    email: string;
    password: string;
  }

  const onSubmit = (data: FormData) => {
    setError(null);
    setLoading(true);
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Влязохте успешно!");
        navigate("/");
      },
      onError: (error) => {
        setError(error?.message || "Възникна грешка при влизане.");
        toast.error(error?.message || "Възникна грешка при влизане.");
      },
    });
  };

  return (
    <div
      className="w-full  mx-auto flex flex-col justify-center items-center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full min-h-screen flex justify-center mx-auto bg-transparent backdrop-blur-xl rounded-lg space-y-4"
      >
        <div className="flex flex-col w-3/5  justify-center p-6 space-y-4">
        <h1 className="flex items-center text-3xl text-primary/80 font-bold gap-2">
          Влез в своя профил
          <Fingerprint size={28} />
        </h1>

        {error && <p className="text-primary">{error}</p>}

        <div className="mb-4 space-y-1">
          <Label className="text-sm font-medium text-gray-500 dark:text-gray-300">
            <Mail size={16} className="text-primary" />
            Имейл
          </Label>
          <Input
            {...register("email")}
            type="email"
            required
            placeholder="Въведете имейла си"
            onChange={() => error && setError(null)}
            className="w-full px-3 py-2 dark:border rounded-lg shadow-sm focus:ring-none  outline-none focus:outline-none text-gray-400 dark:border-stone-900"
          />
          {errors.email && (
            <p className="text-primary">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-500 dark:text-gray-300">
            <KeyRound size={16} className="text-primary" />
            Парола
          </Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Въведете паролата си"
            onChange={() => error && setError(null)}
            className="w-full px-3 py-2 dark:border rounded-lg shadow-sm focus:ring-none  outline-none focus:outline-none text-gray-400  dark:border-gray-900"
          />
          {errors.password && (
            <p className="text-primary">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          className="w-full p-2 rounded-md bg-primary text-gray-800"
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              Влез <LogIn />
            </>
          )}
        </Button>

        <p className="flex items-center justify-start gap-1 mt-2 text-xs text-gray-400">
          Все още нямате регистрация?{" "}
          <Link to="/register" className="hover:underline text-primary">
            Създай профил.
          </Link>
        </p>

        <div className="flex items-center w-full text-gray-500 gap-12">
          <Separator className="flex-1" />
          <p>или</p>
          <Separator className="flex-1" />
        </div>

        <GoogleLoginButton />

        <div className="mt-4 text-xs text-gray-500 text-center">
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
        <div style={{ backgroundImage: "url('/background2.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "revert-layer", backgroundRepeat: "no-repeat" }} className="w-full flex flex-row justify-center items-center hidden lg:flex">
          <Layers className="text-teal-300 h-96 w-96" />
        <h1 className="text-[#f9f9f9] text-8xl font-bold">The <br /> Daily <br /> Block</h1>
        </div>
      </form>
    </div>
  );
}
