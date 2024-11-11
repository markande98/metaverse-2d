import { create } from "zustand";

interface SpaceJoinModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSpaceJoinModal = create<SpaceJoinModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
