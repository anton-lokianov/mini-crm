import { Navigate, Outlet, Route } from "react-router-dom";

import { useAuthStore } from "@/service/store/auth-store";

const AdminRoutes = () => {
  const user = useAuthStore((state) => state.user);

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminRoutes;
