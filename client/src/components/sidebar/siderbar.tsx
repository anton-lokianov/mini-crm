import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="absolute left-6 cursor-pointer" asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-[17rem] px-0">
        <SheetHeader>
          <SheetTitle className="text-center">Navigation Menu</SheetTitle>
        </SheetHeader>
        <SideBarLinks />
      </SheetContent>
    </Sheet>
  );
};

const SideBarLinks = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-2 mt-14">
      {navLinks.map((link) => (
        <div
          className={cn(
            "flex items-center ml-4 gap-2 py-1 px-4 rounded-l-full relative",
            {
              "bg-gradient-to-r from-primary to-red-500 navLink":
                location.pathname.startsWith(link.path),
            }
          )}>
          <span>{link.icon}</span>
          <Link to={link.path} className="text-lg">
            {link.title}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
