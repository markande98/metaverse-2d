import { create } from "zustand";

interface CreateElementModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateElementModal = create<CreateElementModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
