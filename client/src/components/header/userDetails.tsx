import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

import { LogOut, Settings, User, UserCog } from "lucide-react";
import { useAuthStore } from "@/service/store/auth-store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  userName: string;
  fullName: string;
  role: string;
};

const UserDetails = ({ userName, fullName, role }: Props) => {
  const logout = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Success", {
      description: "see you soon!",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:ring-1 ring-primary">
          <AvatarFallback>{fullName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-3">
        <DropdownMenuLabel className="text-center">
          User details
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex gap-2 items-center">
          <User className="w-4 h-4" />
          <span>user: &nbsp;{userName}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="flex gap-2 items-center">
          <UserCog className="w-4 h-4" />
          <span>type: &nbsp;{role}</span>
        </DropdownMenuLabel>
        {role === "admin" && (
          <DropdownMenuItem
            className="flex cursor-pointer tracking-wider"
            onClick={() => navigate("/user/settings")}>
            <Settings className="h-4 w-4 text-primary" />
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex justify-center items-center cursor-pointer">
          <LogOut className="h-4 w-4 text-primary" />
          <DropdownMenuLabel className="tracking-wider">
            LOGOUT
          </DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDetails;
