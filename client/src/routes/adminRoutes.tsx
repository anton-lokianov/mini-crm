import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/service/store/auth-store";

const AdminRoutes = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {user?.role === "admin" ? (
        <Outlet />
      ) : (
        <Navigate to="/dashboard" replace={true} />
      )}
    </>
  );
};

export default AdminRoutes;
