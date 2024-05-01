import { Route, Routes } from "react-router-dom";

import Dashboard from "@/pages/dashboard";
import Home from "@/pages/home";
import { Login } from "@/pages/login";
import Page404 from "@/pages/page404";
import RootRoutes from "@/routes/rootRoutes";
import AuthRoutes from "./authRoutes";
import RoleBaseRoutes from "./roleBaseRoutes";
import { Suspense, lazy } from "react";

const UserSettings = lazy(() => import("@/pages/userSettings"));
const DriversPanel = lazy(() => import("@/pages/driversPanel"));
const ClientsPanel = lazy(() => import("@/pages/clientsPanel"));
const ShiftsPanel = lazy(() => import("@/pages/shiftsPanel"));

const MainRoutes = () => {
  return (
    <main className="h-full">
      <Routes>
        <Route element={<RootRoutes />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route element={<RoleBaseRoutes roles={["admin"]} />}>
            <Route
              path="/user/settings"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserSettings />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={
              <RoleBaseRoutes roles={["admin", "manager", "operator"]} />
            }
          >
            <Route
              path="/drivers-panel"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <DriversPanel />
                </Suspense>
              }
            />
          </Route>
          <Route element={<RoleBaseRoutes roles={["admin", "manager"]} />}>
            <Route
              path="/clients-panel"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ClientsPanel />
                </Suspense>
              }
            />
            <Route
              path="/shifts-panel"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ShiftsPanel />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </main>
  );
};

export default MainRoutes;
