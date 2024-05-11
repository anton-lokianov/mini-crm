import { ArrowUpDown, MoreHorizontal, Play, Power, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Driver } from "@/lib/types/globalTypes";
import { cn } from "@/lib/utils";

export const data: Driver[] = [
  {
    _id: "m5gr84i9",
    firstName: "Jane",
    lastName: "Doe",
    carNumber: "12345621",
    status: "active",
    employeeType: "tow-driver",
    factorNumber: "123",
    workingArea: "north",
  },
  {
    _id: "3u1rsdasv4",
    firstName: "aaron",
    lastName: "Doe",
    carNumber: "1224786",
    status: "inactive",
    employeeType: "delivery-driver",
    factorNumber: "88",
    workingArea: "south",
  },
  {
    _id: "3u1reuv4",
    firstName: "John",
    lastName: "Doe",
    carNumber: "1224786",
    status: "active",
    employeeType: "repair-driver",
    factorNumber: "128",
    workingArea: "center",
  },
];

export const columns: ColumnDef<Driver>[] = [
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "fullName",
    header: "Driver Name",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("fullName")}</div>;
    },
  },
  {
    accessorKey: "factorNumber",
    header: "Factor number",
    cell: ({ row }) => <div>{row.getValue("factorNumber")}</div>,
  },
  {
    accessorKey: "employeeType",
    header: "Employee type",
    cell: ({ row }) => <div>{row.getValue("employeeType")}</div>,
  },
  {
    accessorKey: "workingArea",
    header: "Working area",
    cell: ({ row }) => <div>{row.getValue("workingArea")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-[0.5rem]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div
        className={cn("text-red-500", {
          "text-green-500": row.getValue("status") === "active",
        })}>
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "carNumber",
    header: "Car number",
    cell: ({ row }) => <div>{row.getValue("carNumber")}</div>,
  },
  {
    id: "shiftControl",
    header: "Shift control",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <Button
          className={cn("text-red-500 hover:text-red-500/80 ml-5", {
            "text-green-500 hover:text-green-500/80": status === "inactive",
          })}
          size="icon"
          variant="ghost">
          {status === "active" ? <Power /> : <Play />}
        </Button>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              View driver details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
