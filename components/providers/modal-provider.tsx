"use client";

import { useEffect, useState } from "react";
import { ProModal } from "../modals/pro-modal";
import SuccessModal from "../modals/success-modal";
import FailModal from "../modals/fail-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <>
            <ProModal/>
            <SuccessModal/>
            <FailModal/>
        </>
    )
}