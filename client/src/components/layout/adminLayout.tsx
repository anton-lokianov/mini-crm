import { useAuthStore } from "@/service/store/auth-store";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
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

export default AdminLayout;
