"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { BillingColumn, columns } from "./columns";

interface BillingClientProps {
  data: BillingColumn[];
};

export const BillingClient: React.FC<BillingClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <> 
      <div className="flex items-center justify-between ">
        <Heading title={`List Billing`} description="Manage Billings" />
      </div>
      <Separator />
      <DataTable searchKey="event" columns={columns} data={data} />
    </>
  );
};
