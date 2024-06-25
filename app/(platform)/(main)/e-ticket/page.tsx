"use server"

import { auth } from "@/auth";
import { ETicket } from "@/types";
import { ETicketClient } from "./_components/client";
import { ETicketColumn } from "./_components/columns";


const ETicketPage = async() => {


    const session = await auth()

    const res = await fetch("https://api-e-ticket.onrender.com/" + "e-ticket/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
    });


    console.log(res);

    const eTickets:ETicket[] = await res.json();

    const formattedETickets: ETicketColumn[] = eTickets.map((item) => ({
      id: item.id!,
      serialNo: item.serialNo!,
      price: item.price!,
      currency: item.currency!,
      status: item.status!,
      event: {
        name: item.event?.name!
      },
      user: {
        email: item.user?.email!
      }
    }));
    

    return ( 
        <div className="flex-col w-full h-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ETicketClient data={formattedETickets} /> 
        </div>
      </div>
    );
}
 
export default ETicketPage;