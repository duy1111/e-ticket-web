"use client"
import AuthContext from "@/context/authContext";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import {Toaster} from "sonner"
import { EdgeStoreProvider } from '@/lib/edgestore';

import { ToastProvider } from "@/components/providers/toast-provider";
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <EdgeStoreProvider>
      <QueryProvider>
          <AuthContext>
            <Toaster />
            <ToastProvider />
            
            <ModalProvider />
            {children}
          </AuthContext>
      </QueryProvider>
    </EdgeStoreProvider>
  );
};

export default PlatformLayout;
