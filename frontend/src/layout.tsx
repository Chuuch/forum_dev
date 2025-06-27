import { Outlet } from "react-router-dom";
import { Footer } from "./components/navigation/Footer";
import Navbar from "./components/navigation/Navbar";

export default function Layout() {
  return (
    <div 
    className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100  dark:bg-slate-950" 
    style={{ 
      backgroundImage: "url('/background2.jpg')", 
      backgroundSize: "cover", 
      backgroundPosition: "center", 
      backgroundBlendMode: "revert-layer",
      backgroundRepeat: "no-repeat" }}>
      <Navbar />
      <main className="flex items-center justify-center p-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
