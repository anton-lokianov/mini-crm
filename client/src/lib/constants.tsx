import { CalendarClock, Car, LayoutDashboard, Users } from "lucide-react";

export const navLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Drivers management",
    path: "/drivers-panel",
    icon: <Car />,
  },
  {
    title: "Shifts management",
    path: "/shifts-panel",
    icon: <CalendarClock />,
  },
  {
    title: "Clients management",
    path: "/clients-panel",
    icon: <Users />,
  },
];
