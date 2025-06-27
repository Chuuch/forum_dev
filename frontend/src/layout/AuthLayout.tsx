import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div 
      className="min-h-screen mx-auto bg-transparent backdrop-blur-xl" 
      style={{ 
        backgroundImage: "url('/background2.jpg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundBlendMode: "revert-layer",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main content area */}
      <main className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
    </div>
  );
} 