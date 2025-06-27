import "tailwindcss";
import AppRoutes from "./routes/routes.tsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <AppRoutes />
    </QueryClientProvider>
  );
}
