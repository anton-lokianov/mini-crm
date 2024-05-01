import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/service/store/auth-store";

const AuthRoutes = () => {
  const { user, token } = useAuthStore((state) => state);

  if (!token || !user) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthRoutes;
