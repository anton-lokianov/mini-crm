import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/service/store/auth-store";

const RootRoutes = () => {
  const { user, token } = useAuthStore((state) => state);

  return (
    <>
      {!token && !user ? (
        <Outlet />
      ) : (
        <Navigate to="/dashboard" replace={true} />
      )}
    </>
  );
};

export default RootRoutes;
