"use server";
import { format } from "date-fns";
import { currentUser } from "@/lib/auth";
import axios from "axios";
import { auth } from "@/auth"
import { EventColumn } from "./_components/columns";
import { EventType } from "@/types";
import { EventClient } from "./_components/client";


const EventPage = async () => {
    const session = await auth()

  const res = await fetch("http://localhost:3001/" + "event", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });


  const events:EventType[] = await res.json();


  const formattedEvents: EventColumn[] = events.map((item) => ({
    id: item.id!,
    name: item.name!,
    start_time: format(item.start_time, "MMMM do, yyyy")!,
    end_time: format(item.end_time, "MMMM do, yyyy")!,
    status: item.status!,
    locationName: item.location?.address!,
    totalTickets: +item?.ETicketBook?.total || 0,
    soldTickets: +item?.ETicketBook?.sold || 0,
  }));
  return (
    <div className="flex-col w-full h-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EventClient data={formattedEvents} /> 
      </div>
    </div>
  );
};

export default EventPage;
