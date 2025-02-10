import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/DataTable/DataTableColumnHeader";

export interface booking {
  bookingNo: number;
  name: string;
  vehicle: string;
  bookingDate: string;
  serviceLocation: string;
  towingLocation: string;
  distance: number;
  status: string;
  estimatedCost: number;
  isWaive: boolean;
}

export const columns = ({}): ColumnDef<booking>[] => [
  {
    accessorKey: "bookingNo",
    header: "Booking No",
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
    accessorKey: "estimatedCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusColorMap: Record<string, string> = {
        "payment": "green",
        "booking complete": "#adc2ec",
        "in progress": "orange",
        "cancel": "red",
      };
    
      const color = statusColorMap[row.original.status] || "black"; // Default color if status is unknown
    
      return <span style={{ color }}>{row.original.status}</span>;
    },
  },
  
  {
    accessorKey: "isWaive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Waive" />
    ),
    cell: ({ row }) => {
      const isGreen = row.original.isWaive;
      return (
        <span style={{ color: isGreen ? "green" : "red" }}>
          {isGreen ? "Waive" : "No Waive"}
        </span>
      );
    },
  },
];
