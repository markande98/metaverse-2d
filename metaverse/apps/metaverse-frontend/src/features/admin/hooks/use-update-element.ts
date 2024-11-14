import { create } from "zustand";

interface modalData {
  id: string;
  imageUrl: string;
}

interface updateElementModal {
  isOpen: boolean;
  data: modalData | null;
  onOpen: (id: string, imageUrl: string) => void;
  onClose: () => void;
}

export const useUpdateElementModal = create<updateElementModal>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (id: string, imageUrl: string) =>
    set({ isOpen: true, data: { id: id, imageUrl: imageUrl } }),
  onClose: () => set({ isOpen: false, data: null }),
}));
