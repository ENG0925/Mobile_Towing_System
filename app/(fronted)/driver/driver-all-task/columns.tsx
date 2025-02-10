import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/DataTable/DataTableColumnHeader";

export interface BookingDeail {
  bookingNo: number;
  customerName: string;
  vehicleType: string;
  plateNumber: string;
  status: string;
  bookingDate: string;
}

export const columns = ({}): ColumnDef<BookingDeail>[] => [
  {
    accessorKey: "bookingNo",
    header: "Booking No",
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Type" />
    ),
  },
  {
    accessorKey: "plateNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plate Number" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusColorMap: Record<string, string> = {
        "complete": "green",
        "unpaid": "blue",
        "in-progress": "#adc2ec",
        "pending": "orange",
        "cancel": "red",
      };
    
      const color = statusColorMap[row.original.status] || "black"; // Default color if status is unknown
    
      return <span style={{ color }}>{row.original.status}</span>;
    },
  },
  {
    accessorKey: "bookingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Date" />
    ),
  },
];
