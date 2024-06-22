"use client";

import { Button } from "@/components/ui/button";
import useFailModal from "@/hooks/use-fail-modal";
import useSuccessModal from "@/hooks/use-success-modal";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

interface CheckoutPageProps {
  searchParams: {
    success: string;
    canceled: string;
  };
}

const CheckoutPage = ({ searchParams }: CheckoutPageProps) => {
  const router = useRouter();
  const { success, canceled } = searchParams;
  const backHome = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="w-full h-500 ">
      {success ? (
        <>
          <div className="flex justify-center">
            <CheckCircle className=" h-[80px] w-[80px] text-emerald-400" />
          </div>
          <div className="flex justify-center mt-8">
            <p className=" text-3xl font-bold">Thank you for buy E-Ticket !</p>
          </div>
          <div className=" flex justify-center mt-16 ">
            <Button className="dark:md:hover:bg-grey-90" onClick={backHome}>
              Back to Home
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <XCircle className=" h-[80px] w-[80px] text-rose-500" />
          </div>
          <div className="flex justify-center mt-8">
            <p className=" text-3xl font-bold">Buy E-Ticket Fail!</p>
          </div>
          <div className=" flex justify-center mt-16 ">
            <Button className="dark:md:hover:bg-grey-90" onClick={backHome}>
              Back to Home
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
