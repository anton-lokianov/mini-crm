import { Route, Routes } from "react-router-dom";

import Dashboard from "@/pages/dashboard";
import Home from "@/pages/home";
import { Login } from "@/pages/login";
import Page404 from "@/pages/page404";
import UserSettings from "@/pages/userSettings";
import RootRoutes from "@/routes/rootRoutes";
import AuthRoutes from "./authRoutes";
import AdminRoutes from "./adminRoutes";

const MainRoutes = () => {
  return (
    <main className="h-screen">
      <Routes>
        <Route element={<RootRoutes />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={<AdminRoutes />}>
            <Route path="/user/settings" element={<UserSettings />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </main>
  );
};

export default MainRoutes;
