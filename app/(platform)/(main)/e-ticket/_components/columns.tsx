"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ETicketColumn = {
  id: number;
  serialNo: string;
  price: number;
  currency: string;
  status: string;
  event: {
    name: string;
  };
  user: {
    email: string;
  };
};

export const columns: ColumnDef<ETicketColumn>[] = [
  {
    accessorKey: "event.name",
    header: "Event Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "serialNo",
    header: "Serial No",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "user.email",
    header: "User",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
