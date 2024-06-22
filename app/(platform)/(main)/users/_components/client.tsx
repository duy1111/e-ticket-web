"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { UserColumn, columns } from "./columns";

interface UserClientProps {
  data: UserColumn[];
};

export const UserClient: React.FC<UserClientProps> = ({
  data
}) => {

  return (
    <> 
      <div className="flex items-center justify-between ">
        <Heading title={`List User`} description="Manage User" />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
