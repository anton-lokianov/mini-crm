import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/service/store/auth-store";

const RootRoutes = () => {
  const { user, token } = useAuthStore((state) => state);

  if (token || user) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default RootRoutes;
