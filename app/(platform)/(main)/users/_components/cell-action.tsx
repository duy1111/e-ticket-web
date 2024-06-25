"use client";

import axios from "axios";
import { useMemo, useState } from "react";
import {
  ArchiveRestore,
  Copy,
  Delete,
  Edit,
  LucideMoveUpLeft,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { Role } from "@/types";

interface CellActionProps {
  data: UserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID copied to clipboard.");
  };

  const isVisibleUpdateStaff: boolean = useMemo(() => {
    if(data.role === Role.USER) {
      return true;
    }
    else {
      return false;
    }
  }, [data.role])

  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api-e-ticket.onrender.com/" + `user/${data.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("User deleted successfully.");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete user.");
    } finally {
      setLoading(false);
      window.location.reload();

    }
  };

  const unDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api-e-ticket.onrender.com/" + `user/restore/${data.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("User restored successfully.");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to restore user.");
    }finally {
      setLoading(false);
      window.location.reload();

    }
  }

  const updateStaff = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api-e-ticket.onrender.com/" + `user/updateRoleStaff/${data.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if(!res.ok) {
        toast.error("Failed to update user.");
        return;
      }
      toast.success("User updated successfully.");
    } catch (error) {
      toast.error("Failed to update user.");
    }
    finally {
      setLoading(false);
    }
  }

  // const

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
          <DropdownMenuItem onClick={() => onCopy(data.id.toString())}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          {data.isDeleted ? (
            <DropdownMenuItem onClick={() => unDelete()}>
              <ArchiveRestore className="mr-2 h-4 w-4" /> Restore User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Delete className="mr-2 h-4 w-4" /> Delete User
            </DropdownMenuItem>
          )}

          {isVisibleUpdateStaff && (<DropdownMenuItem onClick={() => updateStaff()}>
            <LucideMoveUpLeft className="mr-2 h-4 w-4" /> Update Staff
          </DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
