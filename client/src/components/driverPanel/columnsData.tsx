import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import { access } from "fs";

export const data: Driver[] = [
  {
    _id: "m5gr84i9",
    firstName: "Jane",
    lastName: "Doe",
    carNumber: "12345621",
    status: "active",
    employeeType: "tow-driver",
    factorNumber: 123,
    workingArea: "north",
  },
  {
    _id: "3u1reuv4",
    firstName: "John",
    lastName: "Doe",
    carNumber: "1224786",
    status: "inactive",
    employeeType: "repair-driver",
    factorNumber: 88,
    workingArea: "center",
  },
];

export const columns: ColumnDef<Driver>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "Driver Name",
    cell: ({ row }) => {
      console.log(row.getValue("firstName"));
      <div className="capitalize">{row.getValue("firstName")}</div>;
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
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "carNumber",
    header: "Car number",
    cell: ({ row }) => <div>{row.getValue("carNumber")}</div>,
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
