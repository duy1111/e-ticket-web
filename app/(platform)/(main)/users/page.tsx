"use server"

import { auth } from "@/auth";
import { UserClient } from "./_components/client";
import { UserColumn } from "./_components/columns";
import { format } from "date-fns";


const UserPage = async() => {


    const session = await auth()

    const res = await fetch("http://localhost:3001/" + "user/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
    });

    console.log(res);

    const users:any[] = await res.json();

    const formattedUsers: UserColumn[] = users.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        username: item.username,
        role: item.role,
        phoneNumber: item.phoneNumber,
        isDeleted: item.isDeleted,
        isVerified: item.isVerified,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        updatedAt: format(item.updatedAt, "MMMM do, yyyy")
    }));
    
    return ( 
        <div className="flex-col w-full h-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <UserClient data={formattedUsers} /> 
        </div>
      </div>
    );
}
 
export default UserPage;