"use server"

import { auth } from "@/auth";
import { Billing, ETicket } from "@/types";
import { BillingClient } from "./_components/client";
import { BillingColumn } from "./_components/columns";
import { format } from "date-fns";


const BillingPage = async() => {


    const session = await auth()

    const res = await fetch("http://localhost:3001/" + "billing", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
    });


    const billings:Billing[] = await res.json();

    const formattedBillings: BillingColumn[] = billings.map((item) => ({
      id: item.id!,
      event: item.event.name!,
      user: item.user.email!,
      price: item.event.ETicketBook?.price!,
      currency: item.event.ETicketBook?.currency!,
      date: format(item.createdAt, "MMMM do, yyyy")!,
    }));
    

    return ( 
        <div className="flex-col w-full h-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillingClient data={formattedBillings} /> 
        </div>
      </div>
    );
}
 
export default BillingPage;