"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserColumn } from "./columns";
import { Badge } from "@/components/ui/badge";

interface CellDataProps {
    data: UserColumn;
    id: keyof UserColumn;
    isBadge?: boolean;
  }

const CellData = ({data, id, isBadge} : CellDataProps) => {
    const router = useRouter()

    const redirectDetail = async (id: any) => {
        router.push(`/users/deployments`);
    }


    return ( 
        <div onClick={() => redirectDetail(data.id)} >
            {isBadge ? (
                <Badge
                    variant={data[id] ? "success" : "destructive"}
                >
                    {data[id] ? "Yes" : "No"}
                </Badge>
            ) : (
                <p>{data[id]}</p>
            )}
        </div>
    );
}
 
export default CellData;