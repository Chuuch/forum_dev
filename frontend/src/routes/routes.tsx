import PostView from "@/features/posts/PostView";
import Layout from "@/layout";
import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import {
  About,
  AdminDashboard,
  Blockchain,
  Contact,
  Home,
  LoginPage,
  News,
  NotFound,
  Profile,
  RegisterPage,
  SmartContracts,
} from "@/views";
import { Disclaimer, Moderation, Privacy, Terms } from "@/views/policy";
import Forum from "@/views/public/Forum";
import Settings from "@/views/user/Settings";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes with AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Admin routes with AdminLayout */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Add more admin routes here as needed */}
        </Route>
      </Route>

      {/* Main routes with Layout */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="settings" element={<Settings />} />
          <Route path="forum" element={<Forum />} />
          <Route path="news" element={<News />} />
          <Route path="blockchain" element={<Blockchain />} />
          <Route path="smart-contracts" element={<SmartContracts />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="terms-of-service" element={<Terms />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="moderation-policy" element={<Moderation />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
