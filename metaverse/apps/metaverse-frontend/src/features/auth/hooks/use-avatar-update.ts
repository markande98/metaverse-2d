import { create } from "zustand";

interface AvatarModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAvatarModal = create<AvatarModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
