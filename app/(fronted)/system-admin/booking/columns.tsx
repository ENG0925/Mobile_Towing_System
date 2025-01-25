import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/common/DataTable/DataTableColumnHeader";
import SheetButton from "@/components/common/SheetForm";

export interface booking {
  bookingNo: number;
  userID: number;
  vehicleID: string;
  driverID: string;
  bookingDate: number;
  serviceLocation: string;
  towingLocation: string;
  distance: number;
  status: string;
  estimateCost: number;
  isWaive: boolean;
  isCompleted: boolean;
}

interface Props {
  handlePassEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const columns = ({
  handlePassEdit,
  handleDelete,
}: Props): ColumnDef<rating>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
  },
  {
    accessorKey: "vehicleID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle ID" />
    ),
  },
  {
    accessorKey: "bookingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Date" />
    ),
  },
  {
    accessorKey: "serviceLocation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Location" />
    ),
  },
  {
    accessorKey: "towingLocation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Towing Location" />
    ),
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "estimateCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estimate Cost" />
    ),
  },
  {
    accessorKey: "isWaive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Waive" />
    ),
  },
  {
    accessorKey: "isCompleted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Completed" />
    ),
  },
  
  {
    id: "actions",
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
            <DropdownMenuItem
              onClick={() => handlePassEdit(row.original.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => handleDelete(row.original.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
