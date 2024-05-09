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
import { useUIOverlayStore } from "@/service/store/UIOverlay-store";
import CallAction from "./callAction";

export const data: RoadCall[] = [
  {
    id: "m5gr84i9",
    client: "Jane Doe",
    serviceCall: 1,
    carNumber: "12345621",
    location: "Tel Aviv",
    destination: "Jerusalem",
    carModal: "Toyota",
    factor: "123 yossi",
    status: "pending",
    serviceType: "towing",
    description: "The car is not working",
    date: "2021-10-10 11:00",
  },
  {
    id: "3u1reuv4",
    client: "John Doe",
    serviceCall: 2,
    location: "Jerusalem",
    carNumber: "1224786",
    destination: "Haifa",
    carModal: "Mazda",
    factor: "88 avi",
    status: "pending",
    serviceType: "repair",
    description: "The car is not working",
    date: "2021-10-10 11:00",
  },
];

export type RoadCall = {
  id: string;
  client: string;
  serviceCall: number;
  location: string;
  carNumber: string;
  carModal: string;
  destination: string;
  factor?: string;
  status: string;
  serviceType: string;
  description: string;
  date: string;
};

export const columns: ColumnDef<RoadCall>[] = [
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
    accessorKey: "serviceCall",
    header: "Service call",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("serviceCall")}</div>
    ),
  },
  {
    accessorKey: "carModal",
    header: "Car modal",
    cell: ({ row }) => <div>{row.getValue("carModal")}</div>,
  },
  {
    accessorKey: "carNumber",
    header: "Car number",
    cell: ({ row }) => <div>{row.getValue("carNumber")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => <div>{row.getValue("destination")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "factor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 px-[0.5rem]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Factor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase px-[0.5rem]">{row.getValue("factor")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "serviceType",
    header: "Service type",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("serviceType")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Open date",
    cell: ({ row }) => {
      const date = row.getValue("date") as string;

      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "client",
    header: "Client Name",
    cell: ({ row }) => {
      const client = row.getValue("client") as string;

      return <div className="lowercase">{client}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const openOverlay = useUIOverlayStore((state) => state.openOverlay);

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
              View road call details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openOverlay(<CallAction />, "sheet")}
              className="cursor-pointer">
              Preform action
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
