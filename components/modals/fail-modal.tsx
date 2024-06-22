'use client'

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {  CheckCircle, XCircle} from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import useFailModal from "@/hooks/use-fail-modal";


const FailModal = () => {
    const router = useRouter()
    const failModal = useFailModal();



    const backHome = useCallback(() => {
        failModal.onClose();
        router.push("/")
    },[router,failModal])


  
    return ( 
        <Dialog
            open={failModal.isOpen}
            onOpenChange={failModal.onClose}
        >
            <DialogContent className="w-full h-500 ">
                <div className="flex justify-center">
                <XCircle className=" h-[80px] w-[80px] text-rose-500" />
                </div>
                <div className="flex justify-center mt-8">
                    
                    <p className=" text-3xl font-bold">Buy E-Ticket Fail!</p>
                    
                </div>
                <div className=" flex justify-center mt-16 ">
                <Button className="dark:md:hover:bg-grey-90" onClick={backHome} >
                    Back to Home
                </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
 
export default FailModal;