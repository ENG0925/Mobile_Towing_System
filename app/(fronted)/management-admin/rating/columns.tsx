import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/DataTable/DataTableColumnHeader";

export interface rating {
  id: number;
  name: string;
  comment: string;
  rating: string;
  numlike: number;
}

export const columns = ({}): ColumnDef<rating>[] => [
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
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comment" />
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
  },
  {
    accessorKey: "numLike",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number Like" />
    ),
  },
];
