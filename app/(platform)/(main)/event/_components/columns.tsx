"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type EventColumn = {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  status: "DRAFT" | "PUBLISHED" | "DEACTIVE";
  locationName: string;
  totalTickets: number;
  soldTickets: number;
};

export const columns: ColumnDef<EventColumn>[] = [

  {
    accessorKey: "name",
    header: "Name",
  },
  //   {
  //     accessorKey: "description",
  //     header: "Description",
  //   },
  {
    accessorKey: "start_time",
    header: "Start Time",
  },
  {
    accessorKey: "end_time",
    header: "End Time",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "locationName",
    header: "Location",
  },
  {
    accessorKey: "totalTickets",
    header: "Total Tickets",
  },
  {
    accessorKey: "soldTickets",
    header: "Sold Tickets",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
