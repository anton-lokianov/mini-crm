import AdminLayout from "@/components/layout/adminLayout";
import AuthLayout from "@/components/layout/authLayout";
import RootLayout from "@/components/layout/rootLayout";
import Dashboard from "@/pages/dashboard";
import Home from "@/pages/home";
import { Login } from "@/pages/login";
import Page404 from "@/pages/page404";
import UserSettings from "@/pages/userSettings";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <main className="h-screen">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={<AdminLayout />}>
            <Route path="/user/settings" element={<UserSettings />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </main>
  );
};

export default MainRoutes;
