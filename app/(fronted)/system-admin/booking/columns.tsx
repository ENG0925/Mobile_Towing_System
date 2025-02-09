import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/common/DataTable/DataTableColumnHeader";
import SheetButton from "@/components/common/SheetForm";

export interface booking {
  bookingNo: number;
  name: string;
  vehicle: string;
  bookingDate: number;
  serviceLocation: string;
  towingLocation: string;
  distance: number;
  status: string;
  estimateCost: number;
  isWaive: boolean;
}

interface Props {
  handlePassEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const columns = ({
  handlePassEdit,
  handleDelete,
}: Props): ColumnDef<booking>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="username" />
    ),
  },
  {
    accessorKey: "vehicle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle" />
    ),
  },
  {
    accessorKey: "bookingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Date" />
    ),
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
  },
  {
    accessorKey: "estimateCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estimate Cost" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "isWaive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Waive" />
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
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
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
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={async () => handleDelete(row.original.id)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => handleDelete(row.original.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
