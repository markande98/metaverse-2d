import { create } from "zustand";

interface ModalData {
  x: number;
  y: number;
}

interface AddElementModalProps {
  isOpen: boolean;
  data: ModalData | null;
  onOpen: (x: number, y: number) => void;
  onClose: () => void;
}

export const useAddElementModal = create<AddElementModalProps>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (x: number, y: number) => set({ isOpen: true, data: { x, y } }),
  onClose: () => set({ isOpen: false, data: null }),
}));
