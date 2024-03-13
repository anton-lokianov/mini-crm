import { useAuthStore } from "@/service/store/auth-store";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/siderbar";

const AuthLayout = () => {
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

export default AuthLayout;
