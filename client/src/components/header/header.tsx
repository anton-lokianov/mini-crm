import React from "react";
import ModeToggle from "../global/modeToggle";
import UserDetails from "./userDetails";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/service/store/auth-store";

const Header = () => {
  const location = useLocation();
  const currentPath = ["/"].includes(location.pathname);
  const { user, token } = useAuthStore((state) => state);

  return (
    <header className="flex justify-between items-center h-20 px-8 border-b-[1px]">
      <div className="flex items-center">
        <img src="/logo.png" width={80} height={80} alt="logo" />
      </div>
      <div className="flex items-center gap-2">
        {!token && !user && (
          <Link
            className="bg-primary px-6 py-[6px] rounded hover:bg-primary/70 tracking-wider text-white"
            to={currentPath ? "/login" : "/"}>
            {currentPath ? "LOGIN" : "HOME"}
          </Link>
        )}
        {token && user && (
          <h2 className="text-3xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-500">
            {user.company}
          </h2>
        )}
        {token && user && <UserDetails {...user} />}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
