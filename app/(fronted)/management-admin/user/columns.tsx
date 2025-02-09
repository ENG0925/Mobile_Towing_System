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

export interface user {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: number;
  accountStatus: string;
  loginStatus:string;
}

interface Props {
  handlePassEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const columns = ({
  handlePassEdit,
  handleDelete,
}: Props): ColumnDef<user>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
  },
  {
    accessorKey: "password",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Password" />
    ),
  },
  {
    accessorKey: "accountStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Status" />
    ),
  },
  {
    accessorKey: "loginStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Login Status" />
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
