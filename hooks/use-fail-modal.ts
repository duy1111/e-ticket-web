import { create } from "zustand";

interface FailModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFailModal = create<FailModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFailModal;
