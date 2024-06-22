"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Role } from "@/types";
import CellData from "./cell-data";

export type UserColumn = {
  id: number;
  name: string;
  email: string;
  username: string;
  role: Role;
  phoneNumber: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => <CellData data={row.original} id={"name"} />,
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => <CellData data={row.original} id={"email"} />,
  },
  {
    accessorKey: "username",
    header: "USERNAME",
    cell: ({ row }) => <CellData data={row.original} id={"username"} />,
  },
  {
    accessorKey: "phoneNumber",
    header: "PHONE NUMBER",
    cell: ({ row }) => <CellData data={row.original} id={"phoneNumber"} />,
  },
  {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ row }) => <CellData data={row.original} id={"role"} />,
  },
  {
    accessorKey: "isDeleted",
    header: "DELETED",
    cell: ({ row }) => <CellData data={row.original} id={"isDeleted"} isBadge />,
  },
  {
    accessorKey: "isVerified",
    header: "VERIFIED",
    cell: ({ row }) => <CellData data={row.original} id={"isVerified"} isBadge />,
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => <CellData data={row.original} id={"createdAt"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
