import { useAuthStore } from "@/service/store/auth-store";
import { Navigate, Outlet } from "react-router-dom";
import { Role } from "@/lib/types/globalTypes";

type Props = {
  roles: Role[];
};

const RoleBaseRoutes = ({ roles }: Props) => {
  const user = useAuthStore((state) => state.user);

  if (!roles.includes(user?.role as Role)) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <Outlet />;
};

export default RoleBaseRoutes;
