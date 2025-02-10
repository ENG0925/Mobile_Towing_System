import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/DataTable/DataTableColumnHeader";

export interface user {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: number;
  accountStatus: string;
  loginStatus:string;
}


export const columns = ({}): ColumnDef<user>[] => [
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
  },{
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
