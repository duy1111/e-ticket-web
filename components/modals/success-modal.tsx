'use client'

import useSuccessModal from "@/hooks/use-success-modal";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {  CheckCircle} from "lucide-react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";


const SuccessModal = () => {
    const router = useRouter()
    const successModal = useSuccessModal();



    const backHome = useCallback(() => {
        successModal.onClose();
        router.push("/")
    },[router,successModal])


  
    return ( 
        <Dialog
            open={successModal.isOpen}
            onOpenChange={successModal.onClose}
        >
            <DialogContent className="w-full h-500 ">
                <div className="flex justify-center">
                <CheckCircle className=" h-[80px] w-[80px] text-emerald-400" />
                </div>
                <div className="flex justify-center mt-8">
                    
                    <p className=" text-3xl font-bold">Thank you for buy E-Ticket !</p>
                    
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
 
export default SuccessModal;