import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/DataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";

export interface Insurance {
  id: number;
  vehicleType: string;
  policyNo: string;
  policyholderName: string;
  icNumber: number;
  policyFile: string;
}

export const columns = ({}): ColumnDef<Insurance>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
  },
  {
    accessorKey: "policyNo",
    header: "Policy Number",
  },
  {
    accessorKey: "policyholderName",
    header: "Policyholder Name",
  },
  {
    accessorKey: "icNumber",
    header: "IC Number",
  },
  {
    id: "policyFile",
    header: "Policy File",
    cell: ({ row }) => {
      return (
        <Button type="button">
          <a href={`/policyFile/${row.original.policyFile}`} target="_blank" rel="noopener noreferrer">
            Open Policy File
          </a>
        </Button>
      );
    },
  },
];