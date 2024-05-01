import { useAuthStore } from "@/service/store/auth-store";
import { Role } from "@/lib/types/globalTypes";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
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
