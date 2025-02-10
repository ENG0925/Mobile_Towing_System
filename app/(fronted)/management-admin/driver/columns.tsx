import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/DataTable/DataTableColumnHeader";

export interface driver {
  id: number;
  name: string;
  phoneNumber: string;
  password: string;
  accountStatus: boolean;
  loginStatus: boolean;
}

export const columns = ({}): ColumnDef<driver>[] => [
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
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
  },
  {
    accessorKey: "loginStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Login Status" />
    ),
    cell: ({ row }) => {
      const isLogin = row.original.loginStatus;
      return (
        <span style={{ color: isLogin ? "green" : "red" }}>
          {isLogin ? "Login" : "Logout"}
        </span>
      );
    },
  },
];
