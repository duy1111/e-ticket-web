"use server"
import { auth } from "@/auth";
import { ProductForm } from "./components/event-form";
import { EventType } from "@/types";

const ProductPage = async ({
  params
}: {
  params: { eventId: string }
}) => {
  const session = await auth()

  const { eventId } = params;

  const res = await fetch(process.env.BACKEND_URL + "event/" + eventId, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  let event = null;
  if(res.status === 200) {
    event = await res?.json();
  }
  return ( 
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ProductForm
          initialData={event}
          eventId={eventId}
        />
      </div>
    </div>
  );
}

export default ProductPage;
