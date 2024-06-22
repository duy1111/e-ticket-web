"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type BillingColumn = {
  id: number;
  event: string;
  user: string;
  price: number;
  currency: string;
  date: string;
};

export const columns: ColumnDef<BillingColumn>[] = [
  {
    accessorKey: "event",
    header: "Event",
  }, 
  {
    accessorKey: "user",
    header: "User",
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
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
