import { useAuthStore } from "@/service/store/auth-store";

type Role = "admin" | "manager" | "operator" | "service";

type Props = {
  children: React.ReactNode;
  roles: Role[];
};

const RoleBaseLayout = ({ roles, children }: Props) => {
  const user = useAuthStore((state) => state.user);

  if (!roles.includes(user?.role as Role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleBaseLayout;
