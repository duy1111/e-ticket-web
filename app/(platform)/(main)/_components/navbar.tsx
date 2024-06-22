"use client"

import { Logo } from "@/components/logo";
import { NavigationMenuHeader } from "./navigationMenu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserNav } from "./user-nav";
// import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCallback } from "react";

export const Navbar = () => {
    const router = useRouter()
    const user = useCurrentUser()
    
    const redirectLogin = useCallback(() => {
        router.push("/auth/login")
    }, [router])


    return ( 
        <nav className="fixed top-0 z-50  w-full px-4 h-20 border-b shadow-sm bg-white flex justify-center " >
            {/* <MobileSidebar/> */}
            <div className="h-full w-[1200px] flex items-center" >
                <div className=" flex items-center gap-x-20" >
                    <div className=" hidden md:flex" >
                        <Logo/>
                    </div>
                    <div className="flex gap-4 items-center" >
                        <NavigationMenuHeader/>
                    </div>
                   
                    
                </div>
                <div className=" ml-auto flex items-center gap-x-2" >
                    {/* <Button>New <Plus className="ml-2 h-4 w-4" /> </Button>s */}
                    {user ? <UserNav/> : <Button onClick={redirectLogin}>Login</Button> }
                </div>
            </div>
        </nav>
    );
}
 