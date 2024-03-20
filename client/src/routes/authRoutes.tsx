import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/service/store/auth-store";
import Sidebar from "../components/sidebar/siderbar";

const AuthRoutes = () => {
  const { user, token } = useAuthStore((state) => state);
  return (
    <>
      {token && user ? (
        <div className="">
          {/* <Sidebar /> */}
          <Outlet />
        </div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};

export default AuthRoutes;
