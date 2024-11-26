import { create } from "zustand";

interface ScrollModalProps {
  onClick: (id: string) => void;
}

export const useScrollModal = create<ScrollModalProps>(() => ({
  onClick: (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  },
}));
