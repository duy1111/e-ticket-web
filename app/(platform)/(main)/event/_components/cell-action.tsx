"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";

import { EventColumn } from "./columns";

interface CellActionProps {
  data: EventColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api-e-ticket.onrender.com/" + `event/delete/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.accessToken}`
        },

      });
      if(!res.ok){
        toast.error('Failed to delete event.');
        return;
      }
      toast.success('Event deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete event.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('ID copied to clipboard.');
  }

  const onPublish = async (id: number) => {
    console.log(id);
    if(status === "loading") return;
    try {
      setLoading(true);
      await fetch("https://api-e-ticket.onrender.com/"+`event/public`, {
        method: "POST",
        body: JSON.stringify({
          id: +id
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.accessToken}`
        },
      });
      toast.success('Event Publish.');
      router.refresh();
    } catch (error) {
      toast.error('Failed to event publish.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          {data.status === "DRAFT" && <DropdownMenuItem
            onClick={() => onPublish(+data.id)}
          >
            <Copy className="mr-2 h-4 w-4" /> Publish Event
          </DropdownMenuItem>}
          <DropdownMenuItem
            onClick={() => router.push(`/event/${data.id}`) } 
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
