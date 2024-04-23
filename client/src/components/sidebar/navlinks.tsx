import { CalendarClock, Car, LayoutDashboard, Users } from "lucide-react";

export const navLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard />,
    access: "all",
  },
  {
    title: "Drivers management",
    path: "/drivers-panel",
    icon: <Car />,
    access: ["admin", "manager", "operator"],
  },
  {
    title: "Shifts management",
    path: "/shifts-panel",
    icon: <CalendarClock />,
    access: ["admin", "manager"],
  },
  {
    title: "Clients management",
    path: "/clients-panel",
    icon: <Users />,
    access: ["admin", "manager"],
  },
];
