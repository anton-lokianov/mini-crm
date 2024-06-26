import ModeToggle from "../global/modeToggle";
import UserDetails from "./userDetails";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/service/store/auth-store";
import Sidebar from "../sidebar/siderbar";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useUIOverlayStore } from "@/service/store/UIOverlay-store";

const Header = () => {
  const location = useLocation();
  const currentPath = ["/"].includes(location.pathname);
  const { user, token } = useAuthStore((state) => state);
  const openOverlay = useUIOverlayStore((state) => state.openOverlay);

  return (
    <header className="flex justify-between items-center h-20 px-11 border-b-[1px] relative">
      <h1 className="first-letter:font-extrabold  first-letter:text-5xl text-3xl text-primary font-light font-serif ml-4">
        Tafnit
      </h1>
      <div className="flex items-center gap-2">
        {!token && !user && (
          <Link
            role="button"
            className="bg-gradient-to-r from-primary  to-red-500 px-6 py-[6px] rounded hover:opacity-90 tracking-wider text-white"
            to={currentPath ? "/login" : "/"}>
            {currentPath ? "LOGIN" : "HOME"}
          </Link>
        )}
        {token && user && (
          <>
            <h2 className="text-3xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-500">
              {user.company}
            </h2>
            <Button
              onClick={() => openOverlay(<Sidebar />, "sheet")}
              size="icon"
              variant="ghost"
              className="absolute left-2">
              <Menu />
            </Button>
            <UserDetails
              fullName={user.fullName || ""}
              userName={user.userName || ""}
              role={user.role || ""}
            />
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
