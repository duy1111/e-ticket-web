"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ETicketColumn, columns } from "./columns";

interface ETicketsClientProps {
  data: ETicketColumn[];
};

export const ETicketClient: React.FC<ETicketsClientProps> = ({
  data
}) => {

  return (
    <> 
      <div className="flex items-center justify-between ">
        <Heading title={`List ETicket`} description="Manage ETickets" />
      </div>
      <Separator />
      <DataTable searchKey="serialNo" columns={columns} data={data} />
    </>
  );
};
